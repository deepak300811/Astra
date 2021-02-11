import React, { useEffect, useState } from "react"
import TableBox from "./TableBox"
function InputAndTable() {
  const [searched, setSearched] = useState("")
  return (
    <div className="container px-4 pt-4 pb-0 ">
      <div className="row d-flex justify-content-center my-4 pt-4">
        <div className="col-md-6 mt-3">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Search"
            value={searched}
            onChange={e => {
              setSearched(e.target.value)
            }}
          ></input>
        </div>
      </div>
      <TableBox searched={searched.trim()} />
    </div>
  )
}

export default InputAndTable
