import express from 'express';
import ClassesController from './controllers/ClassesCrontroller'
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

const classesController = new ClassesController();
routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

const connectionsController = new ConnectionsController();
routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);


export default routes;
