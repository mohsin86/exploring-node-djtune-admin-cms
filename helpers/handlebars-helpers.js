var register = function(Handlebars) {
    var helpers = {
        inc: function(value, options) {
            return parseInt(value) + 1;
        },
        foo: function(var1, var2) {
            return var1;
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.registerHelper = register;
module.exports.helpers = register(null);