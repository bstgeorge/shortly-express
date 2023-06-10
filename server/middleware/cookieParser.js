
module.exports.parseCookies = (req, res, next) => {
  let cookieList = req.get('cookie');
  if (cookieList !== undefined) {
    let cookieArray = cookieList.split(';');
    let cookieObject = {};
    for (let cookie of cookieArray) {
      let equalIndex = cookie.indexOf('=');
      let name = cookie.slice(0, equalIndex).trimStart();
      let value = cookie.substring(equalIndex+1, cookie.length);
      cookieObject[name] = value;
    }
    req.cookies = cookieObject;
  }
  next();

  //if the session doesn't exist currently

  //req.cookie;
  //make cookie object and add it to req
  //redirect to login
  //login has a href to signup if they dont have an account
  //console.log(req.headers);
//res.cookie('id', Math.floor(Math.random()*1000));
  //split headers.cookie by ;
  //
  //test=test2
  //test3=test3
  //id=155
  //
  //split above by equal sign look for first index of = sign
  //
};