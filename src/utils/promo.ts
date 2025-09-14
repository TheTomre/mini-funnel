const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sept",
  "oct",
  "nov",
  "dec",
] as const;

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
}

export function promoCode(name: string, date: Date = new Date()): string {
  const normalizedName = normalizeName(name);
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${normalizedName}_${month}${year}`;
}
