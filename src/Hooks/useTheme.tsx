import { useContext } from 'react'
import { ThemeContext } from '../main'

export default function useTheme() {
  return useContext(ThemeContext)
}
