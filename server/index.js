// const express = require("express");
// const Gun = require("gun");
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(Gun.serve);

// app.get("/", (_, res) => {
//     res.status(200).send("> DEBUG: Discord Node is Live");
// });

// const server = app.listen(port, () => {
//     console.log(
//         `> DEBUG: Discord Node is listening at http://localhost:${port}`
//     );
// });

// Gun({ web: server });

// module.exports = app;
const express = require("express");

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`API listening on PORT ${PORT} `);
});

app.get("/", (req, res) => {
    res.send("Hey this is my API running 🥳");
});

app.get("/about", (req, res) => {
    res.send("This is my about route..... ");
});

// Export the Express API
module.exports = app;
