import SearchBox from '../SearchBox/SearchBox'
import { useState } from 'react'
import css from './App.module.css'
import { useQuery } from '@tanstack/react-query'
import { getNotes } from '../../services/noteService'
import { useDebouncedCallback } from 'use-debounce'
import NoteList from '../NoteList/NoteList'
import NoteForm from '../NoteForm/NoteForm'
import Modal from '../Modal/Modal'
import Pagination from '../Pagination/Pagination'
import Error from '../Error/Error'
import { BarLoader } from 'react-spinners'

export default function App() {
  const [page, setPage] = useState(1)
  const [localQuery, setLocalQuery] = useState('')
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: query ? ['notes', query, page] : ['notes', page],
    queryFn: query
      ? () => getNotes(query, page)
      : () => getNotes(undefined, page),
    placeholderData: (prevData) => prevData,
  })

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setLocalQuery(value)
    onUpdate(value)
  }
  const onUpdate = useDebouncedCallback((value: string) => {
    setQuery(value)
    setPage(1)
  }, 500)

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          query={localQuery}
          onInputChange={onInputChange}
        />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onPageChange={(selectedItem) => setPage(selectedItem.selected + 1)}
          />
        )}

        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>
      <NoteList notes={data?.notes || []} />
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onNoteSaved={() => {
              setIsModalOpen(false)
            }}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
      {isError && <Error message={(error as Error).message} />}
      {isLoading || isFetching ? (
        <BarLoader
          color="#2341ba"
          area-label="Loading notes..."
        />
      ) : null}
      {!isLoading && data?.notes.length === 0 && <p>No notes found.</p>}
    </div>
  )
}

