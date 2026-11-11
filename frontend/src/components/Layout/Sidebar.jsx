import { Layout, Menu, Typography, theme } from "antd";
import {
  DashboardOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

const { Sider } = Layout;
const { Title } = Typography;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = theme.useToken();
  const { isDarkMode } = useTheme();

  const items = [
    { key: "/", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/tasks", icon: <CheckSquareOutlined />, label: "My Tasks" },
    { key: "/calendar", icon: <CalendarOutlined />, label: "Calendar" },
    { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  return (
    <Sider
      width={240}
      theme={isDarkMode ? "dark" : "light"}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        background: token.colorBgContainer,
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        zIndex: 10,
      }}
    >
      <div
        style={{
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 8,
            background: token.colorPrimary,
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          ✓
        </span>
        <Title
          level={3}
          style={{
            margin: 0,
            color: token.colorPrimary,
            fontWeight: 700,
            letterSpacing: -0.5,
          }}
        >
          TodoFlow
        </Title>
      </div>

      <Menu
        mode="inline"
        theme={isDarkMode ? "dark" : "light"}
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => navigate(key)}
        style={{
          borderRight: "none",
          paddingTop: 12,
          background: "transparent",
        }}
      />
    </Sider>
  );
}

export default Sidebar;
