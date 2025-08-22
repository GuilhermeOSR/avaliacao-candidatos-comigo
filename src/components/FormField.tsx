import { useState } from 'react';
import ArrowRight from '../assets/icons/arrowRight.png';
import ArrowLeft from '../assets/icons/arrowLeft.png';
import SearchIcon from '../assets/icons/Search.png';


type FormFieldProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const FormField = ({ currentStep, setCurrentStep }: FormFieldProps) => {
    {/* Contato */}
    const [contato, setContato] = useState<"sim" | "nao" | "">("");
    const [tipoContato, setTipoContato] = useState("");
    {/* Ticket */}
    const [ticket, setTicket] = useState<
    "operacional" | "suporte" | "relacionamento" | "vendas" | ""
    >("");
    {/* Reason */}
    const [ticketReason, setTicketReason] = useState<
    "motivo1" | "motivo2" | "motivo3" | ""
    >("");

    const [descricao, setDescricao] = useState("");
    const [veiculo, setVeiculo] = useState("");

     // Função de submit
  const handleSubmit = async () => {
    const payload = {
      contatoPassivo: contato === "sim",
      tipoContato: contato === "sim" ? tipoContato : null,
      tipo: ticket,
      motivo: ticketReason,
      descricao,
      veiculo,
    };

    try {
      const response = await fetch("http://localhost:3333/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Ticket criado com sucesso!");
        console.log(data);
      } else {
        alert("❌ Erro: " + (data.error || JSON.stringify(data.erros)));
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="mt-6">
      {currentStep === 0 && (
        <div>
          <h4 className="text-black text-base font-medium mb-4">
            Houve contato passivo?
          </h4>

          {/* Radios estilizados */}
          <div className="flex gap-2 mb-4">
            {/* Radio SIM */}
           <label className="flex-1 relative cursor-pointer">
            <input
                type="radio"
                name="contato"
                value="sim"
                checked={contato === "sim"}
                onChange={(e) => setContato(e.target.value as "sim")}
                className="hidden"
            />
            <div
                className={`border rounded-lg p-4 transition-colors ${
                contato === "sim"
                    ? "border-blue-500 bg-blue-50 text-[#1169B0]"
                    : "border-[#91C9FF] text-gray-700"
                }`}
            >
                <div className="flex items-start gap-2">
                {/* Bolinha custom */}
                <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
                    contato === "sim"
                        ? "border-[#003C7D] bg-[#003C7D]"
                        : "border-gray-400"
                    }`}
                >
                    {contato === "sim" && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    )}
                </span>

                {/* Título + Subtítulo em coluna */}
                <div className="flex flex-col">
                    <span
                    className={`font-medium text-sm ${
                        contato === "sim" ? "text-[#003C7D]" : "text-gray-800"
                    }`}
                    >
                    Sim
                    </span>
                    <span
                    className={`font-normal text-sm ${
                        contato === "sim" ? "text-[#003C7D]" : "text-gray-500"
                    }`}
                    >
                    O cliente entrou em contato
                    </span>
                </div>
                </div>
            </div>
            </label>

            {/* Radio NÃO */}
        <label className="flex-1 relative cursor-pointer">
            <input
                type="radio"
                name="contato"
                value="nao"
                checked={contato === "nao"}
                onChange={(e) => setContato(e.target.value as "nao")}
                className="hidden"
            />
            <div
                className={`border rounded-lg p-4 transition-colors ${
                contato === "nao"
                    ? "border-blue-500 bg-blue-50 text-[#1169B0]"
                    : "border-[#91C9FF] text-gray-700"
                }`}
            >
                <div className="flex items-start gap-2">
                {/* Bolinha custom */}
                <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
                    contato === "nao"
                        ? "border-[#003C7D] bg-[#003C7D]"
                        : "border-gray-400"
                    }`}
                >
                    {contato === "nao" && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    )}
                </span>

                {/* Título + Subtítulo em coluna */}
                <div className="flex flex-col">
                    <span
                    className={`font-medium text-sm ${
                        contato === "nao" ? "text-[#003C7D]" : "text-gray-800"
                    }`}
                    >
                    Não
                    </span>
                    <span
                    className={`font-normal text-sm ${
                        contato === "nao" ? "text-[#003C7D]" : "text-gray-500"
                    }`}
                    >
                    Contato ainda será feito
                    </span>
                </div>
                </div>
            </div>
        </label>
          </div>

          {/* Select só aparece se SIM */}
          {contato === "sim" && (
            <select className="w-full border border-gray-300 rounded-md p-3 text-gray-700 mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={tipoContato}
            onChange={(e) => setTipoContato(e.target.value)}
            >
              <option value="">Tipo de contato</option>
              <option value="telefone">Telefone</option>
              <option value="email">E-mail</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          )}

          {/* Botão */}
          <div className="flex justify-end">
            <button className="bg-[#1169B0] hover:bg-[#1169B0] text-white font-medium px-6 py-2 rounded-md flex items-center gap-2"
              type="button"
              onClick={() => setCurrentStep(1)}
            >
                Avançar
                <img src={ArrowRight} alt="Seta" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div>
          <h4 className="text-black text-sm font-medium mb-2">
            Qual o intuito do ticket?
          </h4>
          <h5 className="text-black text-sm font-light">Sub título</h5>
          <div className="grid grid-cols-2  ">
            {/* Radio Operacional */}
            <label className="flex flex-col relative cursor-pointer">
            <div className="flex items-start gap-2">
                <input
                    type="radio"
                    name="ticket"
                    value="operacional"
                    checked={ticket === "operacional"}
                    onChange={(e) =>
                    setTicket(ticket === e.target.value ? "" : (e.target.value as typeof ticket))
                    }
                    className="hidden"
                />
                <div
                    className={`rounded-lg p-4 transition-colors ${
                    ticket === "operacional"
                        ? "text-gray-700"
                        : "text-gray-700"
                    }`}
                >
                    <div className="flex items-start gap-2">
                    {/* bolinha */}
                    <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
                        ticket === "operacional"
                            ? "border-[#003C7D] bg-[#003C7D]"
                            : "border-gray-400"
                        }`}
                    >
                        {ticket === "operacional" && (
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        )}
                    </span>

                    {/* textos em coluna */}
                    <div className="flex flex-col">
                        <span
                        className={`font-medium text-sm ${
                            ticket === "operacional" ? "text-[#003C7D]" : ""
                        }`}
                        >
                        Operacional
                        </span>
                        <span className="font-normal text-sm">
                        Sub título
                        </span>
                    </div>
                    </div>
                </div>
            </div>
            </label>

            {/* Radio Suporte */}
            <label className="flex-1 relative cursor-pointer">
                <input
                    type="radio"
                    name="ticket"
                    value="suporte"
                    checked={ticket === "suporte"}
                    onChange={(e) =>
                    setTicket(ticket === e.target.value ? "" : (e.target.value as typeof ticket))
                    }
                    className="hidden"
                />
                <div
                    className={`rounded-lg p-4 transition-colors ${
                    ticket === "suporte"
                        ? "text-gray-700"
                        : "text-gray-700"
                    }`}
                >
                    <div className="flex items-start gap-2">
                    {/* bolinha */}
                    <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
                        ticket === "suporte"
                            ? "border-[#003C7D] bg-[#003C7D]"
                            : "border-gray-400"
                        }`}
                    >
                        {ticket === "suporte" && (
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        )}
                    </span>

                    {/* textos em coluna */}
                    <div className="flex flex-col">
                        <span
                        className={`font-medium text-sm ${
                            ticket === "suporte" ? "text-[#003C7D]" : ""
                        }`}
                        >
                        Suporte
                        </span>
                        <span className="font-normal text-sm">
                        Sub título
                        </span>
                    </div>
                    </div>
                </div>
            </label>

                        {/* Relacionamento */}
            <label className="flex-1 relative cursor-pointer">
                <input
                    type="radio"
                    name="ticket"
                    value="relacionamento"
                    checked={ticket === "relacionamento"}
                    onChange={(e) =>
                    setTicket(ticket === e.target.value ? "" : (e.target.value as typeof ticket))
                    }
                    className="hidden"
                />
                <div
                    className={`rounded-lg p-4 transition-colors ${
                    ticket === "relacionamento"
                        ? "text-gray-700"
                        : "text-gray-700"
                    }`}
                >
                    <div className="flex items-start gap-2">
                    {/* bolinha */}
                    <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
                        ticket === "relacionamento"
                            ? "border-[#003C7D] bg-[#003C7D]"
                            : "border-gray-400"
                        }`}
                    >
                        {ticket === "relacionamento" && (
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        )}
                    </span>

                    {/* textos em coluna */}
                    <div className="flex flex-col">
                        <span
                        className={`font-medium text-sm ${
                            ticket === "relacionamento" ? "text-[#003C7D]" : ""
                        }`}
                        >
                        Relacionamento
                        </span>
                        <span className="font-normal text-sm">
                        Sub título
                        </span>
                    </div>
                    </div>
                </div>
            </label>

                        {/* Radio Vendas */}
            <label className="flex-1 relative cursor-pointer">
                <input
                    type="radio"
                    name="ticket"
                    value="vendas"
                    checked={ticket === "vendas"}
                    onChange={(e) =>
                    setTicket(ticket === e.target.value ? "" : (e.target.value as typeof ticket))
                    }
                    className="hidden"
                />
                <div
                    className={`rounded-lg p-4 transition-colors ${
                    contato === "nao"
                        ? "text-gray-700"
                        : "text-gray-700"
                    }`}
                >
                    <div className="flex items-start gap-2">
                    {/* bolinha */}
                    <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
                        ticket === "vendas"
                            ? "border-[#003C7D] bg-[#003C7D]"
                            : "border-gray-400"
                        }`}
                    >
                        {ticket === "vendas" && (
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        )}
                    </span>

                    {/* textos em coluna */}
                    <div className="flex flex-col">
                        <span
                        className={`font-medium text-sm ${
                            ticket === "vendas" ? "text-[#003C7D]" : ""
                        }`}
                        >
                        Vendas
                        </span>
                        <span className="font-normal text-sm">
                        Sub título
                        </span>
                    </div>
                    </div>      
                </div>
            </label>
          </div>
           {/*Input para veiculo(s)} */}
            <div className="relative">
                <select className="w-full border border-gray-300 rounded-md p-3 pr-10 text-gray-700 mb-6 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none"
                value={veiculo}
                onChange={(e) => setVeiculo(e.target.value)}
                >
                    <option value="veiculo 0">Veiculo(s)</option>
                    <option value="veiculo 1">Veiculo 1</option>
                    <option value="veiculo 2">Veiculo 2</option>
                    <option value="veiculo 3">Veiculo 3</option>
                </select>
                <svg className="w-5 h-5 absolute right-4 top-1/3 -translate-y-2/4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {/* Botões */}
            <div className="flex justify-between">
            {/* Voltar */}
            <button className="backButton text-white border border-[#1169B0] text-[#1169B0] font-medium px-6 py-2 rounded-md flex items-center gap-2 "
              type="button"
              onClick={() => setCurrentStep(0)}
            >
                <img src={ArrowLeft}  alt="Seta" className="w-4 h-4" />
                Voltar
            </button>

            {/* Avançar */}
            <button className="bg-[#1169B0] hover:bg-[#1169B0] text-white font-medium px-6 py-2 rounded-md flex items-center gap-2 "
            type="button"
            onClick={() => setCurrentStep(2)}
            >
                Avançar
                <img src={ArrowRight} alt="Seta" className="w-4 h-4" />
            </button>
            </div>
        </div>
      )}

      {currentStep === 2 && (
  <div className="space-y-4">
    {/* Título */}
    <div>
      <h4 className="text-black text-sm font-medium">
        Qual o motivo desse ticket?
      </h4>
      <h5 className="text-black text-sm font-light">Sub título</h5>
    </div>

    {/* Campo de busca */}
    <div className="relative">
      <input
        type="text"
        placeholder="Pesquisar"
        className="w-full text-black border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#1169B0]"
      />
       <img
    src={SearchIcon}
    alt="Pesquisar"
    className="absolute right-3 top-2.5 w-4 h-4 pointer-events-none"
  />
    </div>

<div className="space-y-2 bg-gray-50">
  {["motivo1", "motivo2", "motivo3"].map((motivo) => (
    <label
      key={motivo}
      className="flex items-start gap-2 border rounded-md px-4 py-2 cursor-pointer transition"
    >
      {/* Escondo o radio nativo */}
      <input
        type="radio"
        name="motivo"
        value={motivo}
        checked={ticketReason === motivo}
        onChange={(e) =>
          setTicketReason(e.target.value as "motivo1" | "motivo2" | "motivo3")
        }
        className="hidden"
      />

      {/* Radio customizado */}
      <span
        className={`w-5 h-5 mt-1 rounded-full flex items-center justify-center
          ${
            ticketReason === motivo
              ? "border-4 border-[#1169B0] bg-[#1169B0]"
              : "border-2 border-gray-400 bg-white"
          }`}
      >
        {ticketReason === motivo && (
          <span className="w-2 h-2 rounded-full bg-white" />
        )}
      </span>

      <div>
        <span
          className={`block text-sm font-medium ${
            ticketReason === motivo ? "text-black" : "text-gray-600"
          }`}
        >
          {motivo === "motivo1"
            ? "Motivo 1"
            : motivo === "motivo2"
            ? "Motivo 2"
            : "Motivo 3"}
        </span>
        <span className="text-sm font-light text-gray-600">Sub título</span>
      </div>
    </label>
  ))}
</div>

{/* Prazo estimado */}
<div className="text-sm space-y-1">
  <div>
    <span className="font-medium text-[#1169B0]">
      Prazo estimado: 06/04/2024
    </span>{" "}
 
  </div>

  <p className="text-gray-600">
    Informe o cliente que a resolução deste motivo está prevista em{" "}
    <span className="font-medium">(3 dias úteis)</span>.
  </p>
</div>

    {/* Textarea */}
    <div>
      <textarea
        placeholder="Informe mais detalhes sobre o ticket"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        className="w-full text-black border-2 border-gray-200 rounded-md px-3 py-2 text-sm resize-none h-24 focus:outline-none focus:ring-1 focus:ring-[#1169B0]"

      />
    </div>

    {/* Botões */}
    <div className="flex justify-between">
        <button className="backButton text-white border border-[#1169B0] text-[#1169B0] font-medium px-6 py-2 rounded-md flex items-center gap-2 "
        type="button"
        onClick={() => setCurrentStep(1)}
        
        >
            <img src={ArrowLeft}  alt="Seta" className="w-4 h-4" />
            Voltar
        </button>
      <button className="bg-[#1169B0] hover:bg-[#0f5a95] text-white px-6 py-2 rounded-md text-sm flex items-center gap-2"
      type="button"
      onClick={handleSubmit}
      >
        Cadastrar   <span className="ml-1">✔</span>
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default FormField;