const express = require("express");
const applicationConfig = require("./configurations/app-config");
const app = express();
const port = applicationConfig.port;
const flightsRouter = require("./routes/flights");
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

app.use("/flights", flightsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
    console.log(`Server started. Listening at http://localhost:${port}`);
});