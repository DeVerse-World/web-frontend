cp ../conf/staging/fe/config.js ../config_temp.js
cp ../conf/staging/fe/next.config.js ../next_temp.config.js
cp ../conf/staging/fe/nginx_conf ../nginx_conf_temp
npm run build
rsync -avz -e ssh ../* root@206.189.159.101:/root/repos/deploy/web-frontend-staging
