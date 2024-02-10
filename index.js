const express = require("express");
const applicationConfig = require("./configurations/app-config");
const app = express();
const port = applicationConfig.port;
const flightsRouter = require("./routes/flights");
const bookingsRouter = require("./routes/bookings");
const airlinesRouter = require("./routes/airlines");
const airportsRouter = require("./routes/airports");
const exportersRouter = require("./routes/exporters");
const importersRouter = require("./routes/importers");
const usersRouter = require("./routes/users");
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});

// Configure routes
app.use("/flights", flightsRouter);
app.use("/bookings", bookingsRouter);
app.use("/airlines", airlinesRouter);
app.use("/airports", airportsRouter);
app.use("/exporters", exportersRouter);
app.use("/importers", importersRouter);
app.use("/users", usersRouter);

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