import { getDeviceType } from "@/libs/getDeviceType";

export default function DeviceDetector() {
  const deviceType = getDeviceType();

  return (
    <div>
      <p>Your device type: {deviceType}</p>
    </div>
  );
}
