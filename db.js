import mysql from "mysql2/promise";

export async function getConnection() {
  return await mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",      // seu usuário
    password: "root", // sua senha
    database: "next"
  });
}