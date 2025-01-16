"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishOrderController = void 0;
const FinishOrderService_1 = require("../../services/order/FinishOrderService");
class FinishOrderController {
    async handle(req, res) {
        const { order_id } = req.body;
        const finishOrder = new FinishOrderService_1.FinishOrderService();
        const order = await finishOrder.execute({ order_id });
        res.json(order);
        return;
    }
}
exports.FinishOrderController = FinishOrderController;
