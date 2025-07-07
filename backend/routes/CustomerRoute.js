import express from "express";
import {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from "../controller/Customers.js";

const router = express.Router();

// HAPUS /customers dari sini
router.get("/customers", getCustomer);
router.get("/customers/:id", getCustomerById);
router.post("/customers", createCustomer);
router.put("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCustomer);

export default router;
