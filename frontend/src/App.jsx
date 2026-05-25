import { useState, useRef, useEffect } from "react";

const DISEASES = [
  { id: "Diabetes", label: "Diabetes", icon: "🩸", foods: ["Chicken Biryani","Chole Bhature","Vada","Samosa","Pakora","Kheer","Gulab Jamun","Rasgulla","Jalebi","Naan","Paratha","Puri","Bhatura","Shrikhand","Basundi","Pav Bhaji","Vada Pav","Sabudana Khichdi","Puran Poli","Modak","Karanji","Chirote","Kappa","Mango Pickle","Lemon Pickle","Puli Inji","Mutton Biryani","Hyderabadi Biryani","Schezwan Rice"] },
  { id: "Hypertension", label: "Hypertension", icon: "❤️", foods: ["Butter Chicken","Chicken Biryani","Fish Curry","Chole Bhature","Samosa","Pakora","Bhatura","Pav Bhaji","Misal Pav","Vada Pav","Malvani Fish","Meen Curry","Mango Pickle","Lemon Pickle","Puli Inji","Mutton Curry","Mutton Biryani","Hyderabadi Biryani","Kolkata Biryani","Lucknowi Biryani","Chicken Chettinad","Andhra Chicken"] },
  { id: "Obesity", label: "Obesity", icon: "⚖️", foods: ["Butter Chicken","Chicken Biryani","Chole Bhature","Vada","Samosa","Pakora","Kheer","Gulab Jamun","Rasgulla","Jalebi","Paratha","Puri","Bhatura","Shrikhand","Basundi","Pav Bhaji","Vada Pav","Kombdi Vade","Puran Poli","Modak","Karanji","Chirote","Mutton Curry","Mutton Biryani","Hyderabadi Biryani","Kolkata Biryani","Lucknowi Biryani","Keema","Galouti Kebab","Chicken Korma","Malai Kofta","Chicken 65"] },
  { id: "Heart_Disease", label: "Heart Disease", icon: "🫀", foods: ["Butter Chicken","Chicken Biryani","Chole Bhature","Samosa","Pakora","Gulab Jamun","Jalebi","Puri","Bhatura","Vada Pav","Chirote","Mango Pickle","Mutton Curry","Mutton Biryani","Hyderabadi Biryani","Chicken Korma"] },
  { id: "Kidney_Disease", label: "Kidney Disease", icon: "🫘", foods: ["Fish Curry","Rajma","Kolambi Bhaat","Malvani Fish","Meen Curry","Mango Pickle","Lemon Pickle","Puli Inji","Mutton Curry","Mutton Biryani","Hyderabadi Biryani"] },
  { id: "GERD_Acidity", label: "GERD / Acidity", icon: "🔥", foods: ["Chicken Biryani","Fish Curry","Chole Bhature","Vada","Samosa","Pakora","Paratha","Puri","Bhatura","Pav Bhaji","Misal Pav","Vada Pav","Kombdi Vade","Malvani Fish","Meen Curry","Inji Curry","Mango Pickle","Lemon Pickle","Puli Inji","Mutton Biryani","Hyderabadi Biryani","Chicken Chettinad","Andhra Chicken","Chicken 65","Chili Chicken","Chicken Manchurian","Gobi Manchurian","Paneer Manchurian","Schezwan Rice"] },
  { id: "Celiac_Gluten_Intolerance", label: "Celiac / Gluten", icon: "🌾", foods: ["Chicken Biryani","Chole Bhature","Vegetable Pulao","Samosa","Pakora","Gulab Jamun","Jalebi","Roti","Naan","Paratha","Puri","Bhatura","Upma","Thepla","Khakhra","Pav Bhaji","Misal Pav","Vada Pav","Bhel Puri","Sev Puri","Ragda Patties","Thalipeeth","Kombdi Vade","Puran Poli","Karanji","Chirote","Mutton Biryani","Hyderabadi Biryani","Kolkata Biryani","Lucknowi Biryani","Shami Kebab","Spring Roll","Momos","Thukpa","Chowmein"] },
  { id: "High_Cholesterol", label: "High Cholesterol", icon: "🧪", foods: ["Butter Chicken","Chicken Biryani","Chole Bhature","Samosa","Pakora","Gulab Jamun","Jalebi","Puri","Bhatura","Vada Pav","Karanji","Chirote","Mutton Curry","Mutton Biryani","Hyderabadi Biryani","Galouti Kebab","Chicken Korma"] },
  { id: "Lactose_Intolerance", label: "Lactose Intolerance", icon: "🥛", foods: ["Butter Chicken","Palak Paneer","Paneer Tikka","Kheer","Gulab Jamun","Rasgulla","Jalebi","Kadhi","Shrikhand","Basundi","Sol Kadhi","Kaalan","Navratan Korma","Malai Kofta","Shahi Paneer","Kadai Paneer","Matar Paneer","Paneer Manchurian"] },
  { id: "Gout", label: "Gout", icon: "🦴", foods: ["Fish Curry","Rajma","Kolambi Bhaat","Malvani Fish","Meen Curry","Meen Pollichathu","Mutton Curry","Mutton Biryani","Hyderabadi Biryani","Keema"] },
  { id: "Thyroid_Hypothyroid", label: "Thyroid (Hypothyroid)", icon: "🦋", foods: ["Samosa","Pakora","Bhatura","Puri","Chole Bhature","Vada Pav","Pav Bhaji","Mango Pickle","Lemon Pickle","Puli Inji","Chicken Biryani","Mutton Biryani","Hyderabadi Biryani","Schezwan Rice","Chicken Manchurian","Gobi Manchurian","Chicken 65"] },
  { id: "Liver_Disease", label: "Liver Disease", icon: "🟤", foods: ["Butter Chicken","Chicken Biryani","Chole Bhature","Vada","Samosa","Pakora","Gulab Jamun","Jalebi","Paratha","Puri","Bhatura","Shrikhand","Basundi","Pav Bhaji","Vada Pav","Kombdi Vade","Mutton Curry","Mutton Biryani","Hyderabadi Biryani","Keema","Galouti Kebab","Chicken Korma","Malai Kofta","Mango Pickle","Lemon Pickle","Puli Inji","Chicken 65","Chicken Manchurian","Chirote","Karanji"] },
  { id: "Anemia", label: "Anemia", icon: "💉", foods: ["Kheer","Rasgulla","Gulab Jamun","Jalebi","Shrikhand","Basundi","Sabudana Khichdi","Kappa","Modak","Chirote","Karanji","Puran Poli"] },
  { id: "PCOS", label: "PCOS", icon: "🌸", foods: ["Chicken Biryani","Chole Bhature","Vada","Samosa","Pakora","Kheer","Gulab Jamun","Rasgulla","Jalebi","Naan","Paratha","Puri","Bhatura","Shrikhand","Basundi","Pav Bhaji","Vada Pav","Sabudana Khichdi","Puran Poli","Modak","Karanji","Chirote","Kappa","Schezwan Rice","Fried Rice","Chicken Fried Rice","Egg Fried Rice","Mango Pickle","Lemon Pickle","Puli Inji","Mutton Biryani","Hyderabadi Biryani"] },
  { id: "Osteoporosis", label: "Osteoporosis", icon: "🦷", foods: ["Mango Pickle","Lemon Pickle","Puli Inji","Chole Bhature","Bhatura","Puri","Samosa","Pakora","Schezwan Rice","Chicken Manchurian","Gobi Manchurian","Paneer Manchurian","Andhra Chicken","Chicken Chettinad"] },
  { id: "Irritable_Bowel_Syndrome", label: "Irritable Bowel Syndrome", icon: "🌀", foods: ["Chicken Biryani","Chole Bhature","Fish Curry","Rajma","Vada","Samosa","Pakora","Puri","Bhatura","Pav Bhaji","Misal Pav","Vada Pav","Malvani Fish","Meen Curry","Inji Curry","Mango Pickle","Lemon Pickle","Puli Inji","Mutton Curry","Mutton Biryani","Hyderabadi Biryani","Chicken Chettinad","Andhra Chicken","Chicken 65","Chili Chicken","Chicken Manchurian","Gobi Manchurian","Schezwan Rice","Kombdi Vade"] },
  { id: "Migraine", label: "Migraine", icon: "🧠", foods: ["Mango Pickle","Lemon Pickle","Puli Inji","Inji Curry","Chicken Manchurian","Gobi Manchurian","Paneer Manchurian","Schezwan Rice","Chili Chicken","Chicken Chettinad","Andhra Chicken","Chicken 65","Mutton Curry","Mutton Biryani","Hyderabadi Biryani","Seekh Kebab","Shami Kebab","Keema"] },
  { id: "Pancreatitis", label: "Pancreatitis", icon: "⚕️", foods: ["Butter Chicken","Chicken Biryani","Chole Bhature","Vada","Samosa","Pakora","Gulab Jamun","Jalebi","Paratha","Puri","Bhatura","Shrikhand","Basundi","Pav Bhaji","Vada Pav","Kombdi Vade","Fish Curry","Malvani Fish","Meen Curry","Mutton Curry","Mutton Biryani","Hyderabadi Biryani","Keema","Galouti Kebab","Chicken Korma","Malai Kofta","Chirote","Karanji","Chicken 65","Chicken Manchurian","Gobi Manchurian","Paneer Manchurian","Schezwan Rice","Chicken Chettinad","Andhra Chicken"] },
  { id: "Gallstones", label: "Gallstones", icon: "🪨", foods: ["Butter Chicken","Chole Bhature","Vada","Samosa","Pakora","Gulab Jamun","Jalebi","Paratha","Puri","Bhatura","Shrikhand","Basundi","Pav Bhaji","Vada Pav","Kombdi Vade","Mutton Curry","Mutton Biryani","Hyderabadi Biryani","Galouti Kebab","Chicken Korma","Malai Kofta","Chirote","Karanji","Chicken 65","Chicken Manchurian"] },
  { id: "Celiac_Wheat_Allergy", label: "Celiac / Wheat Allergy", icon: "🌾", foods: ["Chicken Biryani","Chole Bhature","Vegetable Pulao","Samosa","Pakora","Gulab Jamun","Jalebi","Roti","Naan","Paratha","Puri","Bhatura","Upma","Thepla","Khakhra","Pav Bhaji","Misal Pav","Vada Pav","Bhel Puri","Sev Puri","Ragda Patties","Thalipeeth","Kombdi Vade","Puran Poli","Karanji","Chirote","Mutton Biryani","Hyderabadi Biryani","Kolkata Biryani","Lucknowi Biryani","Shami Kebab","Spring Roll","Momos","Thukpa","Chowmein"] },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0e0e0f; --bg2: #161617; --bg3: #1e1e20; --bg4: #252527;
    --gold: #c8a96e; --gold2: #e8c98a; --gold-dim: rgba(200,169,110,0.12); --gold-border: rgba(200,169,110,0.25);
    --text: #f0ece4; --text2: #a09a8e; --text3: #6a6460;
    --green: #5aad7f; --green-bg: rgba(90,173,127,0.1);
    --red: #e06b6b; --red-bg: rgba(224,107,107,0.1); --red-border: rgba(224,107,107,0.2);
    --radius: 12px; --radius-lg: 18px; --T: 0.2s ease;
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 1.6; }
  .app { min-height: 100vh; }

  /* NAV */
  .nav { position: sticky; top: 0; z-index: 100; background: rgba(14,14,15,0.92); backdrop-filter: blur(12px); border-bottom: 0.5px solid var(--gold-border); padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; height: 60px; }
  .nav-brand { display: flex; align-items: center; gap: 10px; background: none; border: none; cursor: pointer; }
  .nav-logo { width: 32px; height: 32px; border-radius: 8px; background: var(--gold-dim); border: 1px solid var(--gold-border); display: flex; align-items: center; justify-content: center; font-size: 16px; }
  .nav-title { font-family: 'Playfair Display', serif; font-size: 17px; color: var(--gold2); letter-spacing: 0.02em; }
  .nav-links { display: flex; gap: 4px; }
  .nav-link { background: none; border: none; cursor: pointer; padding: 6px 14px; border-radius: 8px; color: var(--text2); font-size: 13px; font-family: 'DM Sans', sans-serif; transition: all var(--T); }
  .nav-link:hover { background: var(--bg3); color: var(--text); }
  .nav-link.active { background: var(--gold-dim); color: var(--gold); border: 0.5px solid var(--gold-border); }

  /* HERO */
  .hero { padding: 5rem 1.5rem 4rem; max-width: 760px; margin: 0 auto; text-align: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 6px; background: var(--gold-dim); border: 0.5px solid var(--gold-border); border-radius: 100px; padding: 5px 14px; font-size: 12px; color: var(--gold); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1.5rem; }
  .hero-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 6vw, 3.2rem); font-weight: 500; line-height: 1.2; color: var(--text); margin-bottom: 1.2rem; }
  .hero h1 span { color: var(--gold); }
  .hero p { color: var(--text2); font-size: 16px; line-height: 1.8; max-width: 560px; margin: 0 auto 2.5rem; }
  .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-primary { background: var(--gold); color: #1a1400; border: none; border-radius: var(--radius); padding: 11px 24px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all var(--T); }
  .btn-primary:hover { background: var(--gold2); transform: translateY(-1px); }
  .btn-outline { background: transparent; color: var(--text2); border: 0.5px solid var(--bg4); border-radius: var(--radius); padding: 11px 24px; font-size: 14px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all var(--T); }
  .btn-outline:hover { border-color: var(--gold-border); color: var(--text); background: var(--gold-dim); }

  /* STATS */
  .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px,1fr)); gap: 1px; background: var(--bg3); border-top: 0.5px solid var(--bg3); border-bottom: 0.5px solid var(--bg3); margin-bottom: 4rem; }
  .stat-cell { background: var(--bg); padding: 1.5rem 1rem; text-align: center; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--gold); }
  .stat-label { font-size: 12px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; }

  /* SECTION */
  .section { max-width: 900px; margin: 0 auto; padding: 0 1.5rem 4rem; }
  .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--gold); margin-bottom: 0.6rem; }
  .section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.5rem, 4vw, 2.2rem); font-weight: 500; color: var(--text); margin-bottom: 0.8rem; }
  .section-sub { color: var(--text2); font-size: 15px; max-width: 580px; margin-bottom: 2.5rem; }

  /* STEPS */
  .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px,1fr)); gap: 1rem; }
  .step-card { background: var(--bg2); border: 0.5px solid var(--bg4); border-radius: var(--radius-lg); padding: 1.5rem; position: relative; overflow: hidden; transition: border-color var(--T); }
  .step-card:hover { border-color: var(--gold-border); }
  .step-num { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 400; color: var(--bg4); position: absolute; top: 8px; right: 14px; line-height: 1; }
  .step-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
  .step-title { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 6px; }
  .step-desc { font-size: 13px; color: var(--text2); line-height: 1.6; }

  /* FEATURES */
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 1rem; }
  .feat-card { background: var(--bg2); border: 0.5px solid var(--bg4); border-radius: var(--radius-lg); padding: 1.5rem; transition: all var(--T); }
  .feat-card:hover { border-color: var(--gold-border); background: var(--bg3); }
  .feat-dot { width: 36px; height: 36px; border-radius: 10px; background: var(--gold-dim); border: 0.5px solid var(--gold-border); display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 1rem; }
  .feat-title { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 6px; }
  .feat-desc { font-size: 13px; color: var(--text2); line-height: 1.6; }

  /* TECH */
  .tech-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px,1fr)); gap: 0.75rem; }
  .tech-pill { background: var(--bg2); border: 0.5px solid var(--bg4); border-radius: var(--radius); padding: 12px 14px; display: flex; align-items: center; gap: 10px; transition: border-color var(--T); }
  .tech-pill:hover { border-color: var(--gold-border); }
  .tech-name { font-size: 13px; color: var(--text2); }

  /* UPLOAD PAGE */
  .upload-page { max-width: 660px; margin: 0 auto; padding: 3rem 1.5rem; }
  .upload-zone { border: 1.5px dashed var(--bg4); border-radius: var(--radius-lg); padding: 3rem 2rem; text-align: center; cursor: pointer; transition: all var(--T); background: var(--bg2); position: relative; overflow: hidden; }
  .upload-zone:hover, .upload-zone.drag { border-color: var(--gold); background: var(--gold-dim); }
  .upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
  .upload-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .upload-text { font-size: 15px; color: var(--text); margin-bottom: 6px; }
  .upload-sub { font-size: 13px; color: var(--text3); }
  .preview-wrap { border: 0.5px solid var(--bg4); border-radius: var(--radius-lg); overflow: hidden; margin-top: 1.5rem; background: var(--bg2); }
  .preview-img { width: 100%; max-height: 320px; object-fit: cover; display: block; }
  .preview-footer { padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; gap: 12px; border-top: 0.5px solid var(--bg3); }
  .preview-name { font-size: 13px; color: var(--text2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .remove-btn { background: none; border: 0.5px solid var(--bg4); border-radius: 8px; padding: 5px 12px; font-size: 12px; color: var(--text3); cursor: pointer; font-family: 'DM Sans', sans-serif; flex-shrink: 0; transition: all var(--T); }
  .remove-btn:hover { border-color: var(--red); color: var(--red); }
  .analyze-btn { width: 100%; margin-top: 1.5rem; background: var(--gold); color: #1a1400; border: none; border-radius: var(--radius); padding: 14px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all var(--T); display: flex; align-items: center; justify-content: center; gap: 8px; }
  .analyze-btn:hover:not(:disabled) { background: var(--gold2); }
  .analyze-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* LOADING */
  .loading-card { background: var(--bg2); border: 0.5px solid var(--bg4); border-radius: var(--radius-lg); padding: 2.5rem; text-align: center; margin-top: 1.5rem; }
  .spinner { width: 36px; height: 36px; border-radius: 50%; border: 2px solid var(--bg4); border-top-color: var(--gold); animation: spin 0.8s linear infinite; margin: 0 auto 1.25rem; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-size: 14px; color: var(--text2); }

  /* RESULT */
  .result-card { background: var(--bg2); border: 0.5px solid var(--bg4); border-radius: var(--radius-lg); overflow: hidden; margin-top: 1.5rem; animation: slideUp 0.4s ease; }
  @keyframes slideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
  .result-header { padding: 1.25rem 1.5rem; border-bottom: 0.5px solid var(--bg3); display: flex; align-items: center; gap: 10px; }
  .result-badge { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 0 3px var(--green-bg); }
  .result-title { font-family: 'Playfair Display', serif; font-size: 17px; color: var(--text); }
  .result-body { padding: 1.5rem; }
  .macro-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; margin-bottom: 1.5rem; }
  .macro-cell { background: var(--bg3); border-radius: var(--radius); padding: 12px 8px; text-align: center; }
  .macro-val { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--gold); }
  .macro-name { font-size: 11px; color: var(--text2); margin-top: 3px; }
  .result-section { margin-bottom: 1.25rem; }
  .result-section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text3); margin-bottom: 0.6rem; }
  .result-text { font-size: 14px; color: var(--text2); line-height: 1.7; }
  .result-text ul { padding-left: 1.2rem; margin-top: 4px; }
  .result-text li { margin-bottom: 4px; }
  .score-bar-wrap { margin-top: 0.5rem; }
  .score-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--text3); margin-bottom: 5px; }
  .score-bar { height: 6px; background: var(--bg4); border-radius: 3px; overflow: hidden; }
  .score-fill { height: 100%; border-radius: 3px; background: var(--gold); transition: width 1s ease; }
  .try-again { width: 100%; margin-top: 1rem; background: transparent; border: 0.5px solid var(--bg4); border-radius: var(--radius); padding: 11px; font-size: 13px; color: var(--text2); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all var(--T); }
  .try-again:hover { border-color: var(--gold-border); color: var(--text); }

  /* RESTRICTION PAGE */
  .restrict-page { max-width: 960px; margin: 0 auto; padding: 3rem 1.5rem; }
  .restrict-top { margin-bottom: 2rem; }
  .search-box { position: relative; margin-bottom: 1.5rem; }
  .search-box input { width: 100%; background: var(--bg2); border: 0.5px solid var(--bg4); border-radius: var(--radius); padding: 11px 16px 11px 40px; color: var(--text); font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color var(--T); }
  .search-box input:focus { border-color: var(--gold-border); }
  .search-box input::placeholder { color: var(--text3); }
  .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 16px; pointer-events: none; }

  .disease-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 0.65rem; margin-bottom: 2.5rem; }
  .disease-btn { background: var(--bg2); border: 0.5px solid var(--bg4); border-radius: var(--radius); padding: 11px 14px; cursor: pointer; text-align: left; font-family: 'DM Sans', sans-serif; transition: all var(--T); display: flex; align-items: center; gap: 10px; }
  .disease-btn:hover { border-color: var(--gold-border); background: var(--bg3); }
  .disease-btn.selected { border-color: var(--gold); background: var(--gold-dim); }
  .d-icon { font-size: 17px; flex-shrink: 0; }
  .d-label { font-size: 13px; color: var(--text2); flex: 1; }
  .disease-btn.selected .d-label { color: var(--gold); }
  .d-count { font-size: 11px; background: var(--bg4); color: var(--text3); border-radius: 100px; padding: 1px 7px; flex-shrink: 0; }
  .disease-btn.selected .d-count { background: rgba(200,169,110,0.2); color: var(--gold); }

  /* RESULT PANEL */
  .restriction-result { background: var(--bg2); border: 0.5px solid var(--bg4); border-radius: var(--radius-lg); overflow: hidden; animation: slideUp 0.3s ease; }
  .restrict-res-header { padding: 1.25rem 1.5rem; border-bottom: 0.5px solid var(--bg3); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
  .restrict-res-left { display: flex; align-items: center; gap: 12px; }
  .restrict-big-icon { font-size: 2rem; }
  .restrict-res-title { font-family: 'Playfair Display', serif; font-size: 19px; color: var(--text); }
  .restrict-res-sub { font-size: 12px; color: var(--text3); margin-top: 2px; }
  .restrict-pill { background: var(--red-bg); border: 0.5px solid var(--red-border); color: var(--red); border-radius: 100px; padding: 4px 12px; font-size: 12px; white-space: nowrap; }

  .foods-body { padding: 1.5rem; }
  .foods-section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text3); margin-bottom: 1rem; }
  .food-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .food-tag { background: var(--red-bg); border: 0.5px solid var(--red-border); color: var(--red); border-radius: 100px; padding: 5px 13px; font-size: 13px; transition: all var(--T); }
  .food-tag:hover { background: rgba(224,107,107,0.18); }

  .no-select { padding: 4rem; text-align: center; }
  .no-select-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .no-select-text { font-size: 14px; color: var(--text3); }

  /* FOOTER */
  .footer { border-top: 0.5px solid var(--bg3); padding: 2rem 1.5rem; text-align: center; font-size: 12px; color: var(--text3); }
  .footer span { color: var(--gold); }

  @media (max-width: 600px) {
    .nav-link { padding: 6px 9px; font-size: 12px; }
    .hero { padding: 3rem 1rem 2.5rem; }
    .macro-grid { grid-template-columns: repeat(2,1fr); }
    .stats-row { grid-template-columns: repeat(2,1fr); }
    .disease-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 380px) {
    .disease-grid { grid-template-columns: 1fr; }
  }
`;

const MOCK_RESULT = {
  dish: "Butter Chicken with Naan",
  calories: 480, protein: 28, carbs: 42, fat: 22, fiber: 3, balance_score: 68,
  analysis: "Your meal is protein-rich and satisfying, but moderately high in saturated fats from the creamy gravy and refined carbs from naan. Portion size appears to be approximately 350g.",
  recommendations: [
    "Swap naan with whole wheat roti to reduce refined carbs",
    "Add a side of cucumber raita for probiotics and cooling effect",
    "Reduce portion of gravy or opt for tomato-based curry variant",
    "Include a small salad for added fiber and micronutrients",
  ],
  sustainable_swap: "Try a tofu-based tikka masala — similar flavor profile with 40% lower carbon footprint and comparable protein content."
};

const LOADING_STEPS = [
  "Detecting food items…", "Estimating portion sizes…",
  "Computing nutritional profile…", "Evaluating meal balance…", "Generating recommendations…"
];

export default function App() {
  const [page, setPage] = useState("home");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState("");
  const [result, setResult] = useState(null);
  const [scoreWidth, setScoreWidth] = useState(0);
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const fileRef = useRef();

  useEffect(() => { if (result) setTimeout(() => setScoreWidth(result.balance_score), 150); }, [result]);

  function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    setImageFile(file); setImage(URL.createObjectURL(file)); setResult(null);
  }
  function handleDrop(e) { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }

  function analyze() {
    setLoading(true); setResult(null);
    LOADING_STEPS.forEach((s, i) => setTimeout(() => setStage(s), i * 900));
    setTimeout(() => { setResult(MOCK_RESULT); setLoading(false); }, LOADING_STEPS.length * 900 + 400);
  }
  function reset() { setImage(null); setImageFile(null); setResult(null); setLoading(false); setScoreWidth(0); }

  const filteredDiseases = DISEASES.filter(d =>
    d.label.toLowerCase().includes(searchQ.toLowerCase())
  );
  const disease = DISEASES.find(d => d.id === selectedDisease);

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* NAV */}
        <nav className="nav">
          <button className="nav-brand" onClick={() => setPage("home")}>
            <div className="nav-logo">🥗</div>
            <span className="nav-title">NutritionCoach</span>
          </button>
          <div className="nav-links">
            {["home","analyze","restrict"].map(p => (
              <button key={p} className={`nav-link ${page===p?"active":""}`} onClick={() => setPage(p)}>
                {p === "home" ? "Home" : p === "analyze" ? "Analyze" : "Restrictions"}
              </button>
            ))}
          </div>
        </nav>

        {/* ── HOME ── */}
        {page === "home" && (<>
          <div className="hero">
            <div className="hero-badge">AI-Powered · Multimodal · Indian Cuisine</div>
            <h1>Your <span>Personal Nutrition</span> Coach Powered by AI</h1>
            <p>Snap a photo of any Indian meal and instantly get detailed nutritional analysis, balance scoring, disease-specific warnings, and sustainable recipe alternatives.</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => setPage("analyze")}>Analyze Your Meal →</button>
              <button className="btn-outline" onClick={() => setPage("restrict")}>Check Food Restrictions</button>
            </div>
          </div>

          <div className="stats-row">
            {[["106+","Indian Dishes"],["20","Diseases Covered"],["5","Nutrients Tracked"],["YOLOv8","Detection Model"]].map(([n,l]) => (
              <div className="stat-cell" key={l}><div className="stat-num">{n}</div><div className="stat-label">{l}</div></div>
            ))}
          </div>

          <div className="section">
            <div className="section-label">How it works</div>
            <h2 className="section-title">From photo to insights in seconds</h2>
            <p className="section-sub">A five-step pipeline combining computer vision and nutrition intelligence.</p>
            <div className="steps-grid">
              {[["📸","Capture","Photograph your meal with any smartphone camera"],["🔍","Detect","YOLOv8 identifies every food item on your plate"],["⚖️","Quantify","Portion size estimated using spatial reference points"],["🧬","Profile","Full macro & micronutrient breakdown computed"],["💡","Advise","Personalized, sustainable recommendations generated"]].map(([icon,title,desc],i) => (
                <div className="step-card" key={title}>
                  <div className="step-num">{i+1}</div>
                  <div className="step-icon">{icon}</div>
                  <div className="step-title">{title}</div>
                  <div className="step-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="section-label">Features</div>
            <h2 className="section-title">Built for Indian dietary needs</h2>
            <p className="section-sub">Addressing the real gaps in existing nutrition apps for Indian users.</p>
            <div className="features-grid">
              {[["🍽️","Mixed-plate detection","Handles complex dal-rice-sabzi-roti combinations simultaneously"],["🎯","Personalized guidance","Context-aware advice for your specific health goals and deficiencies"],["🌿","Sustainability scoring","Eco-score and carbon footprint data with greener recipe alternatives"],["🏥","Disease awareness","Restriction mapping for 20 conditions including diabetes, PCOS, and hypertension"],["📊","Balance evaluation","Meal scored against evidence-based dietary guidelines"],["💰","Budget-conscious swaps","Affordable nutrient-dense alternatives for students and families"]].map(([icon,title,desc]) => (
                <div className="feat-card" key={title}><div className="feat-dot">{icon}</div><div className="feat-title">{title}</div><div className="feat-desc">{desc}</div></div>
              ))}
            </div>
          </div>

          <div className="section">
            <div className="section-label">Tech stack</div>
            <h2 className="section-title">Built on cutting-edge models</h2>
            <p className="section-sub">Combining the best of computer vision and large language models.</p>
            <div className="tech-grid">
              {[["🤖","YOLOv8"],["🧠","Claude API"],["🐍","Python"],["⚡","FastAPI"],["📱","React"],["📦","Nutrition DB"],["☁️","Cloud Deploy"],["📊","OpenCV"]].map(([icon,name]) => (
                <div className="tech-pill" key={name}><span style={{fontSize:18}}>{icon}</span><span className="tech-name">{name}</span></div>
              ))}
            </div>
          </div>

          <div className="section">
            <div style={{background:"var(--bg2)",border:"0.5px solid var(--gold-border)",borderRadius:"var(--radius-lg)",padding:"2.5rem",textAlign:"center"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",color:"var(--text)",marginBottom:"0.75rem"}}>Ready to eat smarter?</div>
              <p style={{color:"var(--text2)",fontSize:"14px",marginBottom:"1.5rem"}}>Upload your first meal photo and see the magic in action.</p>
              <button className="btn-primary" onClick={() => setPage("analyze")}>Get Started →</button>
            </div>
          </div>
        </>)}

        {/* ── ANALYZE ── */}
        {page === "analyze" && (
          <div className="upload-page">
            <div style={{marginBottom:"2.5rem"}}>
              <div className="section-label">Meal Analysis</div>
              <h2 className="section-title">Upload your food photo</h2>
              <p style={{color:"var(--text2)",fontSize:"14px"}}>Our AI detects every item, estimates portions, and delivers a full nutritional breakdown.</p>
            </div>

            {!image ? (
              <div className={`upload-zone ${drag?"drag":""}`}
                onDragOver={e=>{e.preventDefault();setDrag(true)}}
                onDragLeave={()=>setDrag(false)} onDrop={handleDrop}
                onClick={()=>fileRef.current.click()}>
                <input ref={fileRef} type="file" accept="image/*" onChange={e=>handleFile(e.target.files[0])} />
                <div className="upload-icon">📷</div>
                <div className="upload-text">Drop your meal photo here</div>
                <div className="upload-sub">or click to browse · JPG, PNG, WEBP</div>
              </div>
            ) : (
              <div className="preview-wrap">
                <img src={image} alt="Meal preview" className="preview-img" />
                <div className="preview-footer">
                  <span className="preview-name">{imageFile?.name || "meal-photo.jpg"}</span>
                  <button className="remove-btn" onClick={reset}>Remove</button>
                </div>
              </div>
            )}

            {image && !loading && !result && (
              <button className="analyze-btn" onClick={analyze}><span>✨</span> Analyze Nutrition</button>
            )}

            {loading && (
              <div className="loading-card">
                <div className="spinner"></div>
                <div className="loading-text">{stage}</div>
              </div>
            )}

            {result && !loading && (<>
              <div className="result-card">
                <div className="result-header">
                  <div className="result-badge"></div>
                  <div className="result-title">{result.dish}</div>
                </div>
                <div className="result-body">
                  <div className="macro-grid">
                    {[[result.calories,"Calories"],[result.protein+"g","Protein"],[result.carbs+"g","Carbs"],[result.fat+"g","Fat"]].map(([v,n]) => (
                      <div className="macro-cell" key={n}><div className="macro-val">{v}</div><div className="macro-name">{n}</div></div>
                    ))}
                  </div>
                  <div className="result-section">
                    <div className="result-section-title">Balance Score</div>
                    <div className="score-bar-wrap">
                      <div className="score-label"><span>Nutritional Balance</span><span style={{color:"var(--gold)"}}>{result.balance_score}/100</span></div>
                      <div className="score-bar"><div className="score-fill" style={{width:`${scoreWidth}%`}}></div></div>
                    </div>
                  </div>
                  <div className="result-section">
                    <div className="result-section-title">Analysis</div>
                    <div className="result-text">{result.analysis}</div>
                  </div>
                  <div className="result-section">
                    <div className="result-section-title">Recommendations</div>
                    <div className="result-text"><ul>{result.recommendations.map(r=><li key={r}>{r}</li>)}</ul></div>
                  </div>
                  <div className="result-section" style={{background:"var(--green-bg)",border:"0.5px solid rgba(90,173,127,0.2)",borderRadius:"var(--radius)",padding:"14px"}}>
                    <div className="result-section-title" style={{color:"var(--green)"}}>🌿 Sustainable Swap</div>
                    <div className="result-text">{result.sustainable_swap}</div>
                  </div>
                </div>
              </div>
              <button className="try-again" onClick={reset}>← Analyze another meal</button>
            </>)}
          </div>
        )}

        {/* ── RESTRICTIONS ── */}
        {page === "restrict" && (
          <div className="restrict-page">
            <div className="restrict-top">
              <div className="section-label">Dietary Restrictions</div>
              <h2 className="section-title">Foods to avoid by condition</h2>
              <p style={{color:"var(--text2)",fontSize:"14px",marginBottom:"2rem"}}>
                Select any condition to see which Indian foods should be avoided. Data sourced from your restrictions CSV — 20 diseases, 106+ foods mapped.
              </p>
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input placeholder="Search disease…" value={searchQ} onChange={e=>setSearchQ(e.target.value)} />
              </div>
            </div>

            <div className="disease-grid">
              {filteredDiseases.map(d => (
                <button key={d.id} className={`disease-btn ${selectedDisease===d.id?"selected":""}`}
                  onClick={() => setSelectedDisease(selectedDisease===d.id ? null : d.id)}>
                  <span className="d-icon">{d.icon}</span>
                  <span className="d-label">{d.label}</span>
                  <span className="d-count">{d.foods.length}</span>
                </button>
              ))}
              {filteredDiseases.length === 0 && (
                <div style={{gridColumn:"1/-1",padding:"2rem",textAlign:"center",color:"var(--text3)",fontSize:"13px"}}>No diseases match your search</div>
              )}
            </div>

            {!selectedDisease && (
              <div className="no-select">
                <div className="no-select-icon">🏥</div>
                <div className="no-select-text">Select a condition above to view restricted foods</div>
              </div>
            )}

            {disease && (
              <div className="restriction-result">
                <div className="restrict-res-header">
                  <div className="restrict-res-left">
                    <div className="restrict-big-icon">{disease.icon}</div>
                    <div>
                      <div className="restrict-res-title">{disease.label}</div>
                      <div className="restrict-res-sub">Foods to completely avoid with this condition</div>
                    </div>
                  </div>
                  <div className="restrict-pill">⚠️ {disease.foods.length} restricted foods</div>
                </div>
                <div className="foods-body">
                  <div className="foods-section-label">Do not eat</div>
                  <div className="food-tags">
                    {disease.foods.map(f => <span key={f} className="food-tag">{f}</span>)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <footer className="footer">
          NutritionCoach · AI Nutrition Coach · Built by <span>Khushi</span> &amp; <span>Vanshi Sethi</span> · Kurukshetra University
        </footer>
      </div>
    </>
  );
}
