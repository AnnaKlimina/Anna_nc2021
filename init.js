var express = require("express");
var cors = require("cors");

const app = express();
app.get("*", express.static("./"));

const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`App start on port ${port}`);
});
