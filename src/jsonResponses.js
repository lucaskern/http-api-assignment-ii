const qs = require('querystring');

// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const users = {};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

    // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

    // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

// get user object
// should calculate a 200
const getUsers = (request, response) => {
  // json object to send
  const responseJSON = {
    users,
  };

    // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// get meta info about user object
// should calculate a 200
const getUsersMeta = (request, response) =>
  // return 200 without message, just the meta data
  respondJSONMeta(request, response, 200);

// function just to update our object
const updateUser = (request, response) => {
  let body = '';
  let post = '';

  request.on('data', (data) => {
    body += data;
  });

  request.on('end', () => {
    post = qs.parse(body);
    // use post['blah'], etc.
    console.dir(post);

    // change to make to user
    const newUser = {
      age: post.age,
      name: post.name,
    };

    // modifying our dummy object
    // just indexing by time for now
    users[newUser.name] = newUser;

    // console.dir(request.body);

    // return a 201 created status
    return respondJSON(request, response, 201, newUser);
  });
};

// function for 404 not found requests with message
const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

    // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

// function for 404 not found without message
const notFoundMeta = (request, response) => {
  // return a 404 without an error message
  respondJSONMeta(request, response, 404);
};

// set public modules
module.exports = {
  getUsers,
  getUsersMeta,
  updateUser,
  notFound,
  notFoundMeta,
};
