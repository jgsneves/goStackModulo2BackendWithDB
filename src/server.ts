import 'reflect-metadata';
import express from 'express';
import routes from './routes/index';
import './database';
import uploadConfig from './config/upload';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
    console.log('Servidor rodando... http://localhost:3333');
});
