const catchAsync = require('../utils/catchAsync');
const { request } = require('../utils/request');

const getItemShopee = catchAsync(async (req, res) => {
  const { query } = req.body;
  const response = await request({
    url: `https://shopee.vn/api/v4/search/search_items?${query}`,
  });
  res.json(response);
});

module.exports = {
  getItemShopee,
};
