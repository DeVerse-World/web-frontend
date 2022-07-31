cd ..
#cp config_temp.js config.js
#cp next_temp.config.js next.config.js
pm2 stop deverseFEStaging
pm2 start "npm start -- -p 3001" --name deverseFEStaging
