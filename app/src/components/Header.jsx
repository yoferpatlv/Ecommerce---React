import './Header.css'
import { useState } from 'react'
import IconButton from './Buttons/IconButton'
import withContext from '../utils/withContext'
import Menu from './Menu'

function Header({products,onUserClick,onListProducts,onCartClick, onListProductsMen,onListProductsWomen,onListProductsKids,onSearchClick,onFavouritesProducts}) {
    const [view, setView] = useState(null)
    const handleUserClick= () =>{
        onUserClick()
    }
    const handleSearchClick=()=>{
        onSearchClick()
    }
    const handleCloseClick=()=>{
        setView(null)
        // onCloseClick()
    }
    const handleCart=()=>{
        
        onCartClick()
    }

    const handleMenuClick=()=>{
        setView('menu')
        // onMenuClick()
    }

    return <header className="container Header">
        <div className="container-header">
            <div className="menu-button" >
                { view === null &&<IconButton addClass="btn-menu" text="menu" onClick={handleMenuClick}  />}
                { view === 'menu' &&<IconButton addClass="btn-menu" text="close" onClick={handleCloseClick}  />}
            </div>

            <a className="logo" href='' ><img className='img-logo' src="https://i.postimg.cc/ZY1nHGSz/logo-Luanna.png" alt="" /></a>
            <div className='header-buttons--right'>
            {<IconButton addClass="btn-header" text="person" onClick={handleUserClick}/>}
            {<IconButton addClass="btn-header" text="search" onClick={handleSearchClick}/>}
            {<IconButton addClass="btn-header shopping_bag" text="shopping_bag" onClick={handleCart} />}
            </div>

        </div>
        {view === "menu" &&<Menu onFavouritesProducts={onFavouritesProducts} onListProducts={onListProducts} onListProductsMen={onListProductsMen} onListProductsWomen={onListProductsWomen} onListProductsKids={onListProductsKids} products={products} />}
    </header>
}
export default withContext(Header)
