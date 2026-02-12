import pool from "../config/db.js";

const produtoModel = {

  
  selectAllProduto: async () => {
    const sql = 'SELECT * FROM produtos;';
    const [rows] = await pool.query(sql);
    return rows;
  },


  selectByProduto: async (pId) => {
    const sql = 'SELECT * FROM produtos WHERE idProduto=?;';
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  insertProduto: async (pIdCategoria, pNome, pValor, pVinculoImagem) => {
      const sql = 'INSERT INTO produtos (idCategoria, nomeProduto, valorProduto, vinculoImagem) VALUES (?,?,?,?);';
      const values = [pIdCategoria, pNome, pValor, pVinculoImagem];
      const [rows] = await pool.query(sql, values);
      return rows;
  },

  updateProduto: async (pId, pIdCategoria, pNome, pValor) => {
    const sql = 'UPDATE produtos SET idCategoria=?, nomeProduto=?, valorProduto=? WHERE idProduto=?;';
    const values = [pIdCategoria, pNome, pValor, pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  },

  deleteProduto: async (pId) => {
    const sql = 'DELETE FROM produtos WHERE idProduto = ?;';
    const values = [pId];
    const [rows] = await pool.query(sql, values);
    return rows;
  }
}

export default produtoModel;
