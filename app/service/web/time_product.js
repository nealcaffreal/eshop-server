'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { getFirstNum } = require('../../libs/utils');

class TimeProductService extends Service {
  async getList(where, { limit, offset }) {
    const { ctx } = this;

    let timeProducts = await ctx.model.Product.findAll({
      raw: true,
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });

    if (_.isEmpty(timeProducts)) {
      return [];
    }

    timeProducts = await Promise.all(
      timeProducts.map(async p => {
        let info = await ctx.model.ProductInfo.findOne({
          raw: true,
          where: {
            productId: p.id,
          },
        });
        let price = getFirstNum(JSON.parse(info.prices));
        let oldPrice = getFirstNum(JSON.parse(info.oldPrices));

        return {
          ...p,
          price,
          oldPrice,
          quantity: 240,
          remain: Math.floor(Math.random() * 240),
          images: JSON.parse(p.images),
        };
      })
    );

    return timeProducts;
  }
}

module.exports = TimeProductService;
