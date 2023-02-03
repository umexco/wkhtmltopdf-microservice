import bodyParser from 'body-parser';
import { NextHandleFunction } from 'connect';

export class BodyParserMiddleware {
   private readonly handler: NextHandleFunction;

   constructor() {
      this.handler = bodyParser.json({
         limit: process.env.MAX_BODY || '50mb',
      });
   }

   /**
    * Get Handler
    */
   public getHandler(): NextHandleFunction {
      return this.handler;
   }
}
