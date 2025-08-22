import Logo from '../assets/logo.png';
import Reload from '../assets/icons/reload.png'
import Home from '../assets/icons/Home.png'
import Moon from '../assets/icons/Moon.png'
import Person from '../assets/icons/Person.png'

const Header = () => {
    return (
    <div className="flex items-center justify-between h-[100px] px-8 bg-[#1169B0]">
        <img src={Logo} alt="Logo" className="h-10 w-auto" />

            <div className="text-white text-lg font-semibold flex-1 text-center">
                <h2>Atendimento ao cliente</h2>
            </div>
            <div className="flex items-center gap-2 text-white py-2">
                <button className='icon-buttons'><img src={Reload} alt="Reload" className="w-4 h-4 cursor-pointer" /></button>
                <div className="text-white">|</div>
                <button className='icon-buttons'><img src={Home} alt="Home" className="w-4 h-4 cursor-pointer"/></button>
                <button className='icon-buttons'><img src={Moon} alt="Moon" className="w-4 h-4 cursor-pointer"/></button>
                <button className='icon-buttons'><img src={Person} alt="Person" className="w-4 h-4 cursor-pointer"/></button>
            </div>

    </div>
    )
}

export default Header;