const Product = require('../models/productModel');
const LogoIconModel = require('../models/icon&logoModel');

// create product
exports.createProduct = async (req, res, next) => {
    try {
        const savedProducts = await Product.insertMany(req.body);

        res.status(201).json({
            success: true,
            message: 'Products inserted successfully!',
            totalProducts: savedProducts.length,
            data: savedProducts
        });
    } catch (error) {
        next(error)
    };
};

// create logo and icon
exports.createLogoAndIcon = async (req, res, next) => {
    try {
        const logo_iconData = new LogoIconModel(req.body);
        await logo_iconData.save();

        res.status(201).json({
            success: true,
            message: 'data inserted successfully...!',
            logo_iconData,
        });
    } catch (error) {
        next(error)
    };
};

// get all logo and icon
exports.getAllLogoAndIcons = async (req, res, next) => {
    try {
        const data = await LogoIconModel.find({});
        if(!data){
            return res.status(404).json({
                success: false,
                message: 'Logo and icon not found!',
            });
        };

        res.status(201).json({
            success: true,
            message: 'data fetched successfully...!',
            data,
        });
    } catch (error) {
        next(error)
    };
};

// get all products
exports.getAllProcuts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        const totalProducts = await Product.countDocuments();
        res.status(200).json({
            success: true,
            totalProducts,
            data: products
        });
    } catch (error) {
        next(error)
    };
};

// get all products by category
exports.getAllProcutsByCategory = async (req, res, next) => {
    try {
        const { category } = req.query;
        const products = await Product.find({ category });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No products found for category: ${category}`
            });
        };

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        next(error)
    };
};

// get all products by type
exports.getAllProcutsByType = async (req, res, next) => {
    try {
        const type = req.params.type;
        const products = await Product.find({ type });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No products found for type: ${type}`
            });
        };

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        next(error)
    };
};

// get all products by price, e.g low to high/ high to low
exports.getAllProductsByPrice = async (req, res, next) => {
    try {
        const sortOption = req.query.sort === 'desc' ? -1 : 1; // Default is ascending (low to high)

        // Fetch all products and sort by price
        const products = await Product.find({}).sort({ price: sortOption });

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        next(error)
    };
};

// delete image and data
exports.deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.query;
        
        if (!productId) {
            return res.status(500).json({
                success: false,
                message: 'productId is required!',
            });
        };

        // Find the product by its ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        };

        // Delete the product from the database
        await Product.findByIdAndDelete(productId);

        res.status(200).json({
            success: true,
            message: 'Product and associated image deleted successfully',
            deleteDProducts,
        });
    } catch (error) {
        next(error)
    };
};
