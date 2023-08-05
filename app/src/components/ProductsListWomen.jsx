// import './'
// import Loggito from '../utils/Loggito'
import './ContMain.css'
import './ProductsList.css'
import IconButton from './Buttons/IconButton'

function ProductsListWomen({ products, onProductClick, onCloseClick }) {
    const handleCloseClick = () => {
        onCloseClick()
    }
    const handleProductClick = (product) => {
        onProductClick(product.id)
    }

    return <section className="container-section products cat ">

        <div className="container-products">
            <div className="contClose">
                <IconButton addClass="close" text="close" onClick={handleCloseClick} />
            </div>
            <div className="item--products one">
                <h1>WOMEN</h1>
            </div>

            <div className="container-productsList">
                {products && products.filter(_product => _product.categ === "women"
                ).map(product => <div className="item--products" key={product.id} onClick={() => handleProductClick(product)}>
                    <div className="featurette-icon">
                        <img className='featurette-icon--img products' src={product.img} alt="" />
                    </div>
                    <p>${product.price}</p>
                    <h3>{product.name}</h3>
                </div>)}
            </div>
        </div>

    </section>
}

export default ProductsListWomen