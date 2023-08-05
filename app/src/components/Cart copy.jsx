import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import retrieveProductExtend from "../logic/retrieveProductExtend";
import withContext from '../utils/withContext'
import './ProductView.css'
import './Carousel.css'
import './Cart.css'
// import './ProductsList.css'
import IconButton from './Buttons/IconButton'

//TODO mejorar
function Cart({ cartItems, context: { handleFeedback } }) {

    // const productId= cartItems
    const [productToDisplay, setProduct] = useState()
    // const productId=cartItems
    
    const productId = cartItems.map(items => {
         return items.product
    })
    const productIdString=productId.toString() 

    debugger


    // useEffect(() => {
    //     try {
    //         // addItemToCart(sessionStorage.token, productToDisplayId, productToDisplayPrice, productToDisplayQty, error => {
    //     if (error) {
    //         handleFeedback({ message: error.message, level: 'error' })
    //         console.log("error adentro")
    //         return
    //     }
    //     handleFeedback({ message: "agregado", level: 'info' })

    //    
    // })

    //     } catch (error) {
    //         handleFeedback({ message: error.message, level: 'error' })
    //     }
    // }, [])
   
//    =======================================================

    useEffect(() => {
        try {
            
            retrieveProductExtend(productIdString, (error, product) => {
                if (error) handleFeedback({ message: error.message, level: 'error' })

                setProduct(product)

            })

        } catch (error) {
            handleFeedback({ message: error.message, level: 'error' })
            console.log(error)
        }
    }, [])
    
    
    const handleReturnClick = () => {
        window.history.go(-1)
    }

    return <>{<div className="container-section--product cat2" >
        <div className="container-product ">
            <div className="item--products one">
                <IconButton addClass="close" text="close" onClick={handleReturnClick} />
            </div>
            <div className='carTittle'>
                <h2 >CART</h2>
            </div>

            {/* <div className="container-title">
                <div className="nameGener">
                    <h1>{productToDisplay.name} ({productToDisplay.categ})</h1>

                </div>
                <div className="container-price">
                    <div className="product-price">
                        $ {productToDisplay.price}
                    </div>
                </div>
            </div> */}
            {/* <div className="item-product">
                <div className="content--item" key={index}  >
                    <img className='featurette-img--products' src={image} alt="" />
                </div>
            </div> */}
            <section className="cartItemsGroup">
                <div>
                    {cartItems && cartItems.map(items => {
                        return <div className="cart--Items" key={items.id}>
                            
                            <div>{items.product.name}</div>
                            <div>{items.price}</div>
                            <div className="container-qty">
                                <h3>Cantidad</h3>
                                <select type="number" defaultValue="1" />
                            </div>

                        </div>
                    })}
                </div>
            </section>
                <div>==============================================</div>
            <div className="container-pay">
                <p>Paga en 3 plazos sin intereses de 20,00€.
                    <span className="logo">Klarna</span>
                    .
                    <button className="link">Más información</button>
                </p>

                <div className="container-carPrice">
                    <h3>Precio</h3>
                    <p>$ precio*cantida</p>
                </div>
                <div className="container-carPrice">
                    <h3>Total</h3>
                    <p>$ precio++</p>
                </div>
            </div>

        </div>
    </div>}
    </>
}

export default withContext(Cart)