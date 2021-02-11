import "./App.css"
import Header from "./components/Header"
import InputAndTable from "./components/InputAndTable"
import { SpinnerContext } from "./contexts/SpinnerContext"
import { ErrorContext } from "./contexts/ErrorContext"
import Spinner from "./components/Spinner"
import ErrorPage from "./components/ErrorPage"
import { useState } from "react"
function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [Error, setError] = useState("")
  return (
    <div className="App position-relative">
      <SpinnerContext.Provider value={{ isVisible, setIsVisible }}>
        <ErrorContext.Provider value={{ Error, setError }}>
          <Header />
          <div className="position-relative">
            <ErrorPage />
            <Spinner />
          </div>

          <InputAndTable />
        </ErrorContext.Provider>
      </SpinnerContext.Provider>
    </div>
  )
}

export default App
