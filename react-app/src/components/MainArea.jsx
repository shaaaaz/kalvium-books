import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import LogoImg from '../images/logo.png'
import SearchLogo from '../images/search.png'


function MainArea() {

    const [search, setSearch] = useState("")

    const [myData, setMyData] = useState([])
    const [filteredData, setFilteredData] = useState([])


    
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

    // let filteredData = []
    

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    
    useEffect(() => {
        let fd = myData.filter((el) =>  el.title.toLowerCase().includes(search.toLowerCase()))
        setFilteredData(fd)
        console.log(filteredData)
    },[search])

    return (
        <>
            <div className="navbar">
                <nav>
                    <div className="logo">
                        <img src={LogoImg} alt="Kalvium-books-logo" className='logoImg' />
                    </div>

                    <div className='searchArea'>
                        <input type="text" className='searchBox' name="inputbox" onChange={() => handleChange(event)} />
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

            <div className="MainArea">
                <div className="booksArea">
                    {filteredData.map((el, index) => {
                        return (
                            <div className="book" key={index}>
                                <img src={el.imageLinks.thumbnail} alt="Book-Img" className='bookImage' />
                                <div className="hideRest">

                                <h2 className="title">{el.title}</h2>
                                </div>
                                {el.authors.map((el, index) => {
                                    return <div key={index}>{el}</div>
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default MainArea