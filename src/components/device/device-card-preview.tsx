/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Skeleton, Button, notification } from "antd";
import { Device } from "@/types/govee";
import GoveeService from "@/services/govee";
import BulbOffSvg from "@/assets/bulb-off.svg";
import BulbOnSvg from "@/assets/bulb-on.svg";
import { Typography } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

const goveeClient = new GoveeService();

export default function DeviceCardPreview(props: { deviceInformations: Device; loading: boolean; callback?: (...args: unknown[]) => void }) {
  const { model, deviceName } = props.deviceInformations;
  const { loading } = props;
  const [bulbSvg, setBulbSvg] = useState(BulbOffSvg);

  function onControlLightClicked(state: string) {
    if (state === "On") {
      setBulbSvg(BulbOnSvg);
    } else {
      setBulbSvg(BulbOffSvg);
    }
  }

  function redirectToDeviceDetail() {
    props.callback?.({ key: "light-" + props.deviceInformations.device });
  }

  return (
    <Card
      className="min-w-60 w-60 h-[270px] mt-4"
      loading={loading}
      actions={[
        <ControlLightButton action="On" device={props.deviceInformations} callback={onControlLightClicked} />,
        <ControlLightButton action="Off" device={props.deviceInformations} callback={onControlLightClicked} />,
      ]}
      bodyStyle={{ paddingBottom: "12px" }}
      hoverable={true}
      onClick={(e) => redirectToDeviceDetail()}
    >
      <Skeleton loading={loading} active>
        <Card.Meta
          // title={deviceName}
          // description={"Model " + model}
          className="text-center"
        />
        <div className="flex flex-col w-full items-center">
          {/* load svg assets/bulb-off */}
          <img src={bulbSvg} alt="bulb-off" className="w-32" />
          <Title level={5} className="font-bold mt-2 !mb-0">
            {deviceName}
          </Title>
          <Text className="text-sm text-gray-600">{model}</Text>
        </div>
      </Skeleton>
    </Card>
  );
}

function ControlLightButton(props: { action: "On" | "Off"; device: Device; callback: (state: string) => void }) {
  const { action, device, callback } = props;
  const [api, contextHolder] = notification.useNotification();

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    let promise: Promise<void>;

    if (action === "On") promise = goveeClient.turnDeviceOn(device.device, device.model);
    else if (action === "Off") promise = goveeClient.turnDeviceOff(device.device, device.model);
    else return;
    promise
      .then(() => {
        api.success({
          message: "Success",
          description: `Device ${device.device} turned ${action.toLowerCase()}`,
        });

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
