const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  console.log('This was hit |', req.url);
  console.log('Is this real :', req.cookies);
  //if req.cookies is undefined or session is undefined
  // give the user a session, add it to our sessions database, update their cookies
  //if a user has cookies & has a valid session, move on
  if (!req.cookies || !req.cookies.session) {
    console.log('No cookies or no session. Give user a session.');
    let sessionCreated = models.Sessions.create();
    sessionCreated.then((resolve) => {
      var insertedId = resolve['insertId'];
      var test = models.Sessions.get({id:insertedId});
      test.then((resolve) => {
        console.log(resolve['hash']);
        res.cookie('session', resolve['hash']);
        next();
      });
    }).catch((reject) => {
      console.log(reject);
      next();
    });
    //generate a session
    //add session to database -> on resolve of database insertion update cookie
    //attach a session to res.cookie('session', $session);
  } else if (req.cookies && req.cookies.session) {
    let myCookie = req.cookies.session;
    let myStatus = models.Sessions.get({hash: myCookie});
    myStatus.then((resolve) => {
      if (!resolve) {
        console.log('That session didnt match our records.');
      } else {
        console.log(`Your session is valid ${resolve['hash']}`);
      }
      next();
    }).catch((reject) => {
      console.log('There was an error');
      console.log(reject);
      next();
    });
    //check the database to see if myCookie is a valid session, if it is respond with verified

  }

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/


