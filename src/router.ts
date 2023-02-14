import { Router } from "express";
import { body } from "express-validator";
import {
  getProducts,
  createProduct,
  updateProductName,
  deleteProduct,
  getOneProduct,
} from "./handlers/product";
import {
  getUpdates,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from "./handlers/update";
import { handleInputErrors } from "./middleware/middleware";
const router = Router();

// Product
router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProductName
);

router.delete("/product/:id", deleteProduct);

// Update

router.get("/update", getUpdates);

router.get("/update/:id", (req, res) => {});

router.post("/update", createUpdate);

router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").isString(),
  body("status").isIn(["IN_PROGRESS", "DONE"]),
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

// Update Point

router.get(
  "/updatepoint",
  body("name").optional().isString(),
  body("description").isString(),
  (req, res) => {}
);

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint", (req, res) => {});

router.put("/updatepoint/:id", (req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});

export default router;
