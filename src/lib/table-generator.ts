export const generateTable = (rows: string[][], heads: string[], title: string): string => {
  const body = convertRows(rows, 4)
  const header = convertHeaderRows(heads, 4)

  const text = `<h3>${title}</h3>
<table class="small-table">
  <thead class="head">\n${header}
  </thead>
  <tbody class="body">\n${body.join("\n")}
  </tbody>
</table>

`

  return text
}

const convertRows = (rows: string[][], indent: number=0): string[] => {
  const converted = rows
    .map(cols => {
      return cols
        .map(td => `${idt(2 + indent)}<td>${td}</td>`)
        .join("\n")
    })
    .map(row => `${idt(indent)}<tr>\n${row}\n${idt(indent)}</tr>`)

  return converted
}

const convertHeaderRows = (cols: string[], indent: number = 0): string => {
  const inner = cols
    .map(col => `${idt(indent + 2)}<th>${col}</th>`)
    .join("\n")

  return `${idt(indent)}<tr>\n${inner}
${idt(indent)}</tr>`
}

const idt = (n: number): string => " ".repeat(n)

export const parseBodyRows = (text: string): string[][] => {
  return text.split("\n")
    .filter(row => row !== "")
    .map(row => row.split("\t"))
}
