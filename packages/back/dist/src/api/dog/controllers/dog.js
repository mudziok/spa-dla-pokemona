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
            fields: ['name', 'problem'],
            filters: { owner: { id: userId } },
            populate: ['photo'],
        });
        const dogs = data.map((dog) => {
            var _a, _b, _c;
            return ({
                ...dog,
                photo: (_c = (_b = (_a = dog === null || dog === void 0 ? void 0 : dog.photo) === null || _a === void 0 ? void 0 : _a.formats) === null || _b === void 0 ? void 0 : _b.thumbnail) === null || _c === void 0 ? void 0 : _c.url,
            });
        });
        return { dogs };
    },
}));
