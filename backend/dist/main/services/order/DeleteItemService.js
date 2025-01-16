"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteItemService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteItemService {
    async execute({ item_id }) {
        const itemExists = await prisma_1.default.item.findUnique({
            where: { id: item_id },
        });
        if (!itemExists) {
            throw new Error('Item not found');
        }
        const item = await prisma_1.default.item.delete({
            where: { id: item_id },
        });
        return item;
    }
}
exports.DeleteItemService = DeleteItemService;
