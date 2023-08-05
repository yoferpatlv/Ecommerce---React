function IconButtonMenuPanel({addClass,onClick,text,nameIcon}){

    return <a className="menu__link" onClick={onClick}>{nameIcon}<span className={`material-symbols-outlined ${addClass}`}>{text}</span></a>
}

export default IconButtonMenuPanel