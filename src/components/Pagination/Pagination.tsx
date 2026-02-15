import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

interface PaginationProps {
  pageCount: number
  page: number
  onPageChange: (selectedItem: { selected: number }) => void
}

export default function Pagination({
  pageCount,
  onPageChange,
  page,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={onPageChange}
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
      forcePage={page}
    />
  )
}
