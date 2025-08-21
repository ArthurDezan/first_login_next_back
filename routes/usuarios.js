// routes/usuarios.js
import express from "express";
import { getConnection } from "../db.js";
import bcrypt from "bcrypt";

const router = express.Router();

// POST /usuarios - cadastrar usuário
router.post("/", async (req, res) => {
  try {
    const { nome, senha } = req.body;
    if (!nome || !senha) return res.status(400).json({ error: "Nome e senha são obrigatórios" });

    const hash = await bcrypt.hash(senha, 10);

    const conn = await getConnection();
    const [result] = await conn.execute("INSERT INTO usuarios (nome, senha) VALUES (?, ?)", [nome, hash]);
    await conn.end();

    res.json({ id: result.insertId, nome });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

// POST /usuarios/login - fazer login
router.post("/login", async (req, res) => {
  try {
    const { nome, senha } = req.body;
    if (!nome || !senha) return res.status(400).json({ error: "Nome e senha são obrigatórios" });

    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT * FROM usuarios WHERE nome = ?", [nome]);
    await conn.end();

    if (rows.length === 0) return res.status(401).json({ error: "Usuário não encontrado" });

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ error: "Senha incorreta" });

    res.json({ id: usuario.id, nome: usuario.nome });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

export default router;
