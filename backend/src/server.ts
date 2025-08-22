import express from "express";
import cors from "cors";
import routes from "./routes/index"; 
import { setupSwagger } from "./swagger";

const app = express();

//Middlewares

app.use(cors());
app.use(express.json());

// Swagger Docs
setupSwagger(app);

//Routes
app.use("/api", routes);

//Porta
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📖 Swagger docs: http://localhost:${PORT}/api-docs`);
});