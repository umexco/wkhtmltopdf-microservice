import express from 'express';
import { Express, NextFunction, Request, Response } from 'express-serve-static-core';
import bodyParser from 'body-parser';
import wkhtmltox from 'wkhtmltox';
import strtostr from 'string-to-stream';

const microService: Express = express();
const converter = new wkhtmltox();

microService.use(
   bodyParser.json({
      limit: process.env.MAX_BODY || '50mb',
   })
);

microService.listen(9100, function () {
   console.log('wkhtmltopdf service is listening on http://localhost:9100');
});

microService.post('/pdf', (request: Request, response: Response) => {
   response.writeHead(200, { 'Content-Type': 'application/pdf' });
   converter.pdf(strtostr(request.body.html), request.body.wkConfig).pipe(response);
});

microService.post('/img', (request: Request, response: Response) => {
   response.writeHead(200, { 'Content-Type': 'image/jpeg' });
   converter.image(strtostr(request.body.html), request.body.wkConfig).pipe(response);
});

microService.get('/', (request: Request, response: Response) => {
   response.status(200).send(`
      <html>
      <head>
         <style>
            body {
               width: 100vw;
               height: 100vh;
               display: flex;
               align-items: center;
               justify-content: center;
               font-family: monospace;
               letter-spacing: 0.2rem;
               font-size: large;
               background-color: aliceblue;
               color: #222;
            }

            @media (prefers-color-scheme: dark) {
               body {
                  color: aliceblue;
                  background-color: #222;
               }
            }
         </style>
      </head>
      <body>
         wkhtmltopdf / microservice
      </body>
      </html>
   `);
});
