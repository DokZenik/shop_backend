import HistoryOrder from "../Models/HistoryOrderModel.js";
import Product from "../Models/ProductModel.js";

class HistoryController{
    async getAllByUserId(req, res) {
        const history = await HistoryOrder.find({"userId": req.params.userId})
        res.json(history)
    }
    async saveItem(req, res){
        const {item} = req.body
        console.log(item.order)
        for (const item1 of item.order) {
            const modifyItem = await Product.findOne({"_id": item1.product._id})
            console.log(modifyItem.countInStock - item1.count)
            await modifyItem.updateOne({"countInStock": modifyItem.countInStock - item1.count})
            // await Product.updateOne(modifyItem, {$set: {"countInStock": modifyItem.countInStock - item1.count}}, {upsert: true})
        }

        const historyItem = new HistoryOrder(item)
        await historyItem.save()
        res.status(200).json({message: "History order was updated"})
    }
    async getAll(req, res) {
        const history = await HistoryOrder.find()
        res.json(history)
    }
}

export default new HistoryController()