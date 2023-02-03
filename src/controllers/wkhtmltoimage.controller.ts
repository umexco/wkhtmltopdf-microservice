import { Request, Response } from 'express-serve-static-core';
import strtostr from 'string-to-stream';
import wkhtmltox from 'wkhtmltox';

export class WkhtmltoimageController {
   /**
    * Create Image
    */
   public createImage(request: Request, response: Response): void {
      response.writeHead(200, { 'Content-Type': 'image/jpeg' });
      new wkhtmltox().image(strtostr(request.body.html), request.body.wkConfig).pipe(response);
   }
}
