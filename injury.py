from sklearn.ensemble import RandomForestClassifier
import numpy as np

class InjuryModel:
    def __init__(self, df):
        df["injury_label"] = (
            (df["symmetry_ratio"] > 1.3) |
            (df["socket_pressure"] > df["socket_pressure"].mean() + 10)
        ).astype(int)

        X = df[[
            "symmetry_ratio",
            "intact_load",
            "socket_pressure"
        ]]

        y = df["injury_label"]

        self.model = RandomForestClassifier()
        self.model.fit(X, y)

    def predict(self, features, stability):
        X = [[
            features["symmetry_ratio"],
            features["intact_load"],
            features["socket_pressure"]
        ]]

        prob = self.model.predict_proba(X)[0][1]

        return prob * 100