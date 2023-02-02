#!/usr/bin/env bash

if [[ $(which dialog) = "dialog not found" ]]; then
   echo "Please install dialog. On MacOS run: brew install dialog"
   exit 1
fi
if [[ -z $(which dialog) ]]; then
   echo "Please install dialog. On MacOS run: brew install dialog"
   exit 1
fi

# Image imageVersion
while true; do
   imageVersion=$(dialog --stdout --title "Version" --inputbox "Enter a SemVer imageVersion number (e.g. 1.2):" 10 55)
   printf "\033c"

   if [[ $imageVersion =~ ^[0-9]+\.[0-9]+$ ]]; then
      break
   else
      echo "Invalid SemVer imageVersion number"
      sleep 1
   fi
done

# Publish on docker hub
publish=$(dialog --stdout --defaultno --title "Publish?" --yesno "Do you want to publish the images on Docker Hub?" 10 45 && echo YES)
if [[ $publish != "YES" ]]; then
   publish=NO
fi
printf "\033c"

echo "============================"
echo "===       SUMMARY        ==="
echo "============================"

echo "IMAGE Version: $imageVersion"
echo "Publish: $publish"

cd ./build/wkhtmltopdf-microservice-alpine || $(printf "\n\n\n>>> ERROR: Wrong working directory!\n\n\n" && exit 1)

if [[ $publish = "YES" ]]; then
   printf "\n\n\n"
   echo "============================"
   echo "===       LOGIN...       ==="
   echo "============================"
   docker login
fi

printf "\n\n\n"
echo "============================"
echo "===     BUILDING...      ==="
echo "============================"

outputImages=()

imageTag=umex/wkhtmltopdf-microservice:"${imageVersion}"-alpine
printf "$(tput setaf 1)Tag: $imageTag$(tput sgr 0)\n\n"

cd ../../../

docker build -f ./docker/build/wkhtmltopdf-microservice-alpine/Dockerfile --tag "${imageTag}" .

outputImages+=($imageTag)
if [[ $publish = "YES" ]]; then
   docker push "${imageTag}"
fi

printf "\n\n\n"
echo "============================"
echo "===  BUILDING COMPLETE   ==="
echo "============================"

for value in "${outputImages[@]}"
do
   printf "\n$(tput setaf 1)$value$(tput sgr 0)"
done

printf "\n\n"

exit 0
