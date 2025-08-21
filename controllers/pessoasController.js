export const getPessoas = async (req, res, conn) => {
    const [rows] = await conn.execute("SELECT * FROM pessoas");
    res.json(rows);
  };
  
  export const addPessoa = async (req, res, conn) => {
    const { nome, idade, telefone } = req.body;
    const [result] = await conn.execute(
      "INSERT INTO pessoas (nome, idade, telefone) VALUES (?, ?, ?)",
      [nome, idade, telefone]
    );
    res.json({ id: result.insertId, nome, idade, telefone });
  };
  
  export const updatePessoa = async (req, res, conn) => {
    const { id } = req.params;
    const { nome, idade, telefone } = req.body;
    await conn.execute(
      "UPDATE pessoas SET nome = ?, idade = ?, telefone = ? WHERE id = ?",
      [nome, idade, telefone, id]
    );
    res.json({ id, nome, idade, telefone });
  };
  
  export const deletePessoa = async (req, res, conn) => {
    const { id } = req.params;
    await conn.execute("DELETE FROM pessoas WHERE id = ?", [id]);
    res.json({ success: true });
  };
  