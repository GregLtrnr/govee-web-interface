import { Card, Skeleton } from "antd";
import { Device } from "@/types/govee";
// import { Typography } from "antd";
import Wheel from "@uiw/react-color-wheel";
import { useEffect, useState } from "react";
import { ColorResult } from "@uiw/react-color";
import GoveeService from "@/services/govee";
import { useDebounce } from "@uidotdev/usehooks";
import { useNotification } from "@/contexts/NotificationContext";

// const {
//   Title,
//   // Text,
// } = Typography;

const goveeClient = new GoveeService();

export default function DeviceCardWithColorPicker(props: { deviceInformations: Device; loading: boolean }) {
  const { model, device } = props.deviceInformations;
  const { loading } = props;
  const [color, setColor] = useState("#ffffff"); // Default color is white
  const debouncedColor = useDebounce(color, 400);
  const notificationService = useNotification();
  const [useEffectCount, setUseEffectCount] = useState(0);

  useEffect(() => {
    console.log(useEffectCount);
    if (useEffectCount > 0) {
      const rgbColor = {
        r: parseInt(color.substr(1, 2), 16),
        g: parseInt(color.substr(3, 2), 16),
        b: parseInt(color.substr(5, 2), 16),
      };

      goveeClient
        .setColor(device, model, rgbColor)
        .then(() => {
          notificationService.success({ message: "Color Changed successfully" });
        })
        .catch((error) => {
          console.log(error);
          notificationService.error({ message: error.response.data.message });
        });
    } else {
      setUseEffectCount(useEffectCount + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedColor]);

  return (
    <Card className="min-w-60 w-60 h-64 mt-4" loading={loading} bodyStyle={{ paddingBottom: "12px" }}>
      <Skeleton loading={loading} active>
        <Card.Meta className="text-center" />
        <Wheel color={color} onChange={(colorResult: ColorResult) => setColor(colorResult.hex)} />
        <div>
          {/* <Text className="text-center flex gap-2 items-center">
            Selected color: <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
          </Text> */}
        </div>
      </Skeleton>
    </Card>
  );
}
