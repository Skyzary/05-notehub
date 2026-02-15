import css from './SearchBox.module.css'
export default function SearchBox({
  query,
  onInputChange,
}: {
  query: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={onInputChange}
        className={css.input}
      />
    </form>
  )
}
