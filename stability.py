from sklearn.ensemble import IsolationForest
import numpy as np

class StabilityModel:
    def __init__(self, df):
        X = df[[
            "symmetry_ratio",
            "socket_pressure",
            "ground_contact_time",
            "stride_length"
        ]].dropna()

        self.model = IsolationForest(contamination=0.1)
        self.model.fit(X)

    def predict(self, features):
        X = np.array([[
            features["symmetry_ratio"],
            features["socket_pressure"],
            features["ground_contact_time"],
            features["stride_length"]
        ]])

        score = self.model.decision_function(X)[0]

        # Convert to 0–100 stability
        return max(0, min(100, (score + 0.5) * 100))