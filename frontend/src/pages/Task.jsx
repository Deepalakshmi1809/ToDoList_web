
import { useState } from "react";
import {
  Card,
  Typography,
  Input,
  Button,
  Checkbox,
  Space,
  DatePicker,
  Select,
  Empty,
  Tag,
  Listy,
  message,
  theme,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import useTasks from "../hooks/useTasks";
import { formatDate } from "../utils/dateUtils";

const { Title, Text } = Typography;
const { TextArea } = Input;

function Task() {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks();
  const { token } = theme.useToken();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [filter, setFilter] = useState("All");

  function handleAddTask() {
    if (!title.trim()) {
      message.warning("Please enter a task title");
      return;
    }

    addTask(
      title.trim(),
      description.trim(),
      dueDate ? dueDate.format("YYYY-MM-DD") : ""
    );

    setTitle("");
    setDescription("");
    setDueDate(null);

    message.success("Task added successfully");
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;

    return true;
  });

  return (
    <Space
      orientation="vertical"
      size="large"
      style={{ width: "100%" }}
    >
      {/* Page Heading */}
      <div>
        <Title level={2} style={{ marginBottom: 4 }}>
          My Tasks
        </Title>

        <Text type="secondary">
          Create, track, and organize your tasks.
        </Text>
      </div>

      {/* Create Task Card */}
      <Card
        title="Create a Task"
        bordered={false}
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
          background: token.colorBgContainer,
        }}
      >
        <Space
          orientation="vertical"
          size="middle"
          style={{ width: "100%" }}
        >
          <div>
            <Text strong style={{ display: "block", marginBottom: 6 }}>
              Task Title <span style={{ color: token.colorError }}>*</span>
            </Text>

            <Input
              placeholder="What needs to be done?"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onPressEnter={handleAddTask}
              size="large"
            />
          </div>

          <div>
            <Text strong style={{ display: "block", marginBottom: 6 }}>
              Description (optional)
            </Text>

            <TextArea
              placeholder="Add details or notes about this task..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Text strong style={{ display: "block", marginBottom: 6 }}>
              Due Date
            </Text>

            <DatePicker
              style={{ width: "100%" }}
              placeholder="Select due date"
              value={dueDate}
              onChange={setDueDate}
              size="middle"
            />
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddTask}
            size="large"
            block
            style={{ marginTop: 8 }}
          >
            Add Task
          </Button>
        </Space>
      </Card>

      {/* Task Management Card */}
      <Card
        title="Task Management"
        bordered={false}
        style={{
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary,
          background: token.colorBgContainer,
        }}
        extra={
          <Space align="center">
            <Text type="secondary" style={{ fontSize: 13 }}>
              Filter:
            </Text>

            <Select
              style={{ width: 160 }}
              value={filter}
              onChange={setFilter}
              options={[
                { value: "All", label: "All Tasks" },
                { value: "Active", label: "Active Tasks" },
                { value: "Completed", label: "Completed Tasks" },
              ]}
            />
          </Space>
        }
      >
        {filteredTasks.length === 0 ? (
          <Empty
            description={
              filter === "All"
                ? "No tasks yet. Create your first task above!"
                : `No ${filter.toLowerCase()} tasks found.`
            }
          />
        ) : (
          <Listy
            items={filteredTasks}
            rowKey="id"
            virtual={false}
            itemRender={(task) => (
              <div
                key={task.id}
                style={{
                  padding: 16,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  borderBottom: `1px solid ${token.colorBorderSecondary}`,
                  gap: 16,
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    style={{ marginTop: 2 }}
                    aria-label={`Mark task ${task.title} as ${
                      task.completed ? "pending" : "completed"
                    }`}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        delete={task.completed}
                        strong
                        style={{
                          fontSize: 16,
                          color: task.completed
                            ? token.colorTextSecondary
                            : token.colorText,
                          wordBreak: "break-word",
                        }}
                      >
                        {task.title}
                      </Text>

                      <Tag
                        color={task.completed ? "success" : "processing"}
                        style={{ borderRadius: 10, margin: 0 }}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </Tag>
                    </div>

                    {task.description && (
                      <Text
                        type="secondary"
                        style={{
                          display: "block",
                          marginBottom: 6,
                          fontSize: 14,
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {task.description}
                      </Text>
                    )}

                    {task.dueDate && (
                      <Space size={4}>
                        <CalendarOutlined
                          style={{
                            fontSize: 13,
                            color: token.colorTextSecondary,
                          }}
                        />

                        <Text type="secondary" style={{ fontSize: 13 }}>
                          Due Date: {formatDate(task.dueDate)}
                        </Text>
                      </Space>
                    )}
                  </div>
                </div>

                <Button
                  danger
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => deleteTask(task.id)}
                  title="Delete task"
                  aria-label="Delete task"
                />
              </div>
            )}
          />
        )}
      </Card>
    </Space>
  );
}

export default Task;
