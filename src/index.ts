import express from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import cors from 'cors';
import { ScrappingParamsRoutes } from './scrappingParams/scrappingParamsRoutes';
import { ScrappperRoutes } from './scrapper/scrapperRoutes';
import { AlertsRoutes } from './alerts/alertsRoutes';

const app = express();
const paramsRoutes = new ScrappingParamsRoutes();
const scrapperRoutes = new ScrappperRoutes();
const alertsRoutes = new AlertsRoutes();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(
  paramsRoutes.getRouter(),
  scrapperRoutes.getRouter(),
  alertsRoutes.getRouter()
);

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
