import produtoModel from "../models/produto.models.js";
import fs from "fs";
import path from "path";

const produtoController = {

    selecionarProdutos: async (req, res) => {
        try {
            const { idProduto } = req.query;

            let resultado;

            if (idProduto) {
                resultado = await produtoModel.selectByProduto(idProduto);
                if (resultado.length === 0) {
                    return res.status(200).json({ message: 'Não há dados com o ID pesquisado' })
                }
                return res.status(200).json({ message: 'Dados da tabela produtos', data: resultado })
            }

            resultado = await produtoModel.selectAllProduto();

            if (resultado.length === 0) {
                return res.status(200).json({ message: 'A consulta não retornou resultados' });
            }

            res.status(200).json({ message: 'Dados da tabela produtos', data: resultado })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    novoProduto: async (req, res) => {
        try {
            const { idCategoria, nomeProduto, valorProduto } = req.body;

            const imagem = req.file ? req.file.filename : null;

            if (!idCategoria || !nomeProduto || !valorProduto) {
                return res.status(400).json({ message: 'Verifique os dados enviados e tente novamente' });
            }

            const resultado = await produtoModel.insertProduto(idCategoria, nomeProduto, Number(valorProduto), imagem);

            res.status(201).json({ message: 'Produto incluído com sucesso', data: resultado });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    updateProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;
            const { idCategoria, nomeProduto, valorProduto } = req.body;

            if (!idProduto) {
                return res.status(400).json({ message: 'ID do produto é obrigatório' });
            }

            const produtoAtual = await produtoModel.selectByProduto(idProduto);

            if (produtoAtual.length === 0) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            const atual = produtoAtual[0];

            const novoIdCategoria = idCategoria ?? atual.idCategoria;
            const novoNomeProduto = nomeProduto ?? atual.nomeProduto;
            const novoValorProduto = valorProduto ?? atual.valorProduto;

            const resultado = await produtoModel.updateProduto(idProduto, novoIdCategoria, novoNomeProduto, novoValorProduto);

            res.status(200).json({ message: 'Produto atualizado com sucesso', data: resultado });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    },

    deleteProduto: async (req, res) => {
        try {
            const { idProduto } = req.params;

            const produto = await produtoModel.selectByProduto(idProduto);

            if (produto.length === 0) {
                return res.status(200).json({ message: "Produto não encontrado" });
            }

            const imagem = produto[0].vinculoImagem;

            await produtoModel.deleteProduto(idProduto);

            if (imagem) {
                const caminhoImagem = path.resolve("uploads/Images", imagem);

                if (fs.existsSync(caminhoImagem)) {
                    fs.unlinkSync(caminhoImagem);
                }
            }

            return res.status(200).json({ message: "Produto deletado com sucesso" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro no servidor", errorMessage: error.message });
        }
    }

};

export default produtoController;
