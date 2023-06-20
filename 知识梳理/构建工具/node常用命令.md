```bash
# http-server
http-server // hs
-p or --port Port to use (defaults to 8080)

-a Address to use (defaults to 0.0.0.0)

-d Show directory listings (defaults to true)

-i Display autoIndex (defaults to true)

-g or --gzip When enabled (defaults to false) it will serve ./public/some-file.js.gz in place of ./public/some-file.js when a gzipped version of the file exists and the request accepts gzip encoding. If brotli is also enabled, it will try to serve brotli first.

-b or --brotli When enabled (defaults to false) it will serve ./public/some-file.js.br in place of ./public/some-file.js when a brotli compressed version of the file exists and the request accepts br encoding. If gzip is also enabled, it will try to serve brotli first.

-e or --ext Default file extension if none supplied (defaults to html)

-s or --silent Suppress log messages from output

--cors Enable CORS via the Access-Control-Allow-Origin header

-o [path] Open browser window after starting the server. Optionally provide a URL path to open. e.g.: -o /other/dir/

-c Set cache time (in seconds) for cache-control max-age header, e.g. -c10 for 10 seconds (defaults to 3600). To disable caching, use -c-1.

-U or --utc Use UTC time format in log messages.

--log-ip Enable logging of the client's IP address (default: false).

-P or --proxy Proxies all requests which can't be resolved locally to the given url. e.g.: -P http://someurl.com

--username Username for basic authentication [none]

--password Password for basic authentication [none]

-S or --ssl Enable https.

-C or --cert Path to ssl cert file (default: cert.pem).

-K or --key Path to ssl key file (default: key.pem).

-r or --robots Provide a /robots.txt (whose content defaults to User-agent: *\nDisallow: /)

--no-dotfiles Do not show dotfiles

-h or --help Print this list and exit.
```



