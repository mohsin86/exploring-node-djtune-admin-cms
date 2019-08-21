const common = require('./commonController');
const data = {};

const home = (req, res, next) => {
    let session = req.session;
    data.logInuserInfo = session.user;
    res.render("home", {data: data});
};


module.exports = home;
