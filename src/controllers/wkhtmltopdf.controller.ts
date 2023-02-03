import { Request, Response } from 'express-serve-static-core';
import strtostr from 'string-to-stream';
import wkhtmltox from 'wkhtmltox';

export class WkhtmltopdfController {
   /**
    * Create Pdf
    */
   public createPdf(request: Request, response: Response): void {
      response.writeHead(200, { 'Content-Type': 'application/pdf' });
      new wkhtmltox().pdf(strtostr(request.body.html), request.body.wkConfig).pipe(response);
   }
}
