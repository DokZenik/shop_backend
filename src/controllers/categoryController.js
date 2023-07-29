import Category from "../Models/CategoryMode.js";

const categoryController = {
    getAll: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: "Server error" });
        }
    },

    create: async (req, res) => {
        const { title, value } = req.body;
        try {
            const newCategory = new Category({ title, value });
            const savedCategory = await newCategory.save();
            res.json(savedCategory);
        } catch (error) {
            res.status(500).json({ error: "Failed to create a category" });
        }
    },
};

export default categoryController;