import * as express from 'express';
import './db/mongoose';
import {postRouter} from './routers/post';
import {getRouter} from './routers/get';
import {patchRouter} from './routers/patch';
import {deleteRouter} from './routers/delete';
import {defaultRouter} from './routers/default';

/**
 * Aplicacion express
 */
const app = express();

/**
 * Registro de routers 
 * Metodo empleado: app.use()
 * Routers registrados: [post, get, patch, delete, default]
 */
app.use(express.json());
app.use(postRouter);
app.use(getRouter);
app.use(patchRouter);
app.use(deleteRouter);
app.use(defaultRouter);

const port = process.env.PORT || 3000 ;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});