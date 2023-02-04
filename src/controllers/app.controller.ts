import { Request, Response } from 'express-serve-static-core';

export class AppController {
   /**
    * Create Landing Page
    */
   public static getLandingPage(request: Request, response: Response): void {
      response.status(200).send(`
      <html lang='en'>
      <head>
         <title>wkhtmltopdf / microservice</title>
         <style>
            body {
               width: 100vw;
               height: 100vh;
               margin: 0;
               display: flex;
               flex-direction: column;
               align-items: center;
               justify-content: center;
               font-family: monospace;
               letter-spacing: 0.2rem;
               font-size: large;
               background-color: aliceblue;
               color: #222;
               line-height: 4;
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
         <div>microservice</div>
         <div>wkhtmltopdf / wkhtmltoimage</div>
      </body>
      </html>
   `);
   }
}
