import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";

// import contactsRouter from "./routes/contactsRouter.js";
// import authRouter from "./routes/authRouter.js";

const PORT = process.env.PORT || 3000;
const connectionString = process.env.connectionString;
export const staticPath = path.resolve("public", "avatars");

mongoose.Promise = global.Promise;

const connection = mongoose.connect(connectionString);

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/avatars", express.static(staticPath));
app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch((e) => {
    console.log(`Server not running. Error message: ${e.message}`);
    process.exit(1);
  });

export default app;
