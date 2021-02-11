import React, { useContext } from "react"
import { SpinnerContext } from "../contexts/SpinnerContext"
function Spinner() {
  const { isVisible } = useContext(SpinnerContext)
  return (
    <>
      {isVisible ? (
        <div className="position-absolute spinner-custom d-flex justify-content-center align-items-center">
          <i className="fas fa-sync fa-spin fa-5x text-light"></i>
        </div>
      ) : null}
    </>
  )
}

export default Spinner
