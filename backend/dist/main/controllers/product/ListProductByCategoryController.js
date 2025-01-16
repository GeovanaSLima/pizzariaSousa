"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProductByCategoryController = void 0;
const ListProductByCategoryService_1 = require("@/services/product/ListProductByCategoryService");
class ListProductByCategoryController {
    async handle(req, res) {
        const category_id = req.query.category_id;
        const listProductByCategoryService = new ListProductByCategoryService_1.ListProductByCategoryService();
        const productsByCategory = await listProductByCategoryService.execute({
            category_id,
        });
        res.json(productsByCategory);
        return;
    }
}
exports.ListProductByCategoryController = ListProductByCategoryController;
