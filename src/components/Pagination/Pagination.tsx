import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'
export default function Pagination({
  pageCount,
  onPageChange,
}: {
  pageCount: number
  onPageChange: (selectedItem: { selected: number }) => void
}) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={onPageChange} // Используем переданный onPageChange
      containerClassName={css.pagination}
      activeClassName={css.activePage}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.previous}
      previousLinkClassName={css.previousLink}
      nextClassName={css.next}
      nextLinkClassName={css.nextLink}
      breakClassName={css.break}
      breakLinkClassName={css.breakLink}
      disabledClassName={css.disabled}
    />
  )
}
