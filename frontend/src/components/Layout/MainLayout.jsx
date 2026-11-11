import { useState } from "react";
import { Layout, Drawer, Menu, Grid, theme } from "antd";
import {
  DashboardOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useTheme from "../../hooks/useTheme";

const { Content } = Layout;

function MainLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = Grid.useBreakpoint();
  const { token } = theme.useToken();
  const { isDarkMode } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "/", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/tasks", icon: <CheckSquareOutlined />, label: "My Tasks" },
    { key: "/calendar", icon: <CalendarOutlined />, label: "Calendar" },
    { key: "/settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  function handleMenuClick({ key }) {
    navigate(key);
    setDrawerOpen(false);
  }

  // screens.md is true on tablets and desktops (width >= 768px)
  const isDesktop = screens.md;

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: token.colorBgLayout,
      }}
    >
      {isDesktop && <Sidebar />}

      <Layout
        style={{
          background: token.colorBgLayout,
          minWidth: 0,
        }}
      >
        <Navbar onMenuClick={() => setDrawerOpen(true)} />

        <Content
          style={{
            padding: screens.md ? "24px 32px" : "16px 12px",
            minWidth: 0,
            maxWidth: 1400,
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Content>
      </Layout>

      <Drawer
        title="TodoFlow Menu"
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="default"
        styles={{
          body: {
            padding: 0,
            background: token.colorBgContainer,
          },
          header: {
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          },
        }}
      >
        <Menu
          mode="inline"
          theme={isDarkMode ? "dark" : "light"}
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            borderRight: "none",
            background: "transparent",
            paddingTop: 8,
          }}
        />
      </Drawer>
    </Layout>
  );
}

export default MainLayout;
