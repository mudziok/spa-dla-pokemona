/**
 *  dog controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::dog.dog', ({ strapi }) => ({
  async find(ctx) {
    const userId = ctx.state.user.id;
    const data = await strapi.entityService.findMany('api::dog.dog', {
      fields: ['name', 'problem', 'registration'],
      filters: { owner: { id: userId } },
      populate: ['photo'],
    });

    const dogs = data.map((dog) => ({
      ...dog,
      photo: dog?.photo?.formats?.thumbnail?.url,
    }));

    return { dogs };
  },

  async create(ctx) {
    const userId = ctx.state.user.id;

    const data = await strapi.entityService.create('api::dog.dog', {
      data: {
        ...ctx.request.body.data,
        owner: userId,
      },
    });

    return { data };
  },
}));
