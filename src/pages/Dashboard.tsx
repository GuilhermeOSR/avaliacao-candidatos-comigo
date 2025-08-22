import { useState, useEffect } from "react";
import Header from '../components/Header';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import TableList from '../components/TableList';
import Link from '../assets/icons/Link.png';



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

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ticketToEdit, setTicketToEdit] = useState<Ticket | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [, setCurrentStep] = useState(0);


  // Função para buscar tickets
  const fetchTickets = async (page: number) => {
    try {
      const res = await fetch(`http://localhost:3333/api/tickets?page=${page}&limit=5`);
      const data = await res.json();
      setTickets(data.tickets);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Erro ao buscar tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets(page);
  }, [page]);

  return (
    <div>
      <Header />
      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center text-sm font-medium text-gray-700 gap-2">
            <img src={Link} alt="" className="w-4 h-4" />
            <span>&gt; Atendimento ao cliente</span>
            <span>&gt;</span>
          </div>
          <hr className="mt-2 border-gray-200" />
        </div>
        
        {/* Mini Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            className="px-4 py-2 rounded-md bg-[#1169B0] text-white font-medium hover:bg-[#0e5591] transition"
            onClick={() => {
              setTicketToEdit(null); // reset para novo ticket
              setIsOpen(true);
            }}
          >
            + Abrir Ticket
          </button>

          <div className="flex-1 max-w-md">
            <SearchBar />
          </div>
        </div>

        <div className="rounded-md p-4 text-gray-500">
          <TableList
            tickets={tickets}
            setTicketToEdit={(t) => {
              setTicketToEdit(t);
              setIsOpen(true);
            }}
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            setCurrentStep={setCurrentStep}

            
       
          />
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          ticketToEdit={ticketToEdit}
          setTicketToEdit={setTicketToEdit}
          fetchTickets={fetchTickets}
          
          page={page}
        />
      )}
    </div>
  );
};

export default Dashboard;