def compute_readiness(stability, fatigue, injury):
    return (
        0.45 * stability +
        0.35 * (100 - fatigue) +
        0.20 * (100 - injury)
    )