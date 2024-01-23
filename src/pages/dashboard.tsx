import { UserOutlined, BulbOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, notification, theme, Typography } from "antd";
import { useEffect, useState } from "react";
import DevicePreview from "@/components/device/device-preview";
import { Device } from "@/types/govee";
import { DarkModeProps } from "@/types/dark-mode";
import DeviceCardList from "@/components/device/device-card-list";
import GoveeService from "@/services/govee";
import { ItemType } from "antd/es/menu/hooks/useItems";

const { Header, Content, Footer, Sider } = Layout;

const { Text } = Typography;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const lights: Device[] = [
  {
    device: "abd",
    model: "H6003",
    deviceName: "Bed Room",
    controllable: true,
    properties: {
      colorTem: {
        range: {
          min: 2000,
          max: 9000,
        },
      },
    },
    retrievable: true,
    supportCmds: ["turn", "brightness", "color", "colorTem"],
  },
  {
    device: "dce",
    model: "H6002",
    deviceName: "Living Room",
    controllable: true,
    properties: {
      colorTem: {
        range: {
          min: 2000,
          max: 9000,
        },
      },
    },
    retrievable: true,
    supportCmds: ["turn", "brightness", "color", "colorTem"],
  },
  {
    device: "fch",
    model: "H6004",
    deviceName: "kitchen",
    controllable: true,
    properties: {
      colorTem: {
        range: {
          min: 2000,
          max: 9000,
        },
      },
    },
    retrievable: true,
    supportCmds: ["turn", "brightness", "color", "colorTem"],
  },
];

export default function Dashboard(props: DarkModeProps) {
  const [devicesList, setDevicesList] = useState<Device[]>([]);
  const [isLoadingDevices, setIsLoadingDevices] = useState(true);
  const [isErrorLoadingDevices, setIsErrorLoadingDevices] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState({ key: "menu-1" });
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [api, contextHolder] = notification.useNotification();
  const goveeClient = new GoveeService();

  const [siderItems, setSiderItems] = useState<ItemType[]>([
    {
      key: "menu-1",
      label: "Dashboard",
      icon: <UserOutlined />,
    },
    {
      key: "menu-2",
      label: "Devices",
      icon: <BulbOutlined />,
      children: devicesList.map((light) => ({
        key: "light-" + light.device,
        label: light.deviceName,
      })),
    },
  ]);

  const {
    token: { colorBgContainer, colorBgLayout, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick: MenuProps["onClick"] = (e) => {
    const light = devicesList.find((light) => "light-" + light.device === e.key);
    setSelectedMenuKey({ key: e.key as string });
    setSelectedDevice(light || null);
  };

  useEffect(() => {
    goveeClient
      .getAllDevicesForAccount()
      .then((devices) => {
        setDevicesList(devices);
        setIsLoadingDevices(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingDevices(false);
        setIsErrorLoadingDevices(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSiderItems([
      {
        key: "menu-1",
        label: "Overview",
        icon: <UserOutlined />,
      },
      {
        key: "menu-2",
        label: "Devices",
        icon: <BulbOutlined />,
        children: devicesList.map((light) => ({
          key: "light-" + light.device,
          label: light.deviceName,
        })),
      },
    ]);
  }, [devicesList]);

  return (
    <Layout className="min-h-screen">
      {contextHolder}
      <Header className="flex items-center flex-col gap-2 sm:gap-0 sm:flex-row" style={{ background: colorBgLayout }}>
        <a href="/" className=" text-[#00ACE7] hover:text-[#00ACE7] text-2xl font-bold flex items-center gap-2">
          Govee Web Interface
        </a>
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }} />
        <Button onClick={() => props.toggleDarkMode()}>
          <Text style={props.isDarkMode ? { color: "#DCDCDC" } : { color: "#1C1C1C" }}>Change Theme to {props.isDarkMode ? "Light" : "Dark"}</Text>
        </Button>
      </Header>

      <Content className="md:px-12 xl:px-48 2xl:px-80">
        {/* Bread crumb */}
        <Breadcrumb className="my-4">
          <Breadcrumb.Item>
            <a href="/">Homepage</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>

        {/* Menu panel */}
        <Layout style={{ padding: "24px 0", background: colorBgContainer, borderRadius: borderRadiusLG }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu mode="inline" defaultSelectedKeys={["1"]} className="h-full" items={siderItems} onClick={onMenuClick} />
          </Sider>

          {/* Content panel */}
          <Content style={{ padding: "0 24px", minHeight: 300 }}>
            {isErrorLoadingDevices && <p className="text-red-600">Error loading devices, reload the page</p>}
            {selectedMenuKey && selectedMenuKey.key === "menu-1" && !isErrorLoadingDevices && <DeviceCardList devices={devicesList} isLoading={isLoadingDevices} callback={onMenuClick} />}
            {selectedMenuKey && selectedMenuKey.key.startsWith("light-") && <DevicePreview deviceInformations={selectedDevice!} />}
          </Content>
        </Layout>
      </Content>

      <Footer style={{ textAlign: "center" }}>Gregory Letourneur © {new Date().getFullYear()}</Footer>
    </Layout>
  );
}
