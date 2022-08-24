"use strict";
/**
 *  dog controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::dog.dog', ({ strapi }) => ({
    async find(ctx) {
        const userId = ctx.state.user.id;
        const data = await strapi.entityService.findMany('api::dog.dog', {
            fields: ['name'],
            filters: { owner: { id: userId } },
        });
        return { data };
    },
}));
