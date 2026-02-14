import css from './NoteForm.module.css'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import type { Note } from '../../types/note'
import * as Yup from 'yup'
const noteSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters'),
  content: Yup.string().max(500, 'Content must be at most 500 characters'),
  tag: Yup.string()
    .required('Tag is required')
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag'),
})

export default function NoteForm({
  onNoteSaved,
  onCancel,
}: {
  onNoteSaved?: (values: Note) => void
  onCancel?: () => void
}) {
  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      onSubmit={(values) => {
        onNoteSaved?.(values as Note)
      }}
      validationSchema={noteSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field
            id="title"
            name="title"
            className={css.input}
          />
          <ErrorMessage
            name="title"
            component="span"
            className={css.error}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={4}
            className={css.input}
          />
          <ErrorMessage
            name="content"
            component="span"
            className={css.error}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field
            as="select"
            id="tag"
            name="tag"
            className={css.input}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage
            name="tag"
            component="span"
            className={css.error}
          />
        </div>
        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
          >
            Save
          </button>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  )
}
