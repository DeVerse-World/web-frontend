cp ../conf/prod/fe/config.js ../config.js
cp ../conf/prod/fe/next.config.js ../next.config.js
cp ../conf/prod/fe/nginx_conf ../nginx_conf
npm run build
rsync -avz -e ssh ../* root@206.189.159.101:/root/repos/deploy/web-frontend-prod
