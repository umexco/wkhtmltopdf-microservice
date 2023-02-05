# wkhtmltopdf-microservice
### Fast Docker microservice for wkhtmltopdf and wkhtmltoimage

[![GitHub Stars](https://img.shields.io/github/stars/umexco/wkhtmltopdf-microservice.svg)](https://github.com/umexco/wkhtmltopdf-microservice)
[![Docker Pulls](https://img.shields.io/docker/pulls/umex/wkhtmltopdf-microservice.svg)](https://hub.docker.com/r/umex/wkhtmltopdf-microservice/)
[![Docker Stars](https://img.shields.io/docker/stars/umex/wkhtmltopdf-microservice.svg)](https://hub.docker.com/r/umex/wkhtmltopdf-microservice/)
[![Issues](https://img.shields.io/github/issues/umexco/wkhtmltopdf-microservice.svg)](https://github.com/umexco/wkhtmltopdf-microservice)
[![MIT licensed](https://img.shields.io/github/license/umexco/wkhtmltopdf-microservice.svg)](https://github.com/umexco/wkhtmltopdf-microservice/blob/master/LICENSE)

## Docker image
https://hub.docker.com/r/umex/wkhtmltopdf-microservice

```yaml
# Check the latest image version tag at Docker Hub
image: umex/wkhtmltopdf-microservice:1.2-alpine
```

## Docker service
Quick test
```shell
docker run -p 9100:9100 --name wkhtmltopdf umex/wkhtmltopdf-microservice:1.2-alpine 
```

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
      image: umex/wkhtmltopdf-microservice:1.2-alpine
      restart: unless-stopped
```
### Environment
```yaml
wkhtmltopdf:
   environment:
      # Default max body size
      MAX_BODY: '50mb'
      # Max requests per minute
      MAX_REQUESTS: 100
      NODE_PORT: 9100
```

## Check service is running
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
PDF options: https://www.mankier.com/1/wkhtmltopdf
```json
# JSON POST body
   
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
Image options: https://www.mankier.com/1/wkhtmltoimage
```json
# JSON POST body
   
{
   "html": "<html><body><h1 style=\"color: red;\">HI I AM HERE</h1></body></html>",
   "wkConfig": {
      "width": 400,
      "height": 280,
      "quality": 100
   }
}
```

## Open source
- https://github.com/umexco/wkhtmltopdf-microservice

## Credits
- https://github.com/tcort/wkhtmltox
- https://github.com/Surnet/docker-wkhtmltopdf/
