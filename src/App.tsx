import { useCallback, useState} from "react"
import { useConvertTable } from "./hooks/useConvertTable"

const App = () => {
  const [text, setText] = useState<string>("")
  const handleChangeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }, [])

  const converted = useConvertTable(text, 4)
  const tableText = `<table class="small-table">
  <thead class="head"></thead>
  <tbody class="body">\n${converted.join("\n")}
  </tbody>
</table>`

  return (
    <div>
      <main className={"container"}>
        <h1>GENTABLE</h1>
        <textarea value={text} onChange={handleChangeText} />
        <textarea value={tableText} readOnly />
      </main>
    </div>
  )
}

export default App
