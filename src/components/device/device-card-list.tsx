import { Flex } from "antd";
import { Device } from "@/types/govee";
import DeviceCardPreview from "./device-card-preview";
import { Typography } from "antd";

const { Title } = Typography;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DeviceCardList(props: { devices: Device[]; isLoading: boolean; callback?: any }) {
  const { devices, isLoading } = props;
  return (
    <>
      <Title level={4}>Overview</Title>
      <Flex wrap="wrap" gap={"middle"}>
        {devices.map((device, index) => (
          <DeviceCardPreview deviceInformations={device} loading={isLoading} key={index} callback={props.callback} />
        ))}
      </Flex>
    </>
  );
}
