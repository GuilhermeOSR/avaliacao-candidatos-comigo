import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";


interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // ["ADMIN"], ["ATENDENTE"]  
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { token, usuario } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

 if (allowedRoles && usuario && !allowedRoles.includes(usuario.cargo.toUpperCase())) {
  return <Navigate to="/" replace />;
} {

  }

  return <>{children}</>;
};

export default PrivateRoute;