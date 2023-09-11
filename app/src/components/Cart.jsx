import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import retrieveProductExtend from "../logic/retrieveProductExtend";
import withContext from '../utils/withContext'
import updateCart from '../logic/updateCart'
import removeItemFromCart from '../logic/removeItemFromCart'
import './ProductView.css'
import './Carousel.css'
import './Cart.css'
// import './ProductsList.css'
import IconButton from './Buttons/IconButton'

//TODO mejorar
function Cart({onCloseClick, cartItems,onCartItemsUpdated, context: { handleFeedback } }) {

    const token = sessionStorage.token || localStorage.token;
    // Calcular el precio total del carrito sumando los totalPrice de cada elemento
    const totalPriceAll = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    const handleUpdateQty = (itemId, newQty) => {
        // Buscar el producto correspondiente al itemId en el estado local
        const productToUpdate = cartItems.find(item => item._id === itemId);
        const newPrice = productToUpdate.price; // Obtener el precio actual del producto
        
        if (newQty === 0) {
            // Eliminar el producto del carrito si la cantidad es 0
            removeItemFromCart(token, itemId, (error) => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' });
                } else {
                    // Eliminar el producto del estado local
                    const updatedItems = cartItems.filter(item => item._id !== itemId);
                    onCartItemsUpdated(updatedItems);
                }
            })
        } else {
            updateCart(token, itemId, newPrice ,newQty, (error) => {
                console.log(newQty)
                if (error) {
                    handleFeedback({ message: error.message, level: 'error' });
                } else {
                    // Si la actualización es exitosa, actualizamos el estado local
                    const updatedItems = cartItems.map(item =>
                        item._id === itemId ? { ...item, qty: newQty, totalPrice: item.price * newQty } : item
                    );
                    onCartItemsUpdated(updatedItems);
                }
            })
        }
    }


    // const handleReturnClick = () => {
    //     window.history.go(-1)
    // }

    // ===========================================================
    const handleQtyChange=(event,itemId)=>{
        const newQty = parseInt(event.target.value);
        console.log(typeof newQty)
        handleUpdateQty(itemId, newQty)
    }

    const handleOptions = () => {
        const options = [];
        options.push(<option key={0} value={0}>(Eliminar)</option>);
        for (let i = 1; i <= 10; i++) {
            options.push(<option key={i} value={i}>{i}</option>);
        }
        return options;
    };

    //TODO arreglar el select , no actualiza
    return <>{<div className="container-section--product cat2" >
        <div className="container-product ">
            <div className="item--products one">
                <IconButton addClass="close" text="close" onClick={onCloseClick} />
            </div>
            <div className='carTittle'>
                <h2 >CART</h2>
            </div>

            <section className="cartItemsGroup">
                <div>
                    {cartItems && cartItems.map((items, index) => {
                        return <div className="cart--Items" key={index}>
                            {/* TODO comparar ids para mostrar los que coinciden */}

                            <div>
                                <div>Nombre de Producto</div>

                                <div>{items.product}</div>
                                <div>{items.price}</div>

                                <div className="container-qty">
                                    <h3>Cantidad</h3>
                                    <select value={items.qty} onChange={(event)=>handleQtyChange(event,items._id)}>
                                        {handleOptions()}
                                    </select>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </section>
            <div className="linea"></div>
            <div className="container-pay">
                <p>Paga en 3 plazos sin intereses de 20,00€.
                    <span className="logo">Klarna</span>
                    .
                    <button className="link">Más información</button>
                </p>

            </div>
            <div className="container-carPrice">
                <h3>Total: {totalPriceAll}</h3>

            </div>

        </div>
    </div>}
    </>
}

export default withContext(Cart)