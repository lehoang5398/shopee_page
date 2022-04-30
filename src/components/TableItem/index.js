/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import moment from 'moment';
import React, { forwardRef } from 'react';
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
  },
  ref
) {
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
            className="table table-striped table-bordered"
            style={{ width: '100%', marginTop: '30px' }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Giảm</th>
                <th>Đã bán</th>
                <th>Trong tháng</th>
                <th>Tồn</th>
                <th>Số ngày đăng</th>
                <th>Doanh thu</th>
                <th>Comment</th>
                <th>Liked</th>
                <th>Rating</th>
                <th>Hình ảnh</th>
                <th>Link Shopee</th>
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
                    <td>1</td>
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
