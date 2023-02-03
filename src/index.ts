import express from 'express';
import { Express } from 'express-serve-static-core';

import { WkMicroService } from './routes/wk-micro-service';

const express1: Express = express();

const wk = new WkMicroService();
wk.applyMiddlewares(express1);
wk.createRoutes(express1);
wk.listen(express1, 9100);
