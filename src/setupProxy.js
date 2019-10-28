//
// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
//
const proxy = require("http-proxy-middleware");

module.exports = function setupProxy(app) {
  app.use(
    proxy("/.netlify/functions/", {
      target: "http://localhost:8888/"
    })
  );
};
