import React, { useState } from 'react'

//import { getCompanies } from "../../redux/actions/Companies";
const getCompanies = (page) => {}
export const Pagination = ({ pagination, getCompanies }) => {
  const [currentPage, setCurrentPage] = useState(1)

  let pagesArr = []
  if (pagination) {
    const { total, limit } = pagination
    const pages = Math.ceil(total / limit)

    for (let page = 1; page <= pages; page++) {
      pagesArr = [...pagesArr, { id: uuidv4(), page }]
    }
  }

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {pagination && pagination.prev && (
          <li className='page-item'>
            <Link
              className='page-link'
              href='#'
              onClick={() => {
                getCompanies({ page: currentPage - 1 })
                setCurrentPage(currentPage - 1)
              }}
            >
              Previous
            </Link>
          </li>
        )}

        {pagesArr.map(({ id, page }) => (
          <li key={id} className='page-item'>
            <Link
              className={`page-link ${
                page === currentPage && 'page-link-hovered'
              }`}
              href='#'
              onClick={() => {
                getCompanies({ page })
                setCurrentPage(page)
              }}
            >
              {page}
            </Link>
          </li>
        ))}

        {pagination && pagination.next && (
          <li className='page-item'>
            <Link
              className='page-link'
              href='#'
              onClick={() => {
                getCompanies({ page: currentPage + 1 })
                setCurrentPage(currentPage + 1)
              }}
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
