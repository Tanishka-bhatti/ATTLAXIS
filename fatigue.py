from sklearn.ensemble import RandomForestRegressor
import numpy as np

class FatigueModel:
    def __init__(self, df):
        df["fatigue_proxy"] = (
            df["heart_rate"] * 0.4 +
            df["ground_contact_time"] * 0.3 -
            df["stride_length"] * 0.2 +
            df["symmetry_ratio"] * 0.1
        )

        X = df[[
            "heart_rate",
            "ground_contact_time",
            "stride_length",
            "symmetry_ratio"
        ]]

        y = df["fatigue_proxy"]

        self.model = RandomForestRegressor()
        self.model.fit(X, y)

    def predict(self, window):
        features = [
            window["heart_rate"].mean(),
            window["ground_contact_time"].mean(),
            window["stride_length"].mean(),
            window["symmetry_ratio"].mean()
        ]

        pred = self.model.predict([features])[0]

        return max(0, min(100, pred))