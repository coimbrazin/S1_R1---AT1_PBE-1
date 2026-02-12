import { Router } from "express";
import categoriaController from "../controller/categoria.controller.js";

const categoriaRoutes = Router();

categoriaRoutes.get('/categorias', categoriaController.selecionaTodasCategorias);
categoriaRoutes.post('/categorias', categoriaController.novaCategoria);
categoriaRoutes.put('/categorias/:idCategoria', categoriaController.atualizarCategoria);
categoriaRoutes.delete('/categorias/:idCategoria', categoriaController.deletarCategoria);


export default categoriaRoutes;