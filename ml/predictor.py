import sys
import json
import torch
import torch.nn as nn
import os
import joblib
import torch.nn.functional as F

# =========================
# Model Architecture
# =========================
class WQI_ANN(nn.Module):
    def __init__(self, input_dim, output_dim):
        super(WQI_ANN, self).__init__()
        self.fc1 = nn.Linear(input_dim, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, output_dim)
        self.relu = nn.ReLU()
        self.gelu = nn.GELU()

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.gelu(self.fc2(x))
        x = self.fc3(x)
        return x


# =========================
# Paths
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "wqi_ann_model.pth")
SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")


# =========================
# Safety Check
# =========================
if len(sys.argv) < 2:
    print(json.dumps({ "error": "No input data provided" }))
    sys.exit(1)

data = json.loads(sys.argv[1])


# =========================
# Load Model (EXACT MATCH)
# =========================
INPUT_DIM = 4
OUTPUT_DIM = 5   # ✅ MUST MATCH TRAINING

model = WQI_ANN(INPUT_DIM, OUTPUT_DIM)
state_dict = torch.load(MODEL_PATH, map_location="cpu")
model.load_state_dict(state_dict)
model.eval()


# =========================
# Load Scaler
# =========================
scaler = joblib.load(SCALER_PATH)


# =========================
# Prepare Input
# ORDER: [ph, turbidity, temperature, tds]
# =========================
X_raw = [[
    float(data["ph"]),
    float(data["turbidity"]),
    float(data["temperature"]),
    float(data["tds"])
]]

X_scaled = scaler.transform(X_raw)
X = torch.tensor(X_scaled, dtype=torch.float32)


# =========================
# Predict
# =========================
with torch.no_grad():
    logits = model(X)
    probs = F.softmax(logits, dim=1)
    class_index = torch.argmax(probs, dim=1).item()
    confidence = probs[0][class_index].item()

    # DEBUG (safe)
    print("LOGITS:", logits.tolist(), file=sys.stderr)
    print("PROBS:", probs.tolist(), file=sys.stderr)


# =========================
# Class Labels (5 ONLY)
# =========================
CLASS_LABELS = [
    "Excellent",
    "Good",
    "Avg",
    "Medium",
    "Poor"
]

predicted_class = CLASS_LABELS[class_index]


# =========================
# Output JSON ONLY
# =========================
print(json.dumps({
    "class_index": class_index,
    "wqi_class": predicted_class,
    "confidence": round(confidence, 4)
}))
