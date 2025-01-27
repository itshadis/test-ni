import { Button, Input } from "antd"
import { useEffect, useState } from "react"
import { MdLockOutline } from "react-icons/md"
import { login } from "../../../store/slices/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { hasNullOrEmpty } from "../../../utils/function"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const defaultLoginValues = {
  email: null,
  password: null
}

const Login = () => {
  const [loginValues, setLoginValues] = useState(defaultLoginValues)
  const { loading, token } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token, navigate])
  
  const handleChange = (value) => {
    const temp = { ...loginValues, ...value }
    setLoginValues(temp)
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const isAnyNullField = hasNullOrEmpty(loginValues)
      if(isAnyNullField) {
        return Swal.fire({
          icon: 'warning',
          text: 'Lengkapi form terlebih dahulu',
          confirmButtonColor: '#ff4d4f'
        })
      }
  
      const credential = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginValues)
      }
  
      dispatch(login(credential))
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.message
      })      
    }
  }
  
  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center gap-8 w-full">
      <Input 
        className="h-10"
        prefix="@" 
        placeholder="masukkan email anda"
        defaultValue={loginValues.email}
        onChange={(e) => handleChange({ email: e.target.value })}
      />
      
      <Input.Password 
        className="h-10" 
        prefix={ <MdLockOutline /> } 
        placeholder="masukkan password anda"
        defaultValue={loginValues.password}
        onChange={(e) => handleChange({ password: e.target.value })}
      />
      
      <Button htmlType="submit" type="primary" danger className="w-full h-10" loading={loading}>Masuk</Button>
    </form>
  )
}

export default Login