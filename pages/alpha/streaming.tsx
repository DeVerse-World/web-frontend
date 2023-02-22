import Iframe from 'react-iframe';
import { getAlphaLayout } from "../../components/AlphaLayout";

function Streaming() {
    return (
        <Iframe url="http://1.54.73.92:91"
                width="100%"
                height="100%"
                id=""
                className=""
                display="block"
                allow="fullscreen"
                position="relative"/>
    )
}

Streaming.getLayout = getAlphaLayout

export default Streaming;
    //
    // root /root/repos/deploy/web-frontend-staging;
    //
    // index index.html index.htm;
    // server_name staging.deverse.world; # managed by Certbot
    //
    // # Serve any static assets with NGINX
    //
    // location /_next/static {
    //     alias /root/repos/deploy/web-frontend-staging/build/static;
    //     add_header Cache-Control "public, max-age=3600, immutable";
    // }
    //
    // location / {
    //     try_files $uri.html $uri/index.html # only serve html files from this dir
    //     @public
    //     @nextjs;
    //     add_header Cache-Control "public, max-age=3600";
    // }
    //
    // location @public {
    //     add_header Cache-Control "public, max-age=3600";
    // }
    //
    // location @nextjs {
    //     # reverse proxy for next server
    //     proxy_pass http://localhost:3001; #Don't forget to update your port number
    //     proxy_http_version 1.1;
    //     proxy_set_header Upgrade $http_upgrade;
    //     proxy_set_header Connection 'upgrade';
    //     proxy_set_header Host $host;
    //     proxy_cache_bypass $http_upgrade;
    // }
    //
    // if ($request_uri = /alpha/streaming) {
    //     return 301 http://$host$request_uri;
    // } # managed by Certbot
