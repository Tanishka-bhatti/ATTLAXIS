// Simulated ML Models based on Python implementation

export interface BiomechanicalFeatures {
  symmetry_ratio: number;
  socket_pressure: number;
  ground_contact_time: number;
  stride_length: number;
  heart_rate: number;
  intact_load: number;
  prosthetic_load: number;
}

export class StabilityModel {
  predict(features: BiomechanicalFeatures): number {
    // Isolation Forest simulation - lower values indicate anomalies/instability
    const normalizedSymmetry = Math.abs(features.symmetry_ratio - 1.0);
    const normalizedPressure = features.socket_pressure / 50;
    const normalizedGCT = features.ground_contact_time / 300;
    const normalizedStride = features.stride_length / 1.5;

    // Calculate anomaly score
    const score =
      -normalizedSymmetry * 0.4 -
      normalizedPressure * 0.3 -
      normalizedGCT * 0.15 -
      normalizedStride * 0.15;

    // Convert to 0-100 stability score
    const stability = Math.max(0, Math.min(100, (score + 0.5) * 100));
    return stability;
  }
}

export class FatigueModel {
  predict(features: BiomechanicalFeatures): number {
    // Random Forest Regressor simulation using fatigue proxy formula
    const fatigueProxy =
      features.heart_rate * 0.4 +
      features.ground_contact_time * 0.3 -
      features.stride_length * 0.2 +
      features.symmetry_ratio * 0.1;

    // Normalize to 0-100 scale
    const fatigue = Math.max(0, Math.min(100, fatigueProxy / 2));
    return fatigue;
  }
}

export class InjuryModel {
  predict(features: BiomechanicalFeatures, stability: number): number {
    // Random Forest Classifier simulation
    const highSymmetry = features.symmetry_ratio > 1.3;
    const highPressure = features.socket_pressure > 45;

    let injuryProb = 0;

    if (highSymmetry) injuryProb += 0.4;
    if (highPressure) injuryProb += 0.3;
    if (stability < 50) injuryProb += 0.2;
    if (features.intact_load > features.prosthetic_load * 1.5) injuryProb += 0.1;

    return Math.max(0, Math.min(100, injuryProb * 100));
  }
}

export function computeReadiness(stability: number, fatigue: number, injury: number): number {
  return 0.45 * stability + 0.35 * (100 - fatigue) + 0.2 * (100 - injury);
}

export function generateBiomechanicalData(baseline?: BiomechanicalFeatures): BiomechanicalFeatures {
  const base = baseline || {
    symmetry_ratio: 1.1,
    socket_pressure: 38,
    ground_contact_time: 250,
    stride_length: 1.3,
    heart_rate: 140,
    intact_load: 450,
    prosthetic_load: 400,
  };

  return {
    symmetry_ratio: Math.max(0.8, Math.min(1.6, base.symmetry_ratio + (Math.random() - 0.5) * 0.15)),
    socket_pressure: Math.max(20, Math.min(60, base.socket_pressure + (Math.random() - 0.5) * 5)),
    ground_contact_time: Math.max(180, Math.min(320, base.ground_contact_time + (Math.random() - 0.5) * 20)),
    stride_length: Math.max(0.8, Math.min(1.8, base.stride_length + (Math.random() - 0.5) * 0.1)),
    heart_rate: Math.max(100, Math.min(190, base.heart_rate + (Math.random() - 0.5) * 10)),
    intact_load: Math.max(300, Math.min(600, base.intact_load + (Math.random() - 0.5) * 40)),
    prosthetic_load: Math.max(250, Math.min(550, base.prosthetic_load + (Math.random() - 0.5) * 35)),
  };
}
