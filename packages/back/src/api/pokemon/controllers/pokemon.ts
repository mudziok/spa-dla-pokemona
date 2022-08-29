/**
 *  pokemon controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::pokemon.pokemon',
  ({ strapi }) => ({
    async find(ctx) {
      const userId = ctx.state.user.id;
      const data = await strapi.entityService.findMany('api::pokemon.pokemon', {
        fields: ['name', 'pokedexNumber, coughtAt'],
        filters: { trainer: { id: userId } },
      });

      return { data };
    },

    async create(ctx) {
      const userId = ctx.state.user.id;

      const data = await strapi.entityService.create('api::pokemon.pokemon', {
        data: {
          ...ctx.request.body.data,
          trainer: userId,
        },
      });

      return { data };
    },

    async delete(ctx) {
      const userId = ctx.state.user.id;

      const { trainer } = await strapi.entityService.findOne(
        'api::pokemon.pokemon',
        ctx.params.id,
        {
          populate: ['trainer'],
        }
      );

      if (trainer.id !== userId) {
        ctx.unauthorized('Cannot delete another trainers Pokemon');
      }

      const { data, error } = super.delete(ctx);
      return { data, error };
    },
  })
);
