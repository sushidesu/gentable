import { useCallback, useState} from "react"

const App = () => {
  const [text, setText] = useState<string>("")
  const handleChangeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }, [])

  return (
    <div>
      <h1>GENTABLE</h1>
      <textarea value={text} onChange={handleChangeText} />
      <textarea value={text} readOnly />
    </div>
  )
}

export default App
