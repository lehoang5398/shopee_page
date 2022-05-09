/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import productsApi from '../../api/ApiProductClient';
import SearchBox from '../../components/SearchBox';
import TableItem from '../../components/TableItem';
import useLoading from '../../hooks/userLoading';

function HomePage() {
  const isFirst = useRef(true);
  const inputRef = useRef(null);
  const [showLoading, hideLoading] = useLoading();
  const [listProduct, setLisProduct] = useState([]);
  const [listSearchItem, setListSearchItem] = useState([]);
  const [listSearchProduct, setListSearchProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitProducts, setLimitProducts] = useState(10);
  const [pageCount, setPageCount] = useState(1); // tổng số trang
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

  const newListProduct = [];
  const onChangeShowQuantityInMonth = async (value) => {
    try {
      showLoading();
      const response = await productsApi.cmtSearchItem(value);
      for (let i = 0; i < listProduct.length; i += 1) {
        if (
          listProduct[i].itemid === response.itemid &&
          listProduct[i].shopid === response.shopid
        ) {
          newListProduct.push({
            ...listProduct[i],
            ratings: response,
          });
        }
      }
      if (newListProduct.length === 10) {
        setLisProduct(newListProduct);
      }
      hideLoading();
    } catch (error) {
      console.log('Failed to Fetch Product', error);
    }
  };

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

  function onChangeSortProductName() {
    const newArrSort = listSearchItem.sort((a, b) =>
      a.item_basic.name.localeCompare(b.item_basic.name)
    );
    setListSearchItem([...newArrSort]);
  }

  function onChangeSortProductOfPrice() {
    const newArrSort = listSearchItem.sort((a, b) => {
      const sortA = a.item_basic.price.toString().slice(0, 7);
      const sortB = b.item_basic.price.toString().slice(0, 7);
      return Number(sortA) - Number(sortB);
    });
    setListSearchItem([...newArrSort]);
  }

  function onChangeSortProductOfDiscount() {
    const newArrSort = listSearchItem.sort(
      (a, b) => a.item_basic.raw_discount - b.item_basic.raw_discount
    );
    setListSearchItem([...newArrSort]);
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
        onChangeShowQuantityInMonth={onChangeShowQuantityInMonth}
        onChangeSortProductName={onChangeSortProductName}
        onChangeSortProductOfPrice={onChangeSortProductOfPrice}
        onChangeSortProductOfDiscount={onChangeSortProductOfDiscount}
      />
    </>
  );
}

export default HomePage;
