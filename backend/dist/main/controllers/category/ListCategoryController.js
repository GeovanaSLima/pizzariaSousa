"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoryController = void 0;
const ListCategoryService_1 = require("../../services/category/ListCategoryService");
class ListCategoryController {
    async handle(req, res) {
        const listCategoryService = new ListCategoryService_1.ListCategoryService();
        const categories = await listCategoryService.execute();
        res.json(categories);
        return;
    }
}
exports.ListCategoryController = ListCategoryController;
