import { Link } from "react-router-dom"
import logo  from "../assets/image/logo.png"

const Header = () => {
  return (
    <header className="h-20 shadow-md flex items-center">
      <div className="w-4/5 mx-auto flex justify-between">
        <Link to="/" className="text-lg font-semibold flex gap-4">
          <span>
            <img src={logo} alt="logo" />
          </span> SIMS PPOB
        </Link>

        <nav className="flex gap-5 font-semibold text-gray-500">
          <Link to="/top-up">Top Up</Link>
          <Link to="/transaction">Transaction</Link>
          <Link to="/profile">Akun</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header