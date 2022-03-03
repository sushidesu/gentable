import { useState, useCallback } from "react"

export const useTextInput = () => {
  const [text, setText] = useState<string>("")
  const handleChangeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }, [])

  return [text, handleChangeText] as const
}
