pm2 stop deverseFEStaging
pm2 start "npm start -- -p 3001" --name deverseFEStaging
