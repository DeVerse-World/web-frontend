cp ../conf/prod/fe/config.js ../config_temp.js
cp ../conf/prod/fe/next.config.js ../next_temp.config.js
cp ../conf/prod/fe/nginx_conf ../nginx_conf_temp
npm run build
rsync -avz -e ssh ../* root@206.189.159.101:/root/repos/deploy/web-frontend-prod
