export const dateFormat = (dateString: string, type?: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  switch (type) {
    case "short":
      return date.toLocaleString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    default:
      return date.toLocaleString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
  }
};
