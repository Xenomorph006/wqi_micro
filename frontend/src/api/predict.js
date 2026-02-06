let API_URL = "http://localhost:5000";

export async function predictWQI(data) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return response.json();
}
