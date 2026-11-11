export function createTask(title, description = "", dueDate = "") {
  return {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: title.trim(),
    description: description.trim(),
    dueDate: dueDate || "",
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

export function getInitialTasks() {
  const today = new Date();
  const format = (date) => date.toISOString().split("T")[0];

  const todayStr = format(today);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = format(tomorrow);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 3);
  const nextWeekStr = format(nextWeek);

  return [
    {
      id: "task-init-1",
      title: "Review quarterly project roadmap",
      description: "Analyze deliverables, milestones, and team priorities for Q4.",
      dueDate: todayStr,
      completed: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "task-init-2",
      title: "Design responsive dashboard UI",
      description: "Build clean layouts for mobile, tablet, and desktop screens.",
      dueDate: todayStr,
      completed: false,
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: "task-init-3",
      title: "Integrate Dark & Light theme tokens",
      description: "Verify Ant Design ConfigProvider algorithms across all pages.",
      dueDate: tomorrowStr,
      completed: false,
      createdAt: new Date(Date.now() - 21600000).toISOString(),
    },
    {
      id: "task-init-4",
      title: "Verify Calendar task indicators",
      description: "Ensure pending and completed tasks render with appropriate badges.",
      dueDate: nextWeekStr,
      completed: false,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ];
}
