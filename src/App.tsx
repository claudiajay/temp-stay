import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import PropertyDetails from "./pages/PropertyDetails"





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </Router>
  )
}
export default App
