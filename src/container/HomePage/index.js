/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import productsApi from '../../api/ApiProductClient';
import SearchBox from '../../components/SearchBox';
import TableItem from '../../components/TableItem';
import useLoading from '../../hooks/userLoading';

function HomePage() {
  const isFirst = useRef(true);
  const [showLoading, hideLoading] = useLoading();
  const [listSearchItem, setListSearchItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitProducts, setLimitProducts] = useState(10);
  const [pageCount, setPageCount] = useState(1); // tổng số trang
  const [listProduct, setLisProduct] = useState([]);
  const [filter, setFilter] = useState({
    by: 'relevancy',
    limit: 100,
    newest: 100,
    order: 'desc',
    page_type: 'search',
    scenario: 'PAGE_GLOBAL_SEARCH',
    version: 2,
    keyword: '',
  });

  //thay đổi page
  function onChangeCurrentPage(tempPage) {
    setCurrentPage(tempPage.selected + 1);
  }

  //thay đổi số lượng sản phẩm hiển thị trên 1 trang
  function onSetLimitProducts(value) {
    setLimitProducts(value);
  }

  // tìm kiếm
  function onFilter(data) {
    setFilter((prevFilter) => ({ ...prevFilter, ...data }));
  }

  //reset page về 0
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      setCurrentPage(1);
    }
  }, [limitProducts]);

  //search table
  function onChangeListSearch(value) {
    console.log(value);
  }

  useEffect(() => {
    if (filter.keyword !== '') {
      const getProductSearch = async () => {
        try {
          showLoading();
          const response = await productsApi.searchItem(filter);
          setListSearchItem(response.items);
          hideLoading();
        } catch (error) {
          showLoading();
          console.log('Failed to Fetch Product', error);
        }
      };
      getProductSearch();
    }
  }, [filter]);

  useEffect(() => {
    if (listSearchItem.length > 0) {
      const offset = (currentPage - 1) * limitProducts;
      const amountProducts = limitProducts * currentPage;
      const newArr = listSearchItem.slice(
        offset,
        amountProducts === 0 ? limitProducts : amountProducts
      );
      const page = listSearchItem.length / limitProducts;

      setPageCount(page);
      setLisProduct(newArr);
    }
  }, [currentPage, listSearchItem, limitProducts]);

  return (
    <>
      <SearchBox onFilter={onFilter} />
      <TableItem
        listProduct={listProduct}
        F={onChangeCurrentPage}
        onChangeListSearch={onChangeListSearch}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        currentPage={currentPage}
        onSetLimitProducts={onSetLimitProducts}
      />
    </>
  );
}

export default HomePage;
