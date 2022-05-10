const express = require("express");
const db = require("./db/connection");
const apiRoutes = require("./routes/apiRoutes");
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/api", apiRoutes);

const {start} = require("./index");

// Not found
app.use((req,res) => {
    res.status(404).end();
});

// Start server after DB connected
db.connect(err => {
    if (err) throw err;
    console.log("Database Connected");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        start();
    })
    // .then(process.exit());
});