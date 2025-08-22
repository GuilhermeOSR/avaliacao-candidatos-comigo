import { useState, useEffect } from "react";
import Stepper from './Stepper'
import FormField from './FormField'
import CloseIcon from '../assets/icons/CloseIcon.png';

type ModalProps = {
  onClose: () => void;
  ticketToEdit: any; 
  setTicketToEdit: (ticket: any) => void;
  fetchTickets: (page: number) => void;
  page: number;
};

const Modal = ({onClose, ticketToEdit, fetchTickets, page}: ModalProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    
    setIsVisible(false);
    
    setTimeout(() => {
      onClose();
    }, 200); 
  };


    return (
        
    <div className="fixed inset-0 flex justify-end z-50 bg-black/30">
        {/* Botão de fechar no canto */}
        <button
          onClick={handleClose}
          className="closeButton absolute right-140 top-5 text-black hover:text-gray-700"
        >
          <img src={CloseIcon} alt="" />
        </button>

        <div
        className={`relative w-[540px] h-full bg-white shadow-xl p-6 transform transition-transform duration-300 ease-out
        ${isVisible ? "translate-x-0" : "translate-x-full"}`}
        >


        <h3 className="text-black text-xs font-regular mb-2 mt-2">
          {ticketToEdit ? "Formulário de Edição" : "Formulário de Cadastro"}
        </h3>

        <h2 className="text-black text-lg font-medium mb-12">
          {ticketToEdit
            ? `Ticket #${ticketToEdit.id}`
            : "Novo atendimento ao cliente"}
        </h2>

            
        <Stepper steps={["CONTATO", "TICKET", "MOTIVO", ]} currentStep={currentStep} />
        {/* Formulário dinâmico */}
        <FormField currentStep={currentStep} setCurrentStep={setCurrentStep} 
        ticketToEdit={ticketToEdit}
        
        onSuccess={() => fetchTickets(page)}
        />

        
        </div>

    </div>
    )
}

export default Modal;