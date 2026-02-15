import axios from 'axios'
import type { Note, NoteCreationPayload } from '../types/note'
interface response {
  notes: Note[]
  totalPages: number
}
const params = {
  baseURL: 'https://notehub-public.goit.study/api/',
  endpoits: {
    notes: '/notes',
  },
}
const instance = axios.create({
  baseURL: params.baseURL,
  headers: {
    Authorization: `bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
})
export async function getNotes(
  query?: string,
  page: number = 0,
): Promise<response> {
  const { data } = await instance.get<response>(params.endpoits.notes, {
    params: {
      ...(query ? { search: query } : {}),
      page: page,
    },
  })
  return data
}
export async function addNote(note: NoteCreationPayload) {
  const { data } = await instance.post<Note>(params.endpoits.notes, note)
  return data
}
export async function deleteNote(id: string) {
  const res = await instance.delete<Note>(`${params.endpoits.notes}/${id}`)
  return res.data
}


