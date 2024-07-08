import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <p>Default page is working!</p>
      <Link to={'/create-account'}>Create an account.</Link>
    </div>
  )
}

export default App
