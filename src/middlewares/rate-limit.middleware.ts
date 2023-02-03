import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

export class RateLimitMiddleware {
   private readonly handler: RateLimitRequestHandler;

   constructor() {
      this.handler = rateLimit({
         windowMs: 60 * 1000, // 1 minutes
         max: process.env.MAX_REQUESTS ? parseInt(process.env.MAX_REQUESTS) : 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
         standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
         legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      });
   }

   /**
    * Get Handler
    */
   public getHandler(): RateLimitRequestHandler {
      return this.handler;
   }
}
