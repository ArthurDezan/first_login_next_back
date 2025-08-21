export const getUsuarios = async (req, res, conn) => {
    const [rows] = await conn.execute("SELECT * FROM usuarios");
    res.json(rows);
  };
  
  export const addUsuario = async (req, res, conn) => {
    const { nome, senha } = req.body;
    const [result] = await conn.execute(
      "INSERT INTO usuarios (nome, senha) VALUES (?, ?)",
      [nome, senha]
    );
    res.json({ id: result.insertId, nome });
  };
  
  export const updateUsuario = async (req, res, conn) => {
    const { id } = req.params;
    const { nome, senha } = req.body;
    await conn.execute(
      "UPDATE usuarios SET nome = ?, senha = ? WHERE id = ?",
      [nome, senha, id]
    );
    res.json({ id, nome });
  };
  
  export const deleteUsuario = async (req, res, conn) => {
    const { id } = req.params;
    await conn.execute("DELETE FROM usuarios WHERE id = ?", [id]);
    res.json({ success: true });
  };
  