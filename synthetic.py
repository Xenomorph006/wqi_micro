import numpy as np
import pandas as pd

# -------------------------------
# CONFIGURATION
# -------------------------------
NUM_SAMPLES = 6500   # >6000 samples
RANDOM_SEED = 42

np.random.seed(RANDOM_SEED)

# -------------------------------
# 1. GENERATE INPUT SENSOR DATA
# -------------------------------

pH = np.random.uniform(5.5, 9.5, NUM_SAMPLES)
turbidity = np.random.uniform(0, 50, NUM_SAMPLES)     # NTU
temperature = np.random.uniform(5, 40, NUM_SAMPLES)   # Celsius
tds = np.random.uniform(50, 2000, NUM_SAMPLES)        # mg/L

# -------------------------------
# 2. QUALITY SCORE FUNCTIONS
# -------------------------------

def ph_score(ph):
    return np.exp(-((ph - 7.0) ** 2) / 1.5) * 100

def turbidity_score(t):
    return np.clip(100 - (t * 2), 0, 100)

def tds_score(tds):
    return np.clip(100 - (tds / 20), 0, 100)

def temperature_score(temp):
    return np.exp(-((temp - 25) ** 2) / 200) * 100

# -------------------------------
# 3. CALCULATE SUB-SCORES
# -------------------------------

ph_q = ph_score(pH)
turb_q = turbidity_score(turbidity)
tds_q = tds_score(tds)
temp_q = temperature_score(temperature)

# -------------------------------
# 4. FUSE INTO NUMERIC WQI
# -------------------------------

WQI_numeric = (
    0.30 * ph_q +
    0.25 * turb_q +
    0.25 * tds_q +
    0.20 * temp_q
)

# Add noise to simulate real environment
noise = np.random.normal(0, 3, NUM_SAMPLES)
WQI_numeric = WQI_numeric + noise

# Clamp to [0,100]
WQI_numeric = np.clip(WQI_numeric, 0, 100)

# -------------------------------
# 5. CONVERT WQI TO CLASS LABELS
# -------------------------------

def wqi_to_class(wqi):
    if wqi >= 80:
        return "Good"
    elif wqi >= 60:
        return "Medium"
    elif wqi >= 40:
        return "Avg"
    elif wqi >= 20:
        return "Not good"
    else:
        return "Dangerous"

WQI_class = [wqi_to_class(w) for w in WQI_numeric]

# -------------------------------
# 6. CREATE FINAL DATASET
# -------------------------------

dataset = pd.DataFrame({
    "pH": pH,
    "Turbidity": turbidity,
    "Temperature": temperature,
    "TDS": tds,
    "WQI_Class": WQI_class
})

# -------------------------------
# 7. SAVE DATASET
# -------------------------------

dataset.to_csv("synthetic_water_quality_dataset_class.csv", index=False)

print("✅ Synthetic dataset with WQI classes generated!")
print("📊 Total samples:", len(dataset))
print(dataset.head())
