// import { query } from "../config/database";
import dotenv from "dotenv";
import argon2 from "argon2";
import { query } from "../config/database.js";

dotenv.config();

const createCustomer =  async (req, res) => {
    const {username, email, password, confirmpassword} = req.body
    if(password !== confirmpassword) return res.status(400).json({ message: 'Password dan Confirm Password Tidak Sama' });
    const hashPassword =  await argon2.hash(password);

    try{
await query("INSERT INTO customer (username, email, password) VALUES (?, ?, ?)", [username, email, hashPassword]);
        res.status(201).json({ message: 'Customer Berhasil Dibuat' });
    } catch (error) {
        return res.status(500).json({message: "gagal membuat akun" , error: error.message});
    }   
}

const getCustomer =  async (req, res) => {
      try {
    const customer = await query("SELECT * FROM customer");
    return res.status(200).json({ msg: "Data has been fetched", data: customer });
  } catch (error) {
    return res.status(500).json({ msg: "failed getting data ", error });
  }
}

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query("SELECT * FROM customer WHERE id = ?", [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Customer tidak ditemukan' });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateCustomer =  async (req, res) => {
    
}

const deleteCustomer =  async (req, res) => {
    
}

export {
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}