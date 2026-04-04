export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

export function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}