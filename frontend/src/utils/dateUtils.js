
export function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function isToday(date) {
  return date === getTodayDate();
}
