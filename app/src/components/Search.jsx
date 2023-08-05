import IconButton from './Buttons/IconButton'
import './Search.css'

function Search({ onQuery, onCloseClick, onProductsSearch }) {
    const handleSubmit = (event) => {
        event.preventDefault()

        const query = event.target.query.value

        onQuery(query)
        //TODO buggg despues de buscar y no puedo ver el producto
        onProductsSearch()
        // event.target.reset()
    }
    const handleCloseClick = () => {
        onCloseClick()
    }
    const handleDeleteTextSearch = event => {
        // event.preventDefault()
        // const cleanText= event.target.query.value
        // cleanText=""
        // onQuery(cleanText)  
    }
 

    return <div className='container search' >
        <IconButton addClass="chevron_left" text="chevron_left" onClick={handleCloseClick} />
        <div className='containerFormSearch'>
            <form className="container container--row" onSubmit={handleSubmit}>
                    <input className="input" type="text" name="query" />
                    <IconButton text="search" />
            </form>
            <IconButton addClass="closeFormSearch" text="cleaning_services"  />
        </div>
    </div>
}

export default Search