import express from 'express';
import path from 'path';
import 'dotenv/config';
import categoriaRoutes from './routes/categoria.routes.js';
import produtoRoutes from './routes/produto.routes.js';

const app = express();

app.use(express.json());

app.use('/', categoriaRoutes);
app.use('/', produtoRoutes);

app.use('/images', express.static(path.resolve('uploads/Images')));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.SERVER_PORT}`);
});