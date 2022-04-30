/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import productsApi from '../../api/ApiProductClient';
import SearchBox from '../../components/SearchBox';
import TableItem from '../../components/TableItem';
import useLoading from '../../hooks/userLoading';

function HomePage() {
  const isFirst = useRef(true);
  const inputRef = useRef(null);
  const [showLoading, hideLoading] = useLoading();
  const [listSearchItem, setListSearchItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitProducts, setLimitProducts] = useState(10);
  const [pageCount, setPageCount] = useState(1); // tổng số trang
  const [listProduct, setLisProduct] = useState([]);
  const [listSearchProduct, setListSearchProduct] = useState([]);
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
    inputRef.current.value = '';
    setListSearchProduct([]);
  }

  //search table
  function onChangeListSearch(value) {
    if (value !== '') {
      const searchProduct = listProduct.filter(
        (item) =>
          item.item_basic.name
            .trim()
            .toLowerCase()
            .indexOf(value.trim().toLowerCase()) !== -1
      );
      setListSearchProduct([...searchProduct]);
    } else {
      setListSearchProduct([]);
    }
  }

  //reset page về 0
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      setCurrentPage(1);
    }
  }, [limitProducts]);

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
      const tempArr =
        listSearchProduct.length > 0 ? listSearchProduct : listSearchItem;
      const offset = (currentPage - 1) * limitProducts;
      const amountProducts = limitProducts * currentPage;
      const newArr = tempArr.slice(
        offset,
        amountProducts === 0 ? limitProducts : amountProducts
      );
      const page = tempArr.length / limitProducts;

      setPageCount(page);
      setLisProduct(newArr);
    }
  }, [currentPage, listSearchItem, limitProducts, listSearchProduct]);

  return (
    <>
      <SearchBox onFilter={onFilter} />
      <TableItem
        listProduct={listProduct}
        onChangeCurrentPage={onChangeCurrentPage}
        onChangeListSearch={onChangeListSearch}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        currentPage={currentPage}
        onSetLimitProducts={onSetLimitProducts}
        ref={inputRef}
      />
    </>
  );
}

export default HomePage;
