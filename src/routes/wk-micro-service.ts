import { Express } from 'express-serve-static-core';
import { AppController } from '../controllers/app.controller';
import { WkhtmltoimageController } from '../controllers/wkhtmltoimage.controller';
import { WkhtmltopdfController } from '../controllers/wkhtmltopdf.controller';
import { BodyParserMiddleware } from '../middlewares/body-parser.middleware';
import { RateLimitMiddleware } from '../middlewares/rate-limit.middleware';

export class WkMicroService {
   /**
    * Create Routes
    */
   public createRoutes(express: Express): void {
      express.get('/', new AppController().createLandingPage);
      express.post('/pdf', new WkhtmltopdfController().createPdf);
      express.post('/img', new WkhtmltoimageController().createImage);
   }

   /**
    * Use Middleware
    */
   public applyMiddlewares(express: Express): void {
      express.use(new BodyParserMiddleware().getHandler());
      express.use(new RateLimitMiddleware().getHandler());
   }

   /**
    * Listen
    */
   public listen(express: Express, port: number = 9100): void {
      express.listen(port, function () {
         console.log('wkhtmltopdf service is listening on http://localhost:' + port);
      });
   }
}
