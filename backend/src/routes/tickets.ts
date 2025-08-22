import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();
const prisma = new PrismaClient();


let clienteCounter = 1;

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Gestão de tickets
 */

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Lista todos os tickets
 *     tags: [Tickets]
 *     responses:
 *       200:
 *         description: Lista de tickets
 *       500:
 *         description: Erro ao buscar tickets
 */


router.get("/", async (req, res) => {
  try {
    // page e limit vindos da query, se não vierem usa valores padrão
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // busca tickets com paginação
    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        skip,
        take: limit,
        include: {
          usuario: true,
        },
        orderBy: { id: "asc" }, // opcional, só pra organizar
      }),
      prisma.ticket.count(),
    ]);

    return res.status(200).json({
      tickets,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar tickets" });
  }
});

router.use(authMiddleware); 
// todas as rotas exigem estar logado

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Cria um novo ticket
 *     tags: [Tickets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contatoPassivo:
 *                 type: boolean
 *               tipoContato:
 *                 type: string
 *                 description: Obrigatório se contatoPassivo for true
 *               tipo:
 *                 type: string
 *                 description: Intuito do ticket (operacional, suporte, relacionamento, vendas)
 *               motivo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               veiculo:
 *                 type: string
 *             required:
 *               - tipo
 *               - motivo
 *               - descricao
 *               - veiculo
 *     responses:
 *       200:
 *         description: Ticket criado com sucesso
 *       400:
 *         description: Erros de validação
 */


// POST /api/tickets
router.post("/", async (req, res) => {
  try {
    const {
      contatoPassivo,
      tipoContato,
      tipo,
      motivo,
      descricao,
      veiculo,
    } = req.body;

    const errors: string[] = [];

    if (contatoPassivo === undefined) errors.push("O campo 'contatoPassivo' é obrigatório.");
    if (contatoPassivo === true && !tipoContato)
      errors.push("Se 'contatoPassivo' = true, informe 'tipoContato'.");
    if (!tipo) errors.push("O campo 'tipo' é obrigatório.");
    if (!motivo) errors.push("O campo 'motivo' é obrigatório.");
    if (!descricao) errors.push("O campo 'descricao' é obrigatório.");
    if (!veiculo) errors.push("O campo 'veiculo' é obrigatório.");

    if (errors.length > 0) {
      return res.status(400).json({ erros: errors });
    }

    const dataAbertura = new Date();

    // adiciona 3 dias
    const prazo = new Date(dataAbertura);
    prazo.setDate(prazo.getDate() + 3);

    const ticket = await prisma.ticket.create({
      data: {
        cliente: `Cliente ${clienteCounter++}`,
        contatoPassivo,
        tipoContato: contatoPassivo ? tipoContato : null,
        tipo,
        motivo,
        descricao,
        veiculo,
        dataAbertura,
        prazo, 
        status: "A fazer",
      },
    });

    return res.status(200).json({
      message: "Ticket criado com sucesso",
      ticket,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar ticket" });
  }
});

/**
 * @swagger
 * /api/tickets/{id}:
 *   put:
 *     summary: Atualiza um ticket existente
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contatoPassivo:
 *                 type: boolean
 *               tipoContato:
 *                 type: string
 *               tipo:
 *                 type: string
 *               motivo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               veiculo:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [A fazer, Em andamento, Concluído]
 *     responses:
 *       200:
 *         description: Ticket atualizado com sucesso
 *       404:
 *         description: Ticket não encontrado
 *       400:
 *         description: Erros de validação
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      contatoPassivo,
      tipoContato,
      tipo,
      motivo,
      descricao,
      veiculo,
      status,
    } = req.body;

    // validações básicas
    const errors: string[] = [];
    if (contatoPassivo === true && !tipoContato)
      errors.push("Se 'contatoPassivo' = true, informe 'tipoContato'.");
    if (!tipo) errors.push("O campo 'tipo' é obrigatório.");
    if (!motivo) errors.push("O campo 'motivo' é obrigatório.");
    if (!descricao) errors.push("O campo 'descricao' é obrigatório.");
    if (!veiculo) errors.push("O campo 'veiculo' é obrigatório.");

    if (errors.length > 0) {
      return res.status(400).json({ erros: errors });
    }

    const ticket = await prisma.ticket.update({
      where: { id: Number(id) },
      data: {
        contatoPassivo,
        tipoContato: contatoPassivo ? tipoContato : null,
        tipo,
        motivo,
        descricao,
        veiculo,
        status,
      },
    });

    return res.status(200).json({
      message: "Ticket atualizado com sucesso",
      ticket,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      // erro de registro não encontrado
      return res.status(404).json({ error: "Ticket não encontrado" });
    }
    console.error(err);
    return res.status(500).json({ error: "Erro ao atualizar ticket" });
  }
});

/**
 * @swagger
 * /api/tickets/{id}:
 *   delete:
 *     summary: Exclui um ticket
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket excluído com sucesso
 *       404:
 *         description: Ticket não encontrado
 */
router.delete("/:id", roleMiddleware(["ADMIN"]), async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.ticket.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Ticket excluído com sucesso" });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Ticket não encontrado" });
    }
    console.error(err);
    return res.status(500).json({ error: "Erro ao excluir ticket" });
  }
});

export default router;