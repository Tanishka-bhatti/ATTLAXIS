interface BiomechanicalData {
  symmetry_ratio: number;
  socket_pressure: number;
  ground_contact_time: number;
  stride_length: number;
  heart_rate: number;
  intact_load: number;
  prosthetic_load: number;
}

interface BiomechanicalPanelProps {
  data: BiomechanicalData;
}

export function BiomechanicalPanel({ data }: BiomechanicalPanelProps) {
  const features = [
    { label: "Symmetry Ratio", value: data.symmetry_ratio.toFixed(2), unit: "", warning: data.symmetry_ratio > 1.3 },
    { label: "Socket Pressure", value: data.socket_pressure.toFixed(1), unit: "kPa", warning: data.socket_pressure > 45 },
    { label: "Ground Contact", value: data.ground_contact_time.toFixed(0), unit: "ms", warning: false },
    { label: "Stride Length", value: data.stride_length.toFixed(2), unit: "m", warning: false },
    { label: "Heart Rate", value: data.heart_rate.toFixed(0), unit: "bpm", warning: data.heart_rate > 170 },
    { label: "Intact Load", value: data.intact_load.toFixed(1), unit: "N", warning: false },
    { label: "Prosthetic Load", value: data.prosthetic_load.toFixed(1), unit: "N", warning: false },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Biomechanical Sensors</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div
            key={feature.label}
            className={`p-4 rounded-lg ${
              feature.warning ? "bg-red-50 border border-red-200" : "bg-gray-50"
            }`}
          >
            <div className="text-xs text-gray-500 mb-1">{feature.label}</div>
            <div className={`text-2xl font-bold ${feature.warning ? "text-red-600" : "text-gray-800"}`}>
              {feature.value}
              <span className="text-sm font-normal text-gray-500 ml-1">{feature.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
