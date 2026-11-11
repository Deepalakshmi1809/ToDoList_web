export function createReminder(task) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Reminder created for ${task.title}`,
      });
    }, 500);
  });
}

export function deleteReminder(taskId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        taskId,
        message: 'Reminder deleted successfully',
      });
    }, 500);
  });
}