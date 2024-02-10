const express = require("express");
const applicationConfig = require("./configurations/app-config");
const app = express();
const port = applicationConfig.port;
const activeUserRouter = require("./routes/active-user")
const flightsRouter = require("./routes/flights");
const bookingsRouter = require("./routes/bookings");
const airlinesRouter = require("./routes/airlines");
const airportsRouter = require("./routes/airports");
const exportersRouter = require("./routes/exporters");
const importersRouter = require("./routes/importers");
const usersRouter = require("./routes/users");
const MainErrorHandler = require("./error-handlers/main-error-handler");

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
app.use("/user", activeUserRouter)
app.use("/flights", flightsRouter);
app.use("/bookings", bookingsRouter);
app.use("/airlines", airlinesRouter);
app.use("/airports", airportsRouter);
app.use("/exporters", exportersRouter);
app.use("/importers", importersRouter);
app.use("/users", usersRouter);

// Configure error handler
app.use(MainErrorHandler)

app.listen(port, () => {
    console.log(`Server started. Listening at http://localhost:${port}`);
});