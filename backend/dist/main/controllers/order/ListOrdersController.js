"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrdersController = void 0;
const ListOrdersService_1 = require("../../services/order/ListOrdersService");
class ListOrdersController {
    async handle(req, res) {
        const listOrdersService = new ListOrdersService_1.ListOrdersService();
        const orders = await listOrdersService.execute();
        res.json(orders);
        return;
    }
}
exports.ListOrdersController = ListOrdersController;
