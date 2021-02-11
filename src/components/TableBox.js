import React, { useEffect, useState, useContext } from "react"
import axios from "axios"
import { SpinnerContext } from "../contexts/SpinnerContext"
import { ErrorContext } from "../contexts/ErrorContext"
function TableBox({ searched }) {
  const [resArray, setResArray] = useState([])
  const [detailsData, setDetailsData] = useState({})
  const [paginationArray, setPaginationArray] = useState([])
  const { setIsVisible } = useContext(SpinnerContext)
  const { setError } = useContext(ErrorContext)
  const [selectedPage, setSelectedPage] = useState(1)

  useEffect(() => {
    setIsVisible(true)
    setError("")
    let url = ""
    let delay = null
    if (searched.length === 0) {
      url = "https://swapi.dev/api/people/"
    } else if (searched.length > 0) {
      url = `https://swapi.dev/api/people/?search=${searched}`
    }
    if (url.length !== 0) {
      setResArray([])
      setDetailsData({})
      setPaginationArray([])
      setSelectedPage(1)
      delay = setTimeout(() => {
        axios
          .get(url)
          .then(res => {
            setResArray(prev => {
              prev = res.data.results
              prev.length === 0 ? setError("No Result Found..") : setError("")
              return prev
            })
            setDetailsData(prev => {
              prev.count = res.data.count
              prev.next = res.data.next
              prev.previous = res.data.previous
              return prev
            })
            setIsVisible(false)

            if (res.data.count > 10) {
              for (let i = 1; i <= Math.ceil(res.data.count / 10); i++) {
                setPaginationArray(prev => [...prev, i])
              }
            }
          })
          .catch(error => {
            console.log(error.response)
            setIsVisible(false)
            setError("Check your Internet Connection..")
          })
      }, 700)
    }
    return () => clearTimeout(delay)
  }, [searched])

  useEffect(() => {
    setIsVisible(true)
    setError("")
    axios
      .get(`http://swapi.dev/api/people/?page=${selectedPage}`)
      .then(res => {
        setResArray(prev => {
          prev = res.data.results
          prev.length === 0 ? setError("No Result Found..") : setError("")
          setIsVisible(false)
          return prev
        })
      })
      .catch(error => {
        console.log(error.response)
        setIsVisible(false)
        setError("Check your Internet Connection..")
      })
  }, [selectedPage])

  return (
    <>
      {resArray !== undefined && resArray.length !== 0 ? (
        <div className="container my-4">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Birth Year</th>
                <th scope="col">Eye Color</th>
                <th scope="col">Gender</th>
                <th scope="col">Hair Color</th>
              </tr>
            </thead>
            <tbody>
              {resArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.birth_year}</td>
                    <td>{item.eye_color}</td>
                    <td>{item.gender}</td>
                    <td>{item.hair_color}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : // <i className="fas fa-sync fa-spin"></i>
      null}
      <div className="d-flex flex-row-reverse">
        {detailsData.count > 10 ? (
          <nav aria-label="Page navigation example ">
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  aria-label="Previous"
                  disabled={selectedPage === 1}
                  style={
                    selectedPage === 1
                      ? { backgroundColor: "#f5f5f5", color: "#000" }
                      : { backgroundColor: "#fff", color: "#000" }
                  }
                  onClick={() => setSelectedPage(prev => prev - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </button>
              </li>

              {paginationArray.map((item, index) => {
                return (
                  <li className="page-item" key={index}>
                    {/* <a className="page-link" href="#">
                        {index + 1}
                      </a> */}
                    <button
                      className="page-link"
                      onClick={() => setSelectedPage(index + 1)}
                      style={
                        selectedPage === index + 1
                          ? { backgroundColor: "#000", color: "#fff" }
                          : { backgroundColor: "#fff", color: "#000" }
                      }
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              })}

              <li className="page-item">
                <button
                  className="page-link"
                  aria-label="Next"
                  onClick={() => setSelectedPage(prev => prev + 1)}
                  disabled={selectedPage === paginationArray.length}
                  style={
                    selectedPage === paginationArray.length
                      ? { backgroundColor: "#f5f5f5", color: "#000" }
                      : { backgroundColor: "#fff", color: "#000" }
                  }
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </button>
              </li>
            </ul>
          </nav>
        ) : // <i className="fas fa-sync fa-spin"></i>
        null}
      </div>
    </>
  )
}

export default TableBox
