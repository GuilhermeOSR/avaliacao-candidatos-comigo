import { useEffect, useState } from "react";
import Header from "../components/Header";
import {Trash2 } from "lucide-react";
import Link from '../assets/icons/Link.png';

type User = {
  id: number;
  nome: string;
  email: string;
  cargo: string; // ou "role"
};

const cargosDisponiveis = ["Admin", "Atendente"];

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca usuários do backend
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3333/api/usuarios");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Atualiza cargo
  const handleChangeCargo = async (id: number, novoCargo: string) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3333/api/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({ cargo: novoCargo }),
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, cargo: novoCargo } : u))
      );
      alert("✅ Cargo atualizado com sucesso!")
    } catch (err) {
      console.error("❌ Erro ao atualizar cargo:", err);
    }
  };

  // Excluir usuário
  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3333/api/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`, 
        },
      });

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
    }
  };

  return (
    <div>
      <Header />

      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center text-sm font-medium text-gray-700 gap-2">
            <img src={Link} alt="" className="w-4 h-4" />
            <span>&gt; Usuários e permissões</span>
            <span>&gt;</span>
          </div>
          <hr className="mt-2 border-gray-200" />
        </div>
        <h2 className="text-xl font-semibold mb-4 text-black">Usuários Cadastrados</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table className="text-black w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 p-2">Nome</th>
                <th className="border border-gray-200 p-2">Email</th>
                <th className="border border-gray-200 p-2">Cargo</th>
                <th className="border border-gray-200 p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="text-black border border-gray-200 p-2">{user.nome}</td>
                  <td className="border border-gray-200 p-2">{user.email}</td>
                  <td className="border border-gray-200 p-2">
                    <select
                      value={user.cargo}
                      onChange={(e) =>
                        handleChangeCargo(user.id, e.target.value)
                      }
                      className="border border-gray-400 cursor-pointer p-1 rounded"
                    >
                      {cargosDisponiveis.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border border-gray-200 p-2">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="actionButtons text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default Users;