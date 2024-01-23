import { Device } from "../../types/govee";
import { Typography, Button } from "antd";
import DeviceCardSliders from "./device-card-sliders";
import DeviceCardWithColorPicker from "./device-color-control";
import { useState } from "react";
import DeviceCardOnOff from "./device-card-on-off";

const { Title, Text } = Typography;

export default function DevicePreview(props: { deviceInformations: Device; callback?: (...args: unknown[]) => void }) {
  const [enableDebug, setEnableDebug] = useState(false);

  const { deviceInformations } = props;
  return (
    <div>
      <div className="flex flex-col">
        <Title level={4} className="font-bold">
          {deviceInformations?.deviceName ?? "default device name"} <Text className="text-sm text-gray-600">({deviceInformations?.model})</Text>
        </Title>
      </div>
      <Button onClick={() => setEnableDebug(!enableDebug)} className="text-blue-500 underline">
        {enableDebug ? "Disable Debug" : "Enable Debug"}
      </Button>
      {enableDebug && (
        <div className="flex flex-col">
          <Text className="text-lg">{deviceInformations?.model}</Text>
          <Text className="text-lg">{deviceInformations?.device}</Text>
          <Text className="text-lg">Controllable: {deviceInformations?.controllable.toString()}</Text>
          <Text className="text-lg">Retrievable: {deviceInformations?.retrievable.toString()}</Text>
          <Text className="text-lg">Properties: {JSON.stringify(deviceInformations?.properties)}</Text>
          <Text className="text-lg">Support Cmds: {deviceInformations?.supportCmds.toString()}</Text>
        </div>
      )}
      <div className="flex lg:flex-wrap gap-2 flex-col lg:flex-row">
        <DeviceCardOnOff deviceInformations={deviceInformations} loading={false} />
        <DeviceCardWithColorPicker deviceInformations={deviceInformations} loading={false} />
        <DeviceCardSliders deviceInformations={deviceInformations} loading={false} />
      </div>
    </div>
  );
}
