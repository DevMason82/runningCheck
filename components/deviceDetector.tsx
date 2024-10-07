import { getDeviceType } from "@/libs/getDeviceType";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { TiDeviceDesktop, TiDevicePhone, TiDeviceTablet } from "react-icons/ti";

export default function DeviceDetector() {
  const deviceType = getDeviceType();

  return (
    <Card>
      <CardHeader>Your device type</CardHeader>
      <Divider />
      <CardBody className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {deviceType === "Desktop" ? (
            <TiDeviceDesktop size={36} />
          ) : deviceType === "Tablet" ? (
            <TiDeviceTablet size={36} />
          ) : (
            <TiDevicePhone size={36} />
          )}
          <p className="font-semibold">{deviceType}</p>
        </div>
      </CardBody>
    </Card>
  );
}
