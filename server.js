const express = require("express");
require("dotenv").config();

const app = express();

app.use("/public", express.static(process.cwd() + "/public"));

app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  })

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});
app.listen(process.env.PORT, () => {
  console.log("Listening on PORT");
}); 