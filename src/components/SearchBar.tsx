import SearchIcon from '../assets/icons/Search.png'



const SearchBar = () => {
    return (
    <div>
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
    </div>

    )
}

export default SearchBar;