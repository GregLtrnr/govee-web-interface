import { Card, Skeleton, Slider, Row, Col } from "antd";
import { Device } from "@/types/govee";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import GoveeService from "@/services/govee";
import { useDebouncedCallback } from "use-debounce";

const { Text } = Typography;

const goveeClient = new GoveeService();

export default function DeviceCardSliders(props: { deviceInformations: Device; loading: boolean }) {
  const colorTemperature = props.deviceInformations.properties.colorTem.range;
  const { loading } = props;
  const { model, device } = props.deviceInformations;
  const [brightness, setBrightness] = useState(50);
  const [temperature, setTemperature] = useState(3000); // Set initial temperature state

  const brightnessDebounce = useDebouncedCallback(
    (brightness) => {
      setBrightness(brightness);
    },
    // delay in ms
    1000
  );

  const temperatureDebounce = useDebouncedCallback(
    (temperature) => {
      setTemperature(temperature);
    },
    // delay in ms
    1000
  );

  useEffect(() => {
    // Simulate API call to set brightness and temperature
    const setDeviceSettings = async () => {
      try {
        // Replace with actual API call
        console.log("Setting device settings:", { brightness, temperature });
        await goveeClient.setBrightness(device, model, brightness);
        await goveeClient.setLightTemperature(device, model, temperature);
      } catch (error) {
        console.error("Error setting device settings:", error);
      }
    };

    setDeviceSettings();
  }, [brightness, temperature]);

  return (
    <Card className="min-w-60 w-60 h-64 mt-4" loading={loading} bodyStyle={{ paddingBottom: "12px" }}>
      <Skeleton loading={loading} active>
        <Card.Meta className="text-center" />

        {/* Brightness Slider */}
        <Row className="mt-4" gutter={[16, 16]}>
          <Col span={24}>
            <Text>Brightness</Text>
            <Slider min={0} max={100} value={brightness} onChange={(e) => brightnessDebounce(e)} tooltip={{ formatter: (value) => `${value}%` }} />
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
                onChange={(e) => temperatureDebounce(e)}
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
