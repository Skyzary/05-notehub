export type tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'
export interface Note {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tag: tag
}
