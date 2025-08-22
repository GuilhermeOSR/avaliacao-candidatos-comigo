// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  cargo: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer xxx

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const secret = process.env.JWT_SECRET || "segredo_super_secreto";
    const decoded = jwt.verify(token, secret) as JwtPayload;

    (req as any).usuario = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};