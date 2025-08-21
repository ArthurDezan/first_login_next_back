import express from "express";
import { getPessoas, addPessoa, updatePessoa, deletePessoa } from "../controllers/pessoasController.js";
import { getConnection } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const conn = await getConnection();
  await getPessoas(req, res, conn);
  await conn.end();
});

router.post("/", async (req, res) => {
  const conn = await getConnection();
  await addPessoa(req, res, conn);
  await conn.end();
});

router.put("/:id", async (req, res) => {
  const conn = await getConnection();
  await updatePessoa(req, res, conn);
  await conn.end();
});

router.delete("/:id", async (req, res) => {
  const conn = await getConnection();
  await deletePessoa(req, res, conn);
  await conn.end();
});

export default router;
