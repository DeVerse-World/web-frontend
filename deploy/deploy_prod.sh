cd ..
cp config_temp.js config.js
cp next_temp.config.js next.config.js
pm2 stop deverseFE
pm2 start "npm start" --name deverseFE
