import { Card, Typography, Switch, Space, Divider, theme } from "antd";
import { useState } from "react";
import {
  BulbOutlined,
  BellOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import useTheme from "../hooks/useTheme";

const { Title, Text, Paragraph } = Typography;

function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { token } = theme.useToken();
  const [notifications, setNotifications] = useState(true);

  return (
    <Space orientation="vertical" orientationMargin={0} size="large" style={{ width: "100%" }}>
      <div>
        <Title level={2} style={{ marginBottom: 4 }}>
          Settings
        </Title>
        <Text type="secondary">
          Customize your appearance and workspace preferences.
        </Text>
      </div>

      {/* Theme Settings Card */}
      <Card
        title={
          <Space>
            <BulbOutlined style={{ color: token.colorPrimary }} />
            <span>Theme Settings</span>
          </Space>
        }
        bordered={false}
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
          background: token.colorBgContainer,
        }}
      >
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <Text strong style={{ display: "block" }}>
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </Text>
              <Text type="secondary">
                Switch between light and dark visual themes across the application.
              </Text>
            </div>

            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
          </div>

          <Divider style={{ margin: "8px 0" }} />

          <Text type="secondary">
            Current Theme:{" "}
            <Text strong style={{ color: token.colorPrimary }}>
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </Text>
          </Text>
        </Space>
      </Card>

      {/* Notification Settings Card */}
      <Card
        title={
          <Space>
            <BellOutlined style={{ color: token.colorPrimary }} />
            <span>Notification Settings</span>
          </Space>
        }
        bordered={false}
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
          background: token.colorBgContainer,
        }}
      >
        <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <Text strong style={{ display: "block" }}>
                Enable notifications
              </Text>
              <Text type="secondary">
                Receive reminders and updates regarding upcoming due dates.
              </Text>
            </div>

            <Switch
              checked={notifications}
              onChange={setNotifications}
            />
          </div>

          <Divider style={{ margin: "8px 0" }} />

          <Text type="secondary">
            Notifications:{" "}
            <Text strong style={{ color: notifications ? token.colorSuccess : token.colorTextSecondary }}>
              {notifications ? "Enabled" : "Disabled"}
            </Text>
          </Text>
        </Space>
      </Card>

      {/* About Section Card */}
      <Card
        title={
          <Space>
            <InfoCircleOutlined style={{ color: token.colorPrimary }} />
            <span>About Section</span>
          </Space>
        }
        bordered={false}
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
          background: token.colorBgContainer,
        }}
      >
        <Space orientation="vertical" size="small">
          <Paragraph strong style={{ fontSize: 16, margin: 0 }}>
            TodoFlow – Todo List Application
          </Paragraph>
          <Paragraph type="secondary" style={{ margin: 0 }}>
            Built with React and Ant Design.
          </Paragraph>
          <Text type="secondary" style={{ fontSize: 12, marginTop: 8, display: "block" }}>
            Version 1.0.0 • Ant Design 6.6.8 • Responsive & Accessible
          </Text>
        </Space>
      </Card>
    </Space>
  );
}

export default Settings;
