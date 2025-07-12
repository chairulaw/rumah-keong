import db from "../config/database.js";

export const getUserProfileById = async (req, res) => {
    const {id: userId} = req.params;
    
    try {
        const userQuery = "SELECT id, nama, email FROM users WHERE id = ?";
        const [rows] = await db.query(userQuery, [userId]);
        if (!rows.length) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
}

export const getAllUserProfile  = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, nama, email FROM users");
        if (!rows.length) {
            return res.status(404).json({ message: "No users found" });
        }
        res.json(rows);
    } catch (error) {
        console.error("Error fetching user profiles:", error);
        res.status(500).json({ message: "Error fetching user profiles", error: error.message });
    }
}