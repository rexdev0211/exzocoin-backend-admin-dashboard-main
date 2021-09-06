#!/bin/sh     
sudo git pull
cd backend
sudo npm install
cd ..
cd admin
npm install
sudo npm run build
cd ..
sudo systemctl restart nginx
sudo pm2 restart all