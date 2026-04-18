import pandas as pd
import numpy as np
from fastapi import FastAPI
from time import sleep

from models.stability import StabilityModel
from models.fatigue import FatigueModel
from models.injury import InjuryModel
from score.readiness import compute_readiness

app = FastAPI()

# Load data
df = pd.read_csv("data/appis_simulated.csv")

# Feature engineering
df["symmetry_ratio"] = df["prosthetic_load"] / (df["intact_load"] + 1e-5)

# Initialize models
stability_model = StabilityModel(df)
fatigue_model = FatigueModel(df)
injury_model = InjuryModel(df)

@app.get("/stream")
def stream_data():
    results = []

    for i in range(20, len(df)):
        window = df.iloc[i-20:i]

        features = {
            "symmetry_ratio": window["symmetry_ratio"].mean(),
            "socket_pressure": window["socket_pressure"].mean(),
            "ground_contact_time": window["ground_contact_time"].mean(),
            "stride_length": window["stride_length"].mean(),
            "heart_rate": window["heart_rate"].mean(),
            "intact_load": window["intact_load"].mean(),
        }

        stability = stability_model.predict(features)
        fatigue = fatigue_model.predict(window)
        injury = injury_model.predict(features, stability)

        readiness = compute_readiness(stability, fatigue, injury)

        results.append({
            "stability": stability,
            "fatigue": fatigue,
            "injury": injury,
            "readiness": readiness
        })

        sleep(0.1)  # simulate live

    return results