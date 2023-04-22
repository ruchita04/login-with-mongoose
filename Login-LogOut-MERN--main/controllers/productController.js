import { query } from "express";
import { Products } from "../models/productModel.js";
import Abstrat from "../utils/abstract.js";
import catchErrorApi from "../utils/catchErrorApi.js";

const createProduct = catchErrorApi(async (req, res) => {
  const product = await Products.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

const findAllProducts = catchErrorApi(async (req, res) => {
  // queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (str) => `$${str}` );
  let query = Products.find();

  const option = new Abstrat(query, req.query);
  option.filter().sorting().fieldSet().Pagination();

  const Product = await query;
  res.status(200).json({
    status: "success",
    result: Product.length,
    data: Product,
  });
});

const getAggregateProduct = catchErrorApi(async (req, res) => {
  const aggregate = await Products.aggregate([
    {
      $match: {
        price: {
          $gt: 40,
          $lte: 50,
        },
      },
    },
    {
      $group: {
        _id: "$category",
        totalPrice: { $sum: "$price" },
        avgRating: { $avg: "$price" },
        totalProduct: { $sum: 1 },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $addFields: {
        category: "$_id",
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        category: 1,
      },
    },
    {
      $limit: 5,
    },
  ]);
  res.status(200).json({
    status: "success",
    result: aggregate.length,
    data: aggregate,
  });
});

const getSingleProduct = catchErrorApi(async (req, res) => {
  const product = await Products.findOne(req.params);
  res.status(200).json({
    status: "success",
    result: product.length,
    data: product,
  });
});

const updateProduct = catchErrorApi(async (req, res) => {
  const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json({
    status: "success",
    result: product.length,
    data: {
      product,
    },
  });
});

const updateProductByQuery = catchErrorApi(async (req, res) => {
  // const product = await Products.updateMany(req.query, req.body, {
  //   new: true,
  // });
  const product = await Products.findOneAndUpdate(req.query, req.body, {
    new: true,
  });
  res.status(201).json({
    status: "success",
    result: product.length,
    data: product,
  });
});

const deleteProduct = catchErrorApi(async (req, res) => {
  // const product = await Products.findOneAndDelete(req.params);
  const product = await Products.deleteMany(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

const deleteProductByName = catchErrorApi(async (req, res) => {
  const product = await Products.findOneAndRemove(req.body, {
    strict: "throw",
  });
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

export {
  getSingleProduct,
  createProduct,
  findAllProducts,
  updateProduct,
  updateProductByQuery,
  deleteProduct,
  deleteProductByName,
  getAggregateProduct,
};
