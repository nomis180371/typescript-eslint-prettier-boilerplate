require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { AppDataSource } from './data-source';
import { ScrappingParamsRoutes } from './modules/scrappingParams/scrappingParamsRoutes';
import { ScrapperRoutes } from './modules/scrapper/scrapperRoutes';
import { AlertsRoutes } from './modules/alerts/alertsRoutes';
import { UserRoutes } from './modules/user/userRoutes';
import { AuthRoutes } from './modules/auth/authRoutes';
import './modules/auth/passportConfig';

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: 'abc',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const paramsRoutes = new ScrappingParamsRoutes();
const scrapperRoutes = new ScrapperRoutes();
const alertsRoutes = new AlertsRoutes();
const userRoutes = new UserRoutes();
const authRoutes = new AuthRoutes();

app.use('/api/scrapping-params', paramsRoutes.getRouter());
app.use('/api/scrapper', scrapperRoutes.getRouter());
app.use('/api/alerts', alertsRoutes.getRouter());
app.use('/api/users', userRoutes.getRouter());
app.use('/api/auth', authRoutes.getRouter());

app.get('/', (req, res) => {
  res.send('Home Page');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
