export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("de-DE", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}