import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gestão de usuários do sistema
 */




/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Faz login de usuário e retorna um JWT
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token de autenticação
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *               cargo:
 *                 type: string
 *                 enum: [Admin, Atendente]
 *             required:
 *               - login
 *               - password
 *               - cargo
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erros de validação
 */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.password);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: usuario.id, cargo: usuario.cargo },
      process.env.JWT_SECRET || "segredo_super_secreto",
      { expiresIn: "1h" }
    );

    return res.json({
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo
    }
  });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no login" });
  }
});


/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: { id: true, nome: true, email: true, login: true, cargo: true },
    });
    return res.status(200).json(usuarios);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao listar usuários" });
  }
});


router.use(authMiddleware);
router.use(roleMiddleware(["ADMIN"]));


router.post("/", async (req, res) => {
  try {
    const { nome, email, login, password, cargo } = req.body;

    const errors: string[] = [];

    if (!login) errors.push("O campo 'login' é obrigatório.");
    if (!password) errors.push("O campo 'password' é obrigatório.");
    if (!cargo) errors.push("O campo 'cargo' é obrigatório.");
    else if (!["Admin", "Atendente"].includes(cargo))
      errors.push("O campo 'cargo' deve ser 'Admin' ou 'Atendente'.");

    if (errors.length > 0) {
      return res.status(400).json({ erros: errors });
    }

    // verificar se já existe login/email
    const existe = await prisma.usuario.findFirst({
      where: { OR: [{ login }, { email }] },
    });
    if (existe) {
      return res
        .status(400)
        .json({ error: "Já existe um usuário com este login ou email." });
    }

    // criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        login,
        password: hashedPassword,
        cargo,
      },
    });

    return res.status(200).json({
      message: "Usuário criado com sucesso",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        login: usuario.login,
        cargo: usuario.cargo,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
});


/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      select: { id: true, nome: true, email: true, login: true, cargo: true },
    });

    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    return res.status(200).json(usuario);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

/**
 * @swagger
 * /api/usuarios/{id}/cargo:
 *   put:
 *     summary: Atualiza apenas o cargo do usuário
 *     tags: [Usuários]
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
 *               cargo:
 *                 type: string
 *                 enum: [Admin, Gerente, Operador]
 *     responses:
 *       200:
 *         description: Cargo atualizado com sucesso
 *       400:
 *         description: Cargo inválido ou ausente
 *       404:
 *         description: Usuário não encontrado
 */
// Atualizar apenas o cargo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, password, cargo } = req.body;

    const data: any = {};
    if (nome) data.nome = nome;
    if (email) data.email = email;
    if (cargo) {
      if (!["Admin", "Atendente"].includes(cargo)) {
        return res.status(400).json({ error: "Cargo inválido" });
      }
      data.cargo = cargo;
    }
    if (password) {
      data.password = await bcrypt.hash(password, 10);
    }

    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data,
    });

    return res.status(200).json({ message: "Usuário atualizado com sucesso", usuario });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Remove usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.usuario.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: "Usuário removido com sucesso" });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.status(500).json({ error: "Erro ao remover usuário" });
  }
});





export default router;