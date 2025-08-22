// components/TableList.tsx
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

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

const mockData: Ticket[] = [
  {
    id: 110,
    tipo: "Suporte",
    motivo: "Incidente",
    descricao: "Veículos sem comunicação",
    cliente: "Cliente 1",
    veiculo: "Veículo 2, Veículo 6",
    dataAbertura: "02/07/2023",
    prazo: "05/07/2023",
    status: "À fazer",
  },
  {
    id: 111,
    tipo: "Vendas",
    motivo: "Upgrade",
    descricao: "Upgrade veículo 2",
    cliente: "Cliente 2",
    veiculo: "Veículo 2",
    dataAbertura: "01/07/2023",
    prazo: "05/07/2023",
    status: "Em andamento",
  },
  {
    id: 112,
    tipo: "Operacional",
    motivo: "Teste de rastreador",
    descricao: "Testes de instalação - OS 002",
    cliente: "Cliente 1",
    veiculo: "Veículo 3",
    dataAbertura: "01/07/2023",
    prazo: "05/07/2023",
    status: "Concluído",
  },
];

const TableList = () => {
  const [tickets] = useState<Ticket[]>(mockData);

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
              <td className="px-4 py-2">{t.cliente}</td>
              <td className="px-4 py-2">{t.veiculo}</td>
              <td className="px-4 py-2">{t.dataAbertura}</td>
              <td className="px-4 py-2">{t.prazo}</td>
              <td className="px-4 py-2 ">{t.status}</td>
              <td className="px-4 py-2 gap-2 rounded-r-[6px] text-center">
                <button className="actionButtons text-blue-600 hover:text-blue-800">
                  <Pencil size={18} />
                </button>
                <button className="actionButtons text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer com paginação */}
     <div className="relative flex justify-center items-center py-3 text-sm text-gray-500">

        <div className="absolute left-0 flex items-center gap-2">
            {/*Só aparece se tiver páginas anteriores*/}
            {/* <button className="actionButtons px-2 py-1 rounded text-black hover:bg-gray-200">&lt;</button> */}
            <button className="px-3 py-1 rounded text-white bg-[#1169B0]">1</button>
            <button className="actionButtons px-2 py-1 rounded text-[#1169B0] hover:text-black">2</button>
            <button className="actionButtons px-2 py-1 rounded text-black">&gt;</button>
        </div>


        <span>Exibindo {tickets.length} de {tickets.length} do total de {tickets.length}  registros</span>
    </div>
    </div>
  );
};

export default TableList;