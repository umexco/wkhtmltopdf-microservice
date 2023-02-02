# wkhtmltopdf-microservice
### A simple wkhtmltopdf / wkhtmltoimage Docker microservice

## Docker Image
https://hub.docker.com/r/umex/wkhtmltopdf-microservice

```yaml
# Check the latest image version at Docker Hub
image: umex/wkhtmltopdf-microservice:1.0-alpine
```

## Setup Docker Service
If you just use it internally within your Docker network, it is not required (and not recommendable) to expose the port.

For example: Your service `any_backend` can make HTTP requests to `http://wkhtmltopdf:9100/pdf`.  
```yaml
services:
   any_backend:
      image: superman/any_backend:latest
      ports:
         - "80:80"
      
   wkhtmltopdf:
      container_name: wkhtmltopdf_service
      image: umex/wkhtmltopdf-microservice:1.0-alpine
      ports:
         -  "9100:9100"
      restart: unless-stopped
```

## Service test page
To test if the service is available, you can simply send a GET request to the service and should see a landing page.
If you do this from your local browser, you need to expose the service port first.
```http request
GET http://localhost:9100
GET http://wkhtmltopdf:9100
```

## Create PDF
```http request
POST http://localhost:9100/pdf
POST http://wkhtmltopdf:9100/pdf
```
Options: https://www.mankier.com/1/wkhtmltopdf
```json
{
    "html": "<html><body><h1 style=\"color: red;\">HI I AM HERE</h1></body></html>",
    "wkConfig": {
        "dpi": "1200",
        "grayscale": true,
        "disableSmartShrinking": true,
        "imageQuality": 100,
        "pageWidth": 400,
        "pageHeight": 280,
        "marginTop": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "marginRight": 0
    }
}
```

## Create IMAGE
```http request
POST http://localhost:9100/img
POST http://wkhtmltopdf:9100/img
```
Options: https://www.mankier.com/1/wkhtmltoimage
```json
{
   "html": "<html><body><h1 style=\"color: red;\">HI I AM HERE</h1></body></html>",
   "wkConfig": {
      "width": 400,
      "height": 280,
      "quality": 100
   }
}
```
