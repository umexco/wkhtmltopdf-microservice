#!/usr/bin/env bash

shutdownHandler() {
   killall node & PID_A=$!

   wait $PID_A
   echo "==================================="
   echo "=== WKHTMLTOPDF service stopped ==="
   echo "==================================="

   exit 0
}
trap 'shutdownHandler' TERM

npm start &
echo "============================="
echo "===  wkhtmltopdf started  ==="
echo "============================="

# wait forever
while true; do
   tail -f /dev/null &
   wait ${!}
done
