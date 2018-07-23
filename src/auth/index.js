const scopes = require("./scopes");

module.exports = async (request, response, next) => {
    const authorization = request.header("Authorization");
    if (!authorization) {
        request.user = null;
        request.isAuthenticated = true;
        request.scope = scopes[0];
    }
    next();
}