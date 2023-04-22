import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
      required: [true, "Product name is mendatory"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Price is mendatory"],
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
    },
    discountPercentage: {
      type: Number,
    },
    thumbnail: {
      type: String,
    },
    images: {
      type: [String],
    },
    stock: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/*Types of Status code
200 == success,
201 == Created,
401 == Unauthorized,
403 == Forbidden,
404 == Not Found,
500 == Internal server Error
*/

// Virtual Properties
productSchema.virtual("range").get(function () {
  if (this.price > 80000) {
    return "High Premium";
  } else if (this.price > 50000 && this.price <= 80000) {
    return "Premium";
  } else if (this.price > 30000 && this.price <= 50000) {
    return "Mid Range";
  } else if (this.price > 20000 && this.price <= 30000) {
    return "Average";
  } else {
    return "Low Range";
  }
});

const Products = mongoose.model("Product", productSchema);

export { Products };
