// import './'
// import Loggito from '../utils/Loggito'
import './ContMain.css'
import './ProductsList.css'
import IconButton from './Buttons/IconButton'

function ProductsListKids({ products, onProductClick, onCloseClick }) {
    const handleCloseClick = () => {
        onCloseClick()
    }
    const handleProductClick = (product) => {
        onProductClick(product.id)
    }

    const _products = products
    return <section className="container-section products cat ">

        <div className="container-products">
            <div className="contClose">
                <IconButton addClass="close" text="close" onClick={handleCloseClick} />
            </div>
            <div className="item--products one">
                <h1>KIDS</h1>
            </div>

            <div className="container-productsList">
                {_products && _products.filter(_product => _product.categ === "kids"
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

export default ProductsListKids