// importt  axios ot get adat from API
import axios from 'axios'

// use state and link to use in fucntionality and redirection
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// importing bg images and logo
import LogoImg from '../images/logo.png'
import SearchLogo from '../images/search.png'
import Star from '../images/star.png'


function MainArea() {

    // creating states for stroing data recieved and filered data to display
    const [search, setSearch] = useState("")
    const [myData, setMyData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const [isEmpty, setIsEmpty] = useState(false)

    // get data from API the first time window loads and store it in my Data
    useEffect(() => {
        axios.get("https://reactnd-books-api.udacity.com/books", {
            headers: {
                'Authorization': 'whatever-you-want'
            }
        })
            .then(res => {
                const bookData = res.data
                setMyData(bookData.books)
                setFilteredData(bookData.books)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // store value eneterd in searchbox in search variabvle 
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    // update filtered list when searxch is change using useEffect 
    useEffect(() => {
        let fd = myData.filter((el) => el.title.toLowerCase().includes(search.toLowerCase()))
        setFilteredData(fd)
        if (fd.length == 0 && search != "") {
            setIsEmpty(true)
        }
        else {
            setIsEmpty(false)
        }
    }, [search])

    const [isHovered, setIsHovered] = useState(false);

    const changeBG = () => {
        setIsHovered(true);
    };

    const resetBG = () => {
        setIsHovered(false);
    };

    return (
        <>
            <div className="navbar">
                <nav>
                    <div className="logo">
                        <img src={LogoImg} alt="Kalvium-books-logo" className='logoImg' />
                    </div>

                    <div className='searchArea'>
                        <input type="text" className='searchBox' name="inputbox" onChange={() => handleChange(event)} placeholder='Search for books here' />
                        <div className='searchButton'>
                            <img src={SearchLogo} alt="" className='searchLogo' />
                        </div>
                    </div>

                    <Link to='/form'>
                        <div className="registerButton">
                            REGISTER
                        </div>
                    </Link>
                </nav>
            </div>

            {isEmpty && <div><h1 className='no'>No Results Found</h1></div>}

            <div className="MainArea">
                <div className="booksArea">
                    {/* map filetered data and show it to the user in form of tiles */}
                    {filteredData.map((el, index) => {
                        return (
                            <div className="book" key={index}>
                                <div className="above">


                                    <div className={`bookTop`}>

                                        <img src={el.imageLinks.thumbnail} alt="Book-Img" className='bookImage' />
                                    </div>

                                    <div className="bookBottom" onMouseEnter={changeBG} onMouseLeave={resetBG}>

                                        <h2 className="title">{el.title}</h2>
                                        <div className="rating">
                                            <img src={Star} className='star' />
                                            {el.averageRating ? el.averageRating : '4'}</div>

                                        {el.authors.map((el, index) => {
                                            return <div key={index}>{el}</div>
                                        })}
                                    </div>

                                </div>
                                <div className="below"></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default MainArea