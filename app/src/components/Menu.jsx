import IconButton from './Buttons/IconButton'
import IconButtonMenuPanel from './Buttons/IconButtonMenuPanel'
import './Menu.css'
// import '../index.css'

function Menu({ products, onListProductsMen,onListProductsWomen,onListProductsKids, onListProducts,onFavouritesProducts }) {

    return <div className='container list' >
        {/* <IconButton addClass="close" text="close" onClick={handleCloseClick} /> */}
        {sessionStorage.token?<IconButtonMenuPanel addClass="chevron_right" products={products} text="chevron_right" nameIcon="Favourites" onClick={onFavouritesProducts} />:null}
        <IconButtonMenuPanel addClass="chevron_right" products={products} text="chevron_right" nameIcon="All Products" onClick={onListProducts} />
        <IconButtonMenuPanel addClass="chevron_right" products={products} text="chevron_right" nameIcon="Men" onClick={onListProductsMen} />
        <IconButtonMenuPanel addClass="chevron_right" products={products} text="chevron_right" nameIcon="Women" onClick={onListProductsWomen} />
        <IconButtonMenuPanel addClass="chevron_right" products={products} text="chevron_right" nameIcon="Kids" onClick={onListProductsKids}/>
        
    </div>
}

export default Menu