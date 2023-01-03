import express, { query } from "express";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
const productRouter = express.Router();
// '/' is the same as "/api/products" defined in server.js

productRouter.get("/", async (req, res) => {
  //return all products (import product from product model)
  const products = await Product.find();
  //send data to frontend
  res.send(products);
});


const PAGE_SIZE = 3;
productRouter.get(
  
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";
    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              //case sensitive
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]), //get mini and maximum value example 1-50, we get all value greater than 1 and less than 50
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 } //ascending
        : order === "highest"
        ? { price: -1 } //descending
        : order === "toprate"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,

    })
    .sort(sortOrder)
    .skip(pageSize * (page-1))
    .limit(pageSize)
    const countProducts= await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
    //send data to frontend
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts/pageSize)
  })
  })
)
productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  //replace slug with the value the user input (req.params.slug)
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});
export default productRouter;
