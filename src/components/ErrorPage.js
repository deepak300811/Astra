import React, { useContext } from "react"
import { ErrorContext } from "../contexts/ErrorContext"
const ErrorPage = () => {
  const { Error } = useContext(ErrorContext)
  return (
    <>
      {Error ? (
        <div className="position-absolute spinner-custom d-flex justify-content-center align-items-center">
          <div className="container d-flex justify-content-center">
            <p className="display-3 text-light">{Error}</p>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ErrorPage
