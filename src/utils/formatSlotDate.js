export function formatSlotDate (slotDate) {
    const date = new Date(slotDate);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
}