// import { query } from "../config/database";
import dotenv from "dotenv";
import argon2 from "argon2";
import { query } from "../config/database.js";

dotenv.config();

const createPenjual =  async (req, res) => {
    const {namatoko, email, password, confirmpassword} = req.body
    if(password !== confirmpassword) return res.status(400).json({ message: 'Password dan Confirm Password Tidak Sama' });
    const hashPassword =  await argon2.hash(password);

    try {
        await query("INSERT INTO penjual (namatoko, email, password) VALUES (?, ?, ?)", [namatoko, email, hashPassword]);
        res.status(201).json({ message: "Penjual Berhasil Dibuat" });
    } catch (error) {
        return res.status(500).json({message: "gagal membuat akun" , error: error.message});
    }
}

const getPenjual =  async (req, res) => {
    try{
        const penjual = await query("SELECT * FROM penjual");
        return res.status(200).json({ msg: "Data has been fetched", data: penjual });
    } catch (error) {
        return res.status(500).json({ msg: "failed getting data ", error });
    }
}

const getPenjualById =  async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query("SELECT * FROM penjual WHERE id = ?", [id]);
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'Penjual tidak ditemukan' });
        }
        
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePenjual =  async (req, res) => {
    
}

const deletePenjual =  async (req, res) => {
    
}

export {
    createPenjual,
    getPenjual,
    getPenjualById,
    updatePenjual,
    deletePenjual
}