export function formatDateToReadable(datetime: string): string {
  const date = new Date(datetime);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila", // adjust to your local timezone
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  return `${formattedDate} ${formattedTime}`;
}
