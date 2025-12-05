import express from "express";
import cookieParser from 'cookie-parser';

// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "../../doc/api/api.json" with { type: "json" };

// Routers api
import commentRouter from "./routers/commentRouter.js";
import voteRouter from "./routers/voteRouter.js";
import userRouter from "./routers/userRouter.js";

import upploadRouter from "./routers/uploadRouter.js";

// Creation du serveur
const app = express();
app.use(cookieParser())
app.use(express.json());

// Routes API
app.use("/api", commentRouter);
app.use("/api", voteRouter);
app.use("/api", userRouter);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Exposer le dossier public
app.use("/", express.static("public"));

// test upload
app.use("/", upploadRouter);

// Demarrage du serveur sur le port 3000
app.listen(3000, () => {
    console.log("Le serveur tourne à cette adresse : http://localhost:3000");
});