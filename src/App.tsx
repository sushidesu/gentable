import useClipboard from "react-use-clipboard"
import { useTextInput } from "./hooks/useTextInput";
import { generateTable, parseBodyRows } from "./lib/table-generator"

const App = () => {
  const [shopText, changeShopText] = useTextInput();
  const [officeText, changeOfficeText] = useTextInput();
  const [entireText, changeEntireText] = useTextInput();

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
    generateTable(parseBodyRows(shopText), ["順位", "事業所", "部門", "前年対比"], "店舗別ランキング") +
    generateTable(parseBodyRows(shopText), ["事業所", "前年対比"], "事業所別ランキング") +
    generateTable(parseBodyRows(shopText), ["会社", "前年対比"], "全体") +
    styles

  const [isCopied, setCopied] = useClipboard(result, {
    successDuration: 1200
  })

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
        <button role={"button"} onClick={setCopied}>{
          isCopied ? "コピーしました！" : "結果をコピー"
        }</button>
      </main>
    </div>
  );
};

export default App;
