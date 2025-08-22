import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const usuario = (req as any).usuario;

    if (!usuario) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    if (!rolesPermitidos.includes(usuario.cargo.toUpperCase())) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    next();
  };
};