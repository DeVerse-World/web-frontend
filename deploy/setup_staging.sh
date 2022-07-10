sudo certbot --nginx -d staging.deverse.world
cp ../conf/staging/fe/nginx_conf /etc/nginx/sites-enabled/staging.deverse.world
