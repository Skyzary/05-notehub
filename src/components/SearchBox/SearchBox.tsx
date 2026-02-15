import css from './SearchBox.module.css'

interface SearchBoxProps {
  query: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchBox({ query, onInputChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      placeholder="Search"
      value={query}
      onChange={onInputChange}
      className={css.input}
    />
  )
}

