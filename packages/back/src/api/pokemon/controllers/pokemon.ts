/**
 *  pokemon controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::pokemon.pokemon',
  ({ strapi }) => ({
    async find(ctx) {
      const userId = ctx.state.user.id;
      const usersPokemon = await strapi.entityService.findMany(
        'api::pokemon.pokemon',
        {
          fields: ['nickname', 'pokedexNumber, coughtAt'],
          filters: { trainer: { id: userId } },
        }
      );

      const data = usersPokemon.map((dog) => ({
        ...dog,
        photo: dog?.photo?.formats?.thumbnail?.url,
      }));

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
  })
);
