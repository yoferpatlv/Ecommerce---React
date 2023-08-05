
function IconButtonBackStyle({onClick,text}){

    return <div className="btnBack">
    <span className="material-symbols-outlined btn-menu" onClick={onClick}>{text}</span>
    </div>
}
export default IconButtonBackStyle