export const useConvertTable = (text: string, indent: number = 0): string[] => {
  const rows = text.split("\n")
  const converted = rows
    .filter(row => row !== "")
    .map(row => {
      const tds = row.split("\t")
      return tds
        .map(td => `${idt(2 + indent)}<td>${td}</td>`)
        .join("\n")
    })
    .map(row => `${idt(indent)}<tr>\n${row}\n${idt(indent)}</tr>`)

  return converted
}

const idt = (n: number): string => " ".repeat(n)
