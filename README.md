# NutriVision: A Multimodal Indian Food Nutrition Coaching System

## 📌 Project Overview
**NutriVision** (also known as Nutrition Coach) is an end-to-end multimodal system designed to accurately track diets and provide personalized coaching for Indian cuisine. By taking a photograph of any Indian meal, the system can identify food items, estimate portions, compute nutritional content, and generate personalized dietary recommendations based on twenty different health conditions.

## 🌟 Key Features
* **Indian Food Detection:** Utilizes a fine-tuned YOLOv8n model to detect and localize foods in both standalone dishes and complex, multi-dish *thali* plates.
* **Nutritional Computation:** Maps detected items to a custom nutrition database of 75 Indian food classes (derived from ICMR-NIN) covering macros and micros using fuzzy string matching.
* **Portion Estimation:** Estimates portion weights from bounding-box pixel areas using a calibrated reference ratio.
* **Dietary Restriction Engine:** A rule-based engine that flags harmful foods for 20 specific health conditions (e.g., Diabetes, Hypertension, Obesity).
* **Recommendation System:** Suggests the top-3 healthier alternative food swaps based on a weighted nutrient scoring function.

## 📊 Dataset
The model was trained using the **Kaggle Rasoi Challenge** dataset, which was merged and preprocessed into two subsets:
* **Standalone Recipes:** 127 images across 55 classes.
* **Composite Thalis:** 143 images with 628 bounding-box annotations.
* **Total:** 270 images, 755 annotations, and a unified vocabulary of 75 classes.

## ⚙️ Pipeline Architecture
1. **Meal Image Input**
2. **YOLOv8 Detection** (Bounding Boxes & Labels)
3. **Portion Weight Estimation**
4. **Fuzzy Nutrition Lookup** (Macro/Micro Nutrient Totals)
5. **Dietary Restriction Engine**
6. **Recommendation Engine**
7. **Personalised Dietary Report** (AI Dietitian Summary)

## 🛠️ Tech Stack
* **Language:** Python 3.10
* **Computer Vision:** Ultralytics YOLOv8 (8.x), PyTorch (2.x), Pillow
* **Data Processing:** pandas, thefuzz
* **Environment:** Google Colab (NVIDIA T4 GPU)

## 📈 Performance & Results
| Metric | Result | Target |
| :--- | :--- | :--- |
| **mAP@50 (Detection)** | 0.743 | > 0.60 |
| **Lookup Accuracy** | 100.0% | > 85% |
| **Restriction F1** | 1.00 | > 0.85 |
| **Swap Improvement Rate** | 100.0% | > 70% |
*Note: Results achieved on an 80/20 train/val split over 45 epochs.*

## 🚀 Future Work
* **Dataset Expansion:** Increase dataset size to at least 500 images per class for improved generalization on visually similar dishes (e.g., various sabjis).
* **Advanced Portion Estimation:** Replace the 2D bounding-box pixel area reference ratio with a learned depth or volume estimation model.
* **Broader Clinical Use:** Add restrictions for kidney disease, thyroid conditions, and pregnancy guidelines.
* **Deployment:** Transition the system from a web-based pipeline to a native mobile application.

## 👨‍💻 Author
**Vanshi Sethi** B.Sc. (Honours) Data Science and Artificial Intelligence  
Indian Institute of Technology Guwahati, India  
Email: s.vanshi@op.iitg.ac.in
