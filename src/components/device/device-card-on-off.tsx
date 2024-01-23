import { Card, Skeleton, Button } from "antd";
import { Device } from "@/types/govee";
import GoveeService from "@/services/govee";
import BulbOffSvg from "@/assets/bulb-off.svg";
import BulbOnSvg from "@/assets/bulb-on.svg";
// import { Typography } from "antd";
import { useState } from "react";

// const { Title, Text } = Typography;

const goveeClient = new GoveeService();

export default function DeviceCardOnOff(props: { deviceInformations: Device; loading: boolean }) {
  // const { model, deviceName } = props.deviceInformations;
  const { loading } = props;
  const [bulbSvg, setBulbSvg] = useState(BulbOffSvg);

  function onControlLightClicked(state: string) {
    if (state === "On") {
      setBulbSvg(BulbOnSvg);
    } else {
      setBulbSvg(BulbOffSvg);
    }
  }

  return (
    <Card
      className="min-w-60 w-60 h-64 mt-4"
      loading={loading}
      actions={[
        <ControlLightButton action="On" device={props.deviceInformations} callback={onControlLightClicked} />,
        <ControlLightButton action="Off" device={props.deviceInformations} callback={onControlLightClicked} />,
      ]}
      bodyStyle={{ paddingBottom: "12px" }}
    >
      <Skeleton loading={loading} active>
        <Card.Meta
          // title={deviceName}
          // description={"Model " + model}
          className="text-center"
        />
        <div className="flex flex-col w-full items-center">
          {/* load svg assets/bulb-off */}
          <div className="absolute w-1 h-16 bg-black -top-[1px]"></div>
          <img src={bulbSvg} alt="bulb-off" className="w-32 mt-10 rotate-180" />
          {/* <Title level={5} className="font-bold mt-2 !mb-0">
            {deviceName}
          </Title>
          <Text className="text-sm text-gray-600">{model}</Text> */}
        </div>
      </Skeleton>
    </Card>
  );
}

function ControlLightButton(props: { action: "On" | "Off"; device: Device; callback: (state: string) => void }) {
  const { action, device, callback } = props;

  function handleClick() {
    let promise: Promise<void>;

    if (action === "On") promise = goveeClient.turnDeviceOn(device.device, device.model);
    else if (action === "Off") promise = goveeClient.turnDeviceOff(device.device, device.model);
    else return;
    promise
      .then(() => {
        callback(action);
      })
      .catch((error: unknown) => {
        // TODO: add notification
        console.log(error);
      });
  }

  return (
    <Button className="border-none shadow-none" onClick={handleClick}>
      {props.action}
    </Button>
  );
}
