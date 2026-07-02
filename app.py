import gradio as gr
from ultralytics import YOLO
from PIL import Image
import numpy as np
import os
import pandas as pd

# --- NUTRITION & RESTRICTION DATABASE ---
FOOD_DB = {
    "chutney": {"calories": 51.0, "protein": 0.5, "carbs": 4.2, "fat": 3.1, "fiber": 0.3, "sodium": 60.0},
    "egg bhurji": {"calories": 160.0, "protein": 12.0, "carbs": 2.0, "fat": 11.0, "fiber": 0.1, "sodium": 180.0},
    "chapati": {"calories": 104.0, "protein": 3.0, "carbs": 22.0, "fat": 0.4, "fiber": 4.0, "sodium": 5.0},
    "white rice": {"calories": 130.0, "protein": 2.7, "carbs": 28.0, "fat": 0.3, "fiber": 0.4, "sodium": 1.0},
    "dal": {"calories": 150.0, "protein": 9.0, "carbs": 24.0, "fat": 3.5, "fiber": 8.0, "sodium": 120.0},
    "salad": {"calories": 25.0, "protein": 1.0, "carbs": 5.0, "fat": 0.2, "fiber": 2.5, "sodium": 10.0}
}

RESTRICTIONS = {
    "Heart_Disease": ["chutney", "achar", "papad", "salty snack"],
    "Diabetes": ["white rice", "halwa", "gulab jamun", "imarti", "cake"],
    "Hypertension": ["achar", "papad", "chutney"],
    "Obesity": ["bhatura", "poori", "fried rice", "chilli potato"]
}

SWAPS = {
    "chutney": "Mint Yogurt Dip (lower sodium/sugar)",
    "white rice": "Brown Rice or Quinoa",
    "achar": "Fresh lemon squeeze with herbs",
    "bhatura": "Chapati or Missi Roti"
}

# --- LOAD MODEL ---
model = YOLO("best.pt") if os.path.exists("best.pt") else None

# --- AI ANALYSIS FUNCTION ---
def analyze_plate(image, condition):
    if model is None:
        return None, pd.DataFrame(), "⚠️ Error: 'best.pt' model not found. Please upload it to your Space."
    if image is None:
        return None, pd.DataFrame(), "Please upload an image."

    # Run strict inference
    results = model.predict(source=image, imgsz=320, conf=0.45, iou=0.30, augment=False)
    
    # YOLO returns a BGR image array, we convert to RGB for Gradio
    res_image = results[0].plot()
    res_image = res_image[..., ::-1] 
    
    detected_names = [model.names[int(box.cls[0].item())] for box in results[0].boxes]
    
    if not detected_names:
        return res_image, pd.DataFrame(), "⚠️ No food items detected confidently. Try a clearer photo."
    
    table_data = []
    total_nutr = {"calories": 0, "protein": 0, "carbs": 0, "fat": 0, "fiber": 0, "sodium": 0}
    flags_and_swaps = "### ⚠️ Health Flags & Swaps\n"
    
    for food in detected_names:
        food_lower = food.lower()
        nutr = FOOD_DB.get(food_lower, {"calories": 120.0, "protein": 3.0, "carbs": 15.0, "fat": 4.0, "fiber": 1.0, "sodium": 100.0})
        qty = "15.0g" if "chutney" in food_lower or "achar" in food_lower else "150g"
        table_data.append([food.title(), qty, f"{nutr['calories']} kcal"])
        
        for key in total_nutr:
            total_nutr[key] += nutr[key]
            
        # Check conditions
        if condition != "None / Healthy" and food_lower in RESTRICTIONS.get(condition, []):
            flags_and_swaps += f"- ❌ **{food.title()}**: Avoid or limit for **{condition}**.\n"
                
        # Check swaps
        if food_lower in SWAPS:
            flags_and_swaps += f"- 💡 **Swap {food.title()}**: Try **{SWAPS[food_lower]}** instead.\n"

    if flags_and_swaps == "### ⚠️ Health Flags & Swaps\n":
        flags_and_swaps += "✅ This meal choices align well with your active selections!"
        
    # Format nutrition summary
    nutrition_text = (
        "### 📊 Estimated Total Nutrition\n"
        f"**Calories:** {total_nutr['calories']:.1f} kcal | **Protein:** {total_nutr['protein']:.1f}g | "
        f"**Carbs:** {total_nutr['carbs']:.1f}g | **Fat:** {total_nutr['fat']:.1f}g | "
        f"**Fiber:** {total_nutr['fiber']:.1f}g | **Sodium:** {total_nutr['sodium']:.1f}mg\n\n"
        f"{flags_and_swaps}"
    )
    
    df = pd.DataFrame(table_data, columns=["Food Item", "Est. Portion", "Calories"])
    return res_image, df, nutrition_text

# --- FRONTEND LAYOUT ---
# Using the Soft theme for a clean, elegant look
with gr.Blocks(theme=gr.themes.Soft()) as demo:
    gr.Markdown("# 🥗 Smart Plate Analyzer & Nutrition Coach")
    gr.Markdown("Upload your meal photo for AI item detection, portion estimation, and personalized dietary swaps.")
    
    with gr.Row():
        with gr.Column():
            input_image = gr.Image(type="pil", label="1. Upload Plate Photo")
            input_condition = gr.Dropdown(
                choices=["None / Healthy", "Diabetes", "Hypertension", "Obesity", "Heart_Disease", "Anemia", "Osteoporosis"],
                value="None / Healthy",
                label="2. Select Medical Condition"
            )
            submit_btn = gr.Button("▶ Analyze Plate", variant="primary")
        
        with gr.Column():
            output_image = gr.Image(label="AI Detections")
            output_df = gr.Dataframe(label="Detected Foods Breakdown")
            output_text = gr.Markdown()
            
    # Connect the button to the function
    submit_btn.click(
        fn=analyze_plate,
        inputs=[input_image, input_condition],
        outputs=[output_image, output_df, output_text]
    )

if __name__ == "__main__":
    demo.launch()