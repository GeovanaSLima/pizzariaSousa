"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteItemController = void 0;
const DeleteItemService_1 = require("../../services/order/DeleteItemService");
class DeleteItemController {
    async handle(req, res) {
        const item_id = req.query.item_id;
        const deleteItemService = new DeleteItemService_1.DeleteItemService();
        const item = await deleteItemService.execute({ item_id });
        res.json(item);
        return;
    }
}
exports.DeleteItemController = DeleteItemController;
