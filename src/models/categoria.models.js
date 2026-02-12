import pool from "../config/db.js";

const categoriaModel = {

  
  selectAllCategoria: async () => {
    const sql = 'SELECT * FROM categorias;';
    const [rows] = await pool.query(sql);
    return rows;
  },


  selectByCategoria: async (pIdCategoria) => {
    const sql = 'SELECT * FROM categorias WHERE idCategoria=?;';
    const values = [pIdCategoria];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  insertCategoria: async (pDescCateg) => {
      const sql = 'INSERT INTO categorias (descricaoCategoria) VALUES (?);';
      const values = [pDescCateg];
      const [rows] = await pool.query(sql, values);
      return rows;
  },

  updateCategoria: async (pIdCategoria, pDescCateg) => {
    const sql = 'UPDATE categorias SET descricaoCategoria=? WHERE idCategoria=?;';
    const values = [pDescCateg, pIdCategoria];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  deleteCategoria: async (pIdCategoria) => {
    const sql = 'DELETE FROM categorias WHERE idCategoria=?;';
    const values = [pIdCategoria];
    const [rows] = await pool.query(sql, values);
    return rows;
  }
}

export default categoriaModel;
