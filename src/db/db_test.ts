import pool from "./db";

// test the connection first to avoide any bugs
async function testConnection() {
    try {
        const [rows] = await pool.query("SELECT * from users");

        console.log("Database connected successfully!");
        console.log(rows);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

testConnection();