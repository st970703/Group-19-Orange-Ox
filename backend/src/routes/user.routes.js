const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", controller.allAccess);

  app.get("/api/user/profile", [authJwt.verifyToken], controller.userProfile);

  app.post("/api/user/update", [authJwt.verifyToken], controller.updateUser);

  app.delete("/api/user/delete", [authJwt.verifyToken], controller.deleteUser);
};