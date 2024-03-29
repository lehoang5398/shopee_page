import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({ pageCount, onChangeCurrentPage, currentPage }) {
  return (
    <div>
      <ReactPaginate
        previousLabel={'< Previous'}
        nextLabel={'Next >'}
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={5}
        containerClassName={'pagination justify-content-end mt-5'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
        onPageChange={onChangeCurrentPage}
        forcePage={currentPage - 1}
        // renderOnZeroPageCount
      />
    </div>
  );
}

export default Pagination;
