
import './ContMain.css'
import './ProductsList.css'
import IconButton from './Buttons/IconButton'

//TODO FALTA CAMBIAR CODIGO
function ProductsFavourites({ products,onProductClick,onCloseClick}) {
    const handleCloseClick = () => {
        onCloseClick()
    }
    const handleProductClick=(product)=>{
        onProductClick(product.id)
    }
    
    return <section className="container-section products cat">
    <div className="container-products">
    <IconButton addClass="close" text="close" onClick={handleCloseClick} />
        <div className="item--products one">
            <h1>PRODUCTS</h1>
        </div>
        
        {products && products.map(product => {
            //TODO debugger
        return <div className="item--products" key={product.id} onClick={()=>handleProductClick(product)}>
            <div className="featurette-icon">
                <img className='featurette-icon--img products' src={product.img} alt="" />
            </div>
            <p>${product.price}</p>
            <h3>{product.name}</h3>
        </div>})}
    </div>

</section>
}

export default ProductsFavourites