import { Router } from "express";
import produtoController from "../controller/produto.controller.js";
import uploadImage from "../middleware/uploadImage.middleware.js";

const produtoRoutes = Router();

produtoRoutes.get('/produtos', produtoController.selecionarProdutos);

produtoRoutes.post('/produtos', uploadImage, produtoController.novoProduto);

produtoRoutes.put('/produtos/:idProduto', uploadImage, produtoController.updateProduto);

produtoRoutes.delete('/produtos/:idProduto', produtoController.deleteProduto);

export default produtoRoutes;
