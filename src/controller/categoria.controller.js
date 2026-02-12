import categoriaModel from "../models/categoria.models.js";

const categoriaController = {
  selecionaTodasCategorias: async (req, res) => {
    try {
      const { idCategoria } = req.query;

      let resultado;
      if (idCategoria) {
        resultado = await categoriaModel.selectByCategoria(idCategoria);
        if (resultado.length === 0) {
          return res.status(200).json({ message: 'Não há dados com o ID pesquisado' })
        }

        return res.status(200).json({ message: 'Dados da tabela categorias', data: resultado })
      }

      resultado = await categoriaModel.selectAllCategoria();

      if (resultado.length === 0) {
        return res.status(200).json({ message: 'A consulta não retornou resultados' });
      }
      
      res.status(200).json({ message: 'Dados da tabela categorias', data: resultado })

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
    }
  },

  novaCategoria: async (req, res) => {
    try {
      const { descricaoCategoria } = req.body;

      if (!descricaoCategoria || typeof descricaoCategoria !== "string") {
        return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
      }

      const resultado = await categoriaModel.insertCategoria(descricaoCategoria);

      res.status(201).json({ message: 'Registro incluido com sucesso', data: resultado });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
    }
  },
  atualizarCategoria: async (req, res) => {
    try {
      const { idCategoria } = req.params;
      const { descricaoCategoria } = req.body;

      if (!descricaoCategoria || typeof descricaoCategoria !== "string") {
        return res.status(400).json({ message: "Verifique os dados enviados e tente novamente" });
      }

      const resultado = await categoriaModel.updateCategoria(idCategoria, descricaoCategoria);

      if (resultado.affectedRows === 0) {
        return res.status(200).json({ message: "Categoria não encontrada" });
      }

      res.status(200).json({ message: "Categoria atualizada com sucesso" });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
  },

  deletarCategoria: async (req, res) => {
    try {
      const { idCategoria } = req.params;

      const resultado = await categoriaModel.deleteCategoria(idCategoria);

      if (resultado.affectedRows === 0) {
        return res.status(200).json({ message: "Categoria não encontrada" });
      }

      res.status(200).json({ message: "Categoria excluída com sucesso" });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ocorreu um erro no servidor", errorMessage: error.message });
    }
  }


};

export default categoriaController;