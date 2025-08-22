import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import Logo from '../assets/logo.png';
import Reload from '../assets/icons/reload.png'
import Home from '../assets/icons/Home.png'
import Moon from '../assets/icons/Moon.png'
import Person from '../assets/icons/Person.png'


const Header = () => {
    const {usuario} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        navigate("/login");
    };
    return (
    <div className="flex items-center justify-between h-[100px] px-8 bg-[#1169B0]">
        <img src={Logo} alt="Logo" className="h-10 w-auto" />

        <div className="text-white font-semibold flex-1 text-center">
            <div className="flex items-center justify-center gap-6">
                <Link 
                to="/" 
                className="text-white text-lg hover:underline"
                >
                Atendimento ao cliente
                </Link>
                {/* Só exibe se não for atendente */}
                {usuario?.cargo !== "ATENDENTE" && (
                    <Link 
                    to="/users" 
                    className="text-white text-base hover:underline"
                    >
                    Usuários e permissões
                    </Link>
                )}
            </div>
        </div>

            <div className="flex items-center gap-2 text-white py-2">
                <button className='icon-buttons'><img src={Reload} alt="Reload" className="w-4 h-4 cursor-pointer" /></button>
                <div className="h-6 border-r border-white/50 mx-2"></div> {/* divisor */}
                <button className='icon-buttons'><img src={Home} alt="Home" className="w-4 h-4 cursor-pointer"/></button>
                <button className='icon-buttons'><img src={Moon} alt="Moon" className="w-4 h-4 cursor-pointer"/></button>
                <button className='icon-buttons'
                onClick={handleLogout}
                ><img src={Person} alt="Person" className="w-4 h-4 cursor-pointer"/></button>
            </div>

    </div>
    )
}

export default Header;