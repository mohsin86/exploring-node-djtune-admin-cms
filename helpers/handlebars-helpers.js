let sitPort = process.env.PORT || 8000;
const SITE_URL= "http://localhost:"+sitPort;
var register = function(Handlebars) {
    var helpers = {
        inc: function(value, options) {
            return parseInt(value) + 1;
        },
        ifValue: function(var1, var2, options) {
            if (var1 === var2) {
                return options.fn(this)
            } else {
                return options.inverse(this)
            }

        },
        SITE_URL: SITE_URL,
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);