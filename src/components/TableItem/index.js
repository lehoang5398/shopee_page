/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import moment from 'moment';
import React, { forwardRef, useEffect } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { array } from 'yup';
import { APP_API_IMAGE } from '../../configs';
import Pagination from '../Pagination';

function TableItem(
  {
    listProduct,
    onChangeCurrentPage,
    onChangeListSearch,
    pageCount,
    currentPage,
    onSetLimitProducts,
    onChangeShowQuantityInMonth,
    onChangeSortProductName,
    onChangeSortProductOfPrice,
    onChangeSortProductOfDiscount,
  },
  ref
) {
  function handleSortName() {
    onChangeSortProductName();
  }

  function handleSortPrice() {
    onChangeSortProductOfPrice();
  }

  function handleSortDisCount() {
    onChangeSortProductOfDiscount();
  }

  function showPrice(value) {
    const number = value.price.toString();
    return number
      .slice(0, 7)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      .concat(value.currency);
  }

  function showRevenue(value) {
    const number = value.price.toString().slice(0, 7);
    const priceRevenue = Number(number);
    return (priceRevenue * value.sold)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      .concat(value.currency);
  }

  function showInMonth(value) {
    if (value) {
      const currentMonth = moment().format('MM/YYYY');

      if (
        value?.shopid === value?.ratings?.shopid &&
        value?.itemid &&
        value?.ratings?.itemid
      ) {
        const arrList =
          Array.isArray(value.ratings && value.ratings.ratings) &&
          value.ratings.ratings.length > 0 &&
          value.ratings.ratings.filter(
            (item) =>
              moment(+item.ctime.toString().concat('000')).format('MM/YYYY') ===
              currentMonth
          );
        console.log(
          (value.item_basic.sold / value.item_basic.cmt_count) * arrList.length
        );
        return (
          <p>
            {arrList
              ? Math.ceil(
                  (value.item_basic.sold / value.item_basic.cmt_count) *
                    arrList.length
                )
              : 0}
          </p>
        );
      }
    }
  }

  function showFirstPost(value) {
    // Past
    const number = value.ctime.toString();
    const date = number.concat('000');
    const pastDay = moment(+date).format('DD');
    const pastMonth = moment(+date).format('MM');
    const pastYear = moment(+date).format('YYYY');
    // Present
    const presentDay = moment(new Date()).format('DD');
    const presentMonth = moment(new Date()).format('MM');
    const presentYear = moment(new Date()).format('YYYY');
    const a = moment([presentYear, presentMonth - 1, presentDay]);
    const b = moment([pastYear, pastMonth - 1, pastDay]);
    return a.diff(b, 'days');
  }

  function handleChangeLimit(e) {
    const number = Number(e.target.value);
    onSetLimitProducts(number);
  }

  function handleChangeList(e) {
    onChangeListSearch(e.target.value);
  }

  useEffect(() => {
    for (let i = 0; i < listProduct.length; i += 1) {
      if (typeof listProduct[i].ratings === 'undefined')
        onChangeShowQuantityInMonth(listProduct[i]);
    }
  }, [listProduct]);
  return (
    <>
      <div className="title-page">Shopee Tracking</div>
      <div className="entries-search">
        <div className="entries">
          <div className="mr-2 mt-2">Show</div>
          <select
            name="example_length"
            aria-controls="example"
            class="form-control input-sm"
            onChange={handleChangeLimit}
            defaultValue="10"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <div className="ml-2 mt-2">entries</div>
        </div>
        <div className="search-item-show">
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="form-control"
            onChange={handleChangeList}
            ref={ref}
          />
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '1%' }} />
        <div style={{ width: '98%' }}>
          <table
            id="example"
            className="table table-striped table-bordered odd"
            style={{ width: '100%', marginTop: '30px' }}
            role="row"
          >
            <thead>
              <tr>
                <th>#</th>
                <th className="cursor" onClick={handleSortName}>
                  Tên sản phẩm <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor" onClick={handleSortPrice}>
                  Giá <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor" onClick={handleSortDisCount}>
                  Giảm <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor">
                  Đã bán <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor">
                  Trong tháng <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor">
                  Tồn <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor">
                  Số ngày đăng <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor">
                  Doanh thu <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor">
                  Comment <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor">
                  Liked <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor">
                  Rating <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor">
                  Hình ảnh <BiSortAlt2 className="icon-default" />
                </th>
                <th className="cursor">
                  Link Shopee <BiSortAlt2 className="icon-default" />
                </th>
              </tr>
            </thead>
            <tbody>
              {listProduct.map((itemProduct, indexProduct) => {
                return (
                  <tr key={indexProduct}>
                    <td>{indexProduct + 1}</td>
                    <td>{itemProduct.item_basic.name}</td>
                    <td>{showPrice(itemProduct.item_basic)}</td>
                    <td>{itemProduct.item_basic.discount}</td>
                    <td>{itemProduct.item_basic.sold}</td>
                    <td>{showInMonth(itemProduct)}</td>
                    <td>{itemProduct.item_basic.stock}</td>
                    <td>{showFirstPost(itemProduct.item_basic)}</td>
                    <td>{showRevenue(itemProduct.item_basic)}</td>
                    <td>{itemProduct.item_basic.cmt_count}</td>
                    <td>{itemProduct.item_basic.liked_count}</td>
                    <td>
                      {Math.ceil(
                        itemProduct.item_basic.item_rating.rating_star
                      )}
                    </td>
                    <td>
                      <img
                        src={`${APP_API_IMAGE}/${itemProduct.item_basic.image}`}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td>
                      <a
                        href={`https://shopee.vn/item-i.${itemProduct.shopid}.${itemProduct.itemid}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Xem
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            pageCount={pageCount}
            onChangeCurrentPage={onChangeCurrentPage}
            currentPage={currentPage}
          />
        </div>
        <div style={{ width: '1%' }} />
      </div>
    </>
  );
}

export default forwardRef(TableItem);
