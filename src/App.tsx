import { useTextInput } from "./hooks/useTextInput";

const App = () => {
  const [shopText, changeShopText] = useTextInput();
  const [officeText, changeOfficeText] = useTextInput();
  const [entireText, changeEntireText] = useTextInput();

  const shopConverted = convertRows(shopText.split("\n"), 4);
  const officeConverted = convertRows(officeText.split("\n"), 4);
  const entireConverted = convertRows(entireText.split("\n"), 4);

  const shopHeader = convertHeaderRows(["順位", "事業所", "部門", "前年対比"], 4)
  const officeHeader = convertHeaderRows(["事業所", "前年対比"], 4)
  const entireHeader = convertHeaderRows(["会社", "前年対比"], 4)

  const styles = `<style type="text/css">@media screen and (max-width: 768px) {
    .bge-contents table.small-table {
      display: table;
      width: 100%;
    }
    .small-table > thead.head {
      display: table-header-group;
    }
    .small-table > tbody.body {
      display: table-row-group;
    }
    .small-table > thead > tr > th,
    .small-table > tbody > tr > td {
      padding: 4px;
      display: table-cell;
    }
    .small-table > thead > tr,
    .small-table > tbody > tr {
      display: table-row;
    }
  }
</style>
`;

  const result =
    genTable(shopConverted, shopHeader, "店舗別ランキング") +
    genTable(officeConverted, officeHeader, "事業所別ランキング") +
    genTable(entireConverted, entireHeader, "全体") +
    styles

  return (
    <div>
      <main className={"container"}>
        <h1>GENTABLE</h1>
        <p>店舗別</p>
        <textarea value={shopText} onChange={changeShopText} />
        <p>事業所別</p>
        <textarea value={officeText} onChange={changeOfficeText} />
        <p>全体</p>
        <textarea value={entireText} onChange={changeEntireText} />
        <hr />
        <p>結果</p>
        <textarea value={result} readOnly />
      </main>
    </div>
  );
};

const convertRows = (rows: string[], indent: number=0): string[] => {
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

const convertHeaderRows = (cols: string[], indent: number = 0): string => {
  const inner = cols
    .map(col => `${idt(indent + 2)}<th>${col}</th>`)
    .join("\n")

  return `${idt(indent)}<tr>\n${inner}
${idt(indent)}</tr>`
}

const idt = (n: number): string => " ".repeat(n)

const genTable = (body: string[], header: string, title: string): string => {
  const text = `<h3>${title}</h3>
<table class="small-table">
  <thead class="head">\n${header}
  </thead>
  <tbody class="body">\n${body.join("\n")}
  </tbody>
</table>

`;

  return text;
};

export default App;
