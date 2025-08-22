import { useState } from "react";
import Header from '../components/Header';
import Modal from '../components/Modal';
import SearchBar from '../components/SearchBar';
import TableList from '../components/TableList';

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <div >
        <Header />
        <div className="p-6">
         <div className="mb-4">
    <span className="text-sm font-medium text-gray-500">
      Home - Atendimento ao cliente
    </span>
    <hr className="mt-2 border-gray-200" />
  </div>

        {/* Mini Header - Botão + Search */}
        <div className="flex items-center gap-4 mb-6">
          <button
            className="px-4 py-2 rounded-md bg-[#1169B0] text-white font-medium hover:bg-[#0e5591] transition"
            onClick={() => setIsOpen(true)}
          >
            + Abrir Ticket
          </button>

          <div className="flex-1 max-w-md">
            <SearchBar />
          </div>
        </div>


        <div className=" rounded-md p-4 text-gray-500">
           <TableList />
        </div>
      </div>
        {/* Renderiza modal só se isOpen for true */}
        {isOpen && <Modal onClose={() => setIsOpen(false)} />}
        
    </div>
    )
}

export default Dashboard;