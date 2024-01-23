import { Card, Skeleton, Slider, Row, Col } from "antd";
import { Device } from "@/types/govee";
import { Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

export default function DeviceCardSliders(props: { deviceInformations: Device; loading: boolean }) {
  const colorTemperature = props.deviceInformations.properties.colorTem.range;
  const { loading } = props;
  const [brightness, setBrightness] = useState(50);
  const [temperature, setTemperature] = useState(3000); // Set initial temperature state

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
  };

  const handleTemperatureChange = (value: number) => {
    setTemperature(value);
  };

  return (
    <Card className="min-w-60 w-60 h-64 mt-4" loading={loading} bodyStyle={{ paddingBottom: "12px" }}>
      <Skeleton loading={loading} active>
        <Card.Meta className="text-center" />

        {/* Brightness Slider */}
        <Row className="mt-4" gutter={[16, 16]}>
          <Col span={24}>
            <Text>Brightness</Text>
            <Slider min={0} max={100} value={brightness} onChange={handleBrightnessChange} tooltip={{ formatter: (value) => `${value}%` }} />
          </Col>
        </Row>

        {/* Temperature Slider */}
        {colorTemperature && (
          <Row className="mt-4" gutter={[16, 16]}>
            <Col span={24}>
              <Text>Temperature</Text>
              <Slider
                min={colorTemperature.min}
                max={colorTemperature.max}
                value={temperature}
                onChange={handleTemperatureChange}
                marks={{
                  [colorTemperature.min]: { style: { color: "#FC9116" }, label: "Warm" },
                  [colorTemperature.max]: { style: { color: "#D9E4FF" }, label: "Cold" },
                }}
                tooltip={{ formatter: (value) => `${value}K` }}
              />
            </Col>
          </Row>
        )}
      </Skeleton>
    </Card>
  );
}
