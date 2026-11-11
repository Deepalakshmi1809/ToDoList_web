import {
  Row,
  Col,
  Card,
  Typography,
  Progress,
  Tag,
  Space,
  Empty,
  Listy,
  theme,
} from "antd";
import {
  UnorderedListOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import useTasks from "../hooks/useTasks";
import { formatDate } from "../utils/dateUtils";

const { Title, Text } = Typography;

function Home() {
  const { tasks } = useTasks();
  const { token } = theme.useToken();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const completion = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <Space orientation="vertical" orientationMargin={0} size="large" style={{ width: "100%" }}>
      <div>
        <Title level={2} style={{ marginBottom: 4 }}>
          Dashboard
        </Title>
        <Text type="secondary">Here is your daily task and progress overview.</Text>
      </div>

      {/* Responsive statistics cards: 1 per row mobile, 2 per row tablet, 3 per row desktop */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowTertiary,
              background: token.colorBgContainer,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text type="secondary" style={{ fontSize: 14 }}>
                  Total Tasks
                </Text>
                <Title level={2} style={{ margin: "4px 0 0 0" }}>
                  {totalTasks}
                </Title>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${token.colorPrimary}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: token.colorPrimary,
                  fontSize: 22,
                }}
              >
                <UnorderedListOutlined />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowTertiary,
              background: token.colorBgContainer,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text type="secondary" style={{ fontSize: 14 }}>
                  Pending Tasks
                </Text>
                <Title level={2} style={{ margin: "4px 0 0 0", color: token.colorWarning }}>
                  {pendingTasks}
                </Title>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${token.colorWarning}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: token.colorWarning,
                  fontSize: 22,
                }}
              >
                <ClockCircleOutlined />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            bordered={false}
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowTertiary,
              background: token.colorBgContainer,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Text type="secondary" style={{ fontSize: 14 }}>
                  Completed Tasks
                </Text>
                <Title level={2} style={{ margin: "4px 0 0 0", color: token.colorSuccess }}>
                  {completedTasks}
                </Title>
              </div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `${token.colorSuccess}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: token.colorSuccess,
                  fontSize: 22,
                }}
              >
                <CheckCircleOutlined />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Task Progress percentage & progress bar */}
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Task Progress</span>
            <Text type="secondary" style={{ fontSize: 14, fontWeight: "normal" }}>
              {completedTasks} of {totalTasks} completed ({completion}%)
            </Text>
          </div>
        }
        bordered={false}
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
          background: token.colorBgContainer,
        }}
      >
        <Progress
          percent={completion}
          strokeColor={{
            "0%": "#6366f1",
            "100%": token.colorSuccess,
          }}
          status={completion === 100 ? "success" : "active"}
        />
      </Card>

      {/* Recent Tasks section */}
      <Card
        title="Recent Tasks"
        bordered={false}
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
          background: token.colorBgContainer,
        }}
      >
        {recentTasks.length === 0 ? (
          <Empty description="No tasks yet. Add your first task in My Tasks!" />
        ) : (
          <Listy
            items={recentTasks}
            rowKey="id"
            virtual={false}
            itemRender={(task) => (
              <div
                key={task.id}
                style={{
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: `1px solid ${token.colorBorderSecondary}`,
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <Space orientation="vertical" size={2} style={{ flex: 1, minWidth: 200 }}>
                  <Text
                    delete={task.completed}
                    strong
                    style={{
                      fontSize: 15,
                      color: task.completed ? token.colorTextSecondary : token.colorText,
                    }}
                  >
                    {task.title}
                  </Text>
                  {task.description && (
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      {task.description}
                    </Text>
                  )}
                  {task.dueDate && (
                    <Space size={4}>
                      <CalendarOutlined style={{ fontSize: 12, color: token.colorTextSecondary }} />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Due: {formatDate(task.dueDate)}
                      </Text>
                    </Space>
                  )}
                </Space>

                <Tag
                  color={task.completed ? "success" : "processing"}
                  style={{ borderRadius: 12, padding: "2px 10px", margin: 0 }}
                >
                  {task.completed ? "Completed" : "Pending"}
                </Tag>
              </div>
            )}
          />
        )}
      </Card>
    </Space>
  );
}

export default Home;
