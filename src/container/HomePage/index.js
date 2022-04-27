/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import productsApi from '../../api/ApiProductClient';
import SearchBox from '../../components/SearchBox';
import TableItem from '../../components/TableItem';
import useLoading from '../../hooks/userLoading';

function HomePage() {
  const [showLoading, hideLoading] = useLoading();
  const [listSearchItem, setListSearchItem] = useState([]);
  const [paginate, setPaginate] = useState();
  const [filter, setFilter] = useState({
    by: 'relevancy',
    limit: 10,
    newest: 0,
    order: 'desc',
    page_type: 'search',
    scenario: 'PAGE_GLOBAL_SEARCH',
    version: 2,
    keyword: '',
  });

  const onChangeCurrentPage = (page) => {
    console.log(page)
  }

  const onFilter = (data) => {
    console.log(data)
    setFilter(data)
  }

  useEffect(() => {
    if (filter.keyword !== '') {
      const getProductSearch = async () => {
        try {
          showLoading();
          const response = await productsApi.searchItem(filter);
          setListSearchItem(response.items);
          setPaginate(response.total_count);
          hideLoading();
        } catch (error) {
          showLoading();
          console.log('Failed to Fetch Product', error);
        }
      };
      getProductSearch();
    }
  }, [filter]);
  return (
    <>
      <SearchBox setFilter={setFilter} />
      <TableItem
        listSearchItem={listSearchItem}
        setFilter={onFilter}
        paginate={paginate}
      />
    </>
  );
}

export default HomePage;
