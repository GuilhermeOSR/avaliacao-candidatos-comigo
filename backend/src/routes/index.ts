import { Router } from "express";
import ticketsRoutes from "./tickets"
import usuariosRoutes from "./usuarios"


const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API funcionando! 🎉" });
});

// monta as rotas de tickets em /api/tickets
router.use("/tickets", ticketsRoutes);
router.use("/usuarios", usuariosRoutes); 



export default router;