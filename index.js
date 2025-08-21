import express from "express";
import cors from "cors";
import usuariosRoutes from "./routes/usuarios.js";
import pessoasRoutes from "./routes/pessoas.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/pessoas", pessoasRoutes);

app.listen(3001, () => console.log("API rodando em http://localhost:3001"));
