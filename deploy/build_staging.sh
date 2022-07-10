cp ../conf/staging/fe/config.js ../config.js
cp ../conf/staging/fe/next.config.js ../next.config.js
npm run build
rsync -avz -e ssh ../* root@206.189.159.101:/root/repos/deploy/web-frontend-staging
