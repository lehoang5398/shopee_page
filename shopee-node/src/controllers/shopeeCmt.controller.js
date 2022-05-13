const catchAsync = require('../utils/catchAsync');
const { request } = require('../utils/request');

const getCmtShopee = catchAsync(async (req, res) => {
  const { query } = req.body;
  const response = await request({
    url: `https://shopee.vn/api/v2/item/get_ratings?${query}`,
  });
  res.json(response);
});

module.exports = {
  getCmtShopee,
};
