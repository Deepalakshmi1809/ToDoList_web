import { Layout, Typography, Space, Avatar, Button, Grid, theme } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title, Text } = Typography;

function Navbar({ onMenuClick }) {
  const screens = Grid.useBreakpoint();
  const { token } = theme.useToken();

  return (
    <Header
      style={{
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        padding: screens.md ? "0 24px" : "0 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 9,
        lineHeight: "64px",
        height: 64,
      }}
    >
      <Space size="middle" align="center">
        {!screens.md && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            style={{ fontSize: 16 }}
          />
        )}

        <Title
          level={screens.md ? 4 : 5}
          style={{
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          My Workspace
        </Title>
      </Space>

      <Space size={screens.md ? "middle" : "small"} align="center">
        {screens.md && (
          <Text type="secondary" style={{ fontSize: 14 }}>
            Welcome back!
          </Text>
        )}

        <Avatar
          style={{
            backgroundColor: token.colorPrimary,
            verticalAlign: "middle",
          }}
          icon={<UserOutlined />}
        />
      </Space>
    </Header>
  );
}

export default Navbar;
