import './ModalCart.css'
import IconButton from './Buttons/IconButton'
//TODO corregir
function ModalCart({level,onCart,onClose,onReturnBuy}){

    // console.log(product,"modal")
    debugger
    return <div className={`Modal container Modal--${level? level: 'infoCart' } `}>
        <div className="Modal__box container container--spaced container--padded">
        <IconButton addClass="closeModal" text="close" onClick={onClose} />
            <h2 className='textModal'>ADDED TO CART SUCCESSFULLY</h2>
            <button className="button1"  onClick={onCart}>VIEW BAG<IconButton addClass="arrowBtnModal" text="arrow_right_alt" /></button>
            <button className="button2" onClick={onReturnBuy}>CONTINUE SHOPPING<IconButton addClass="arrowBtnModal" text="arrow_right_alt" /></button>
        </div>

    </div>
}
export default ModalCart