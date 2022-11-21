import './Navbar.scss'
import {FaSearch, FaShoppingCart} from 'react-icons/fa'

const Navbar = ()=>{
    return(
        <header>
            <div className='header_top'>
                <h1>Marca</h1>
                <div className='search_container'>
                    <div className='search'>
                        <input></input>
                        <FaSearch></FaSearch>
                    </div>
                </div>
                <div className='user_nav'>
                    <a>Cadastrar</a>
                    <a>Entrar</a>
                    <FaShoppingCart></FaShoppingCart>
                </div>
            </div>
            <div className='header_nav'>
                <nav>
                    <a>Vestidos</a>
                    <a>Calças</a>
                    <a>Blusas</a>
                    <a>Saias</a>
                    <a>Botas</a>
                </nav>
            </div>
        </header>
    )
}

export default Navbar