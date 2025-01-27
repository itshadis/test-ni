import { useState } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import logo from "../../assets/image/logo.png"
import ilustrasiLogin from "../../assets/image/illustrasi-login.png"


const Auth = () => {
  const [inLogin, setInLogin] = useState(true)
  
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="mx-36 lg:mx-72 xl:mx-40 flex flex-1 flex-col justify-center items-center gap-8">
        <h1 className="text-xl font-semibold flex gap-4">
          <span>
            <img src={logo} alt="logo" />
          </span> SIMS PPOB
        </h1>
        
        <p className="text-3xl text-center font-semibold">
          { 
            inLogin ? "Masuk atau buat akun untuk memulai" : "Lengkapi data untuk membuat akun" 
          }
        </p>

          {
            inLogin ? <Login /> : <Register />
          }

          <p className="text-sm font-semibold text-gray-400">
            {inLogin ? "belum punya akun? registrasi " : "sudah punya akun? login "} 
            <button onClick={() => setInLogin(!inLogin)} className="text-red-700 font-semibold">disini</button>
          </p>
        </div>

      <div className="min-h-min hidden xl:block">
        <img className="h-screen object-cover" src={ilustrasiLogin} alt="ilustrasi-login" />
      </div>
    </div>
  )
}

export default Auth