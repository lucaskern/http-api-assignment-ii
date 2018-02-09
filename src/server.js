const http = require('http'); // http module
const url = require('url'); // url module
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// function to handle requests
const onRequest = (request, response) => {
    // parse url into individual parts
    // returns an object of url parts by name
    const parsedUrl = url.parse(request.url);

    console.log(request.method);

    // check the request method (get, head, post, etc)
    switch (request.method) {
        case 'GET':
            if (parsedUrl.pathname === '/') {
                // if homepage, send index
                htmlHandler.getIndex(request, response);
            } else if (parsedUrl.pathname === '/style.css') {
                // if stylesheet, send stylesheet
                htmlHandler.getCSS(request, response);
            } else if (parsedUrl.pathname === '/getUsers') {
                // if get users, send user object back
                jsonHandler.getUsers(request, response);
            } else if (parsedUrl.pathname === '/updateUser') {
                // if update user, change our user object
                jsonHandler.updateUser(request, response);
            } else {
                // if not found, send 404 message
                jsonHandler.notFound(request, response);
            }
            break;
        case 'HEAD':
            if (parsedUrl.pathname === '/getUsers') {
                // if get users, send meta data back
                jsonHandler.getUsersMeta(request, response);
            } else {
                // if not found send 404 without body
                jsonHandler.notFoundMeta(request, response);
            }
            break;
        case 'POST':
            jsonHandler.updateUser(request, response);
            break;
        default:
            // send 404 in any other case
            jsonHandler.notFound(request, response);
    }
};

// start server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
