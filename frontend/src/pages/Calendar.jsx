
import { useState } from "react";
import {
  Calendar as AntCalendar,
  Card,
  Typography,
  Badge,
  Space,
  Tag,
  Listy,
  Empty,
  Grid,
  theme,
} from "antd";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import useTasks from "../hooks/useTasks";
import { formatDate } from "../utils/dateUtils";

const { Title, Text } = Typography;

function Calendar() {
  const { tasks } = useTasks();
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();

  const [selectedDate, setSelectedDate] = useState(() => dayjs());

  const selectedDateStr = selectedDate.format("YYYY-MM-DD");

  const selectedDateTasks = tasks.filter(
    (task) => task.dueDate === selectedDateStr
  );

  function cellRender(current, info) {
    if (info.type === "date") {
      const dateStr = current.format("YYYY-MM-DD");

      const dayTasks = tasks.filter(
        (task) => task.dueDate === dateStr
      );

      if (dayTasks.length === 0) return null;

      const maxBadges = screens.md ? 3 : 1;

      return (
        <div style={{ marginTop: 4 }}>
          {dayTasks.slice(0, maxBadges).map((task) => (
            <div
              key={task.id}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: screens.md ? 12 : 11,
                lineHeight: "18px",
              }}
            >
              <Badge
                status={task.completed ? "success" : "processing"}
                text={
                  <span
                    style={{
                      fontSize: screens.md ? 12 : 11,
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                      color: task.completed
                        ? token.colorTextSecondary
                        : token.colorText,
                    }}
                  >
                    {task.title}
                  </span>
                }
              />
            </div>
          ))}

          {dayTasks.length > maxBadges && (
            <div
              style={{
                fontSize: 11,
                color: token.colorPrimary,
                marginTop: 2,
              }}
            >
              +{dayTasks.length - maxBadges} more
            </div>
          )}
        </div>
      );
    }

    return info.originNode;
  }

  return (
    <Space
      orientation="vertical"
      size="large"
      style={{ width: "100%" }}
    >
      {/* Page Heading */}
      <div>
        <Title level={2} style={{ marginBottom: 4 }}>
          Calendar
        </Title>

        <Text type="secondary">
          View and schedule your daily tasks across the month.
        </Text>
      </div>

      {/* Calendar */}
      <Card
        bordered={false}
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
          background: token.colorBgContainer,
          overflow: "hidden",
        }}
        styles={{
          body: {
            padding: screens.md ? 24 : 12,
            overflowX: "auto",
          },
        }}
      >
        <AntCalendar
          value={selectedDate}
          onSelect={(date) => setSelectedDate(date)}
          cellRender={cellRender}
          fullscreen={screens.md}
        />
      </Card>

      {/* Selected Date Tasks */}
      <Card
        title={
          <Space>
            <CalendarOutlined
              style={{ color: token.colorPrimary }}
            />

            <span>
              Tasks for {selectedDate.format("MMMM D, YYYY")}
            </span>

            <Tag color="blue">
              {selectedDateTasks.length} tasks
            </Tag>
          </Space>
        }
        bordered={false}
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
          background: token.colorBgContainer,
        }}
      >
        {selectedDateTasks.length === 0 ? (
          <Empty
            description={`No tasks due on ${selectedDate.format(
              "MMM D, YYYY"
            )}`}
          />
        ) : (
          <Listy
            items={selectedDateTasks}
            rowKey="id"
            virtual={false}
            itemRender={(task) => (
              <div
                key={task.id}
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: `1px solid ${token.colorBorderSecondary}`,
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <Space
                  orientation="vertical"
                  size={2}
                  style={{
                    flex: 1,
                    minWidth: 200,
                  }}
                >
                  <Text
                    delete={task.completed}
                    strong
                    style={{
                      fontSize: 15,
                      color: task.completed
                        ? token.colorTextSecondary
                        : token.colorText,
                    }}
                  >
                    {task.title}
                  </Text>

                  {task.description && (
                    <Text
                      type="secondary"
                      style={{ fontSize: 13 }}
                    >
                      {task.description}
                    </Text>
                  )}

                  {task.dueDate && (
                    <Text
                      type="secondary"
                      style={{ fontSize: 12 }}
                    >
                      Due: {formatDate(task.dueDate)}
                    </Text>
                  )}
                </Space>

                <Tag
                  icon={
                    task.completed
                      ? <CheckCircleOutlined />
                      : <ClockCircleOutlined />
                  }
                  color={task.completed ? "success" : "processing"}
                  style={{
                    borderRadius: 12,
                    padding: "2px 10px",
                    margin: 0,
                  }}
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

export default Calendar;
