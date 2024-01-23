import { DarkModeProps } from "@/types/dark-mode";
import { Button, Col, Row, Typography, theme, Layout, Menu } from "antd";
import goveeLongLogo from "@/assets/govee-long-logo.png";

const { Title } = Typography;
const { Header } = Layout;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Homepage(_props: DarkModeProps) {
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center flex-col gap-2 sm:gap-0 sm:flex-row" style={{ background: colorBgLayout }}>
        <a href="/" className=" text-[#00ACE7] hover:text-[#00ACE7] text-2xl font-bold flex items-center gap-2">
          <img src={goveeLongLogo} alt="logo" className="h-6" />
          Web Interface
        </a>
        <Menu theme="dark" mode="horizontal" style={{ flex: 1, minWidth: 0 }} />
        <Button>
          <a href="/dashboard">Access your panel</a>
        </Button>
      </Header>

      <div className="pt-16">
        {/* <h1 className="text-5xl font-bold text-zinc-900">Govee Web Interface</h1>
        <a href="/dashboard">Access your panel</a> */}
        <Row>
          <Col flex="1" className="flex justify-end">
            <img src={goveeLongLogo} alt="logo" className="h-24 mr-10" />
          </Col>
          <Col flex="1"></Col>
        </Row>
        <Row>
          <Col flex="1"></Col>
          <Col flex="1">
            <Title className="!text-8xl mt-10 ml-10 !p-0">Web</Title>
          </Col>
        </Row>
        <Row>
          <Col flex="1" className="flex justify-end text-right">
            <Title className="!text-8xl mr-10 !p-0">Interface</Title>
          </Col>
          <Col flex="1"></Col>
        </Row>
      </div>
    </Layout>
  );
}
