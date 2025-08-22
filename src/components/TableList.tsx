import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {useAuth} from "../hooks/useAuth";


type Ticket = {
  id: number;
  tipo: string;
  motivo: string;
  descricao: string;
  cliente: string;
  veiculo: string;
  dataAbertura: string;
  prazo: string;
  status: string;
};

type TableListProps = {
  setTicketToEdit: (t: Ticket | null) => void;
  tickets: Ticket[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  totalPages: number;
  setCurrentStep: (step: number) => void;
};


const TableList = ({setTicketToEdit, setCurrentStep}: TableListProps) => {
  const {usuario} = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); 
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTickets = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3333/api/tickets?page=${page}&limit=${limit}`
      );
      const data = await res.json();

      setTickets(data.tickets);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (error) {
      console.error("Erro ao buscar tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTicket = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este ticket?")) return;

    try {
      const token = localStorage.getItem("token")
      await fetch(`http://localhost:3333/api/tickets/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // <-- manda o token
      },
      });

      // Recarrega a lista após excluir
      fetchTickets(page);
    } catch (error) {
      console.error("Erro ao deletar ticket:", error);
    }
  };

  useEffect(() => {
    fetchTickets(page);
  }, [page]);

  if (loading) return <p>Carregando tickets...</p>;

  return (
    <div className="overflow-x-auto rounded-md ">
      <table className="w-full text-sm text-left text-gray-700 border-separate border-spacing-y-3 ">
        <thead className="bg-transparent text-gray-600 text-xs uppercase ">
          <tr>
            <th className="px-4 py-3 ">ID</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Motivo</th>
            <th className="px-4 py-3">Descrição</th>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Veículo</th>
            <th className="px-4 py-3">Data da abertura</th>
            <th className="px-4 py-3">Prazo</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr
              key={t.id}
              className="bg-[#FFFFFF] hover:bg-gray-200 transition-colors "
            >
              <td className="px-4 py-2 rounded-l-[6px]">{t.id}</td>
              <td className="px-4 py-2">{t.tipo}</td>
              <td className="px-4 py-2">{t.motivo}</td>
              <td className="px-4 py-2">{t.descricao}</td>
              <td className="px-4 py-2">Cliente {t.id}</td>
              <td className="px-4 py-2">{t.veiculo}</td>
              <td className="px-4 py-2">
                {new Date(t.dataAbertura).toLocaleDateString("pt-BR")}
              </td>
              <td className="px-4 py-2">
                {new Date(t.prazo).toLocaleDateString("pt-BR")}
              </td>
              <td className="px-4 py-2 ">{t.status}</td>
              <td className="px-4 py-2 gap-2 rounded-r-[6px] text-center">
                <button className="actionButtons text-blue-600 hover:text-blue-800"
                onClick={() => {
                  setTicketToEdit(t); // passa ticket selecionado
                  setCurrentStep(0);  // abre formulário na etapa inicial
                }}
                >
                  <Pencil size={18} />
                </button>
                {usuario?.cargo !== "ATENDENTE" && (
                <button className="actionButtons text-red-600 hover:text-red-800"
                onClick={() => deleteTicket(t.id)}>
                  <Trash2 size={18} />
                </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer com paginação */}
      <div className="relative flex justify-center items-center py-3 text-sm text-gray-500">
        <div className="absolute left-0 flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="actionButtons px-2 py-1 rounded text-black disabled:opacity-40"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "text-white"
                  : "actionButtons text-[#1169B0] hover:text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="actionButtons px-2 py-1 rounded text-black disabled:opacity-40"
          >
            &gt;
          </button>
        </div>

        <span>
          Exibindo {tickets.length} de {total} registros
        </span>
      </div>
    </div>
  );
};

export default TableList;
