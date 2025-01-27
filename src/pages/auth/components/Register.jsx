import { Button, Input } from "antd"
import { BASE_URL } from "../../../utils/constant"
import { FaRegUser } from "react-icons/fa"
import { MdLockOutline } from "react-icons/md"
import { useState } from "react"
import { hasNullOrEmpty } from "../../../utils/function"
import Swal from "sweetalert2"

const defaultRegisterValues = {
  email: null,
  first_name: null,
  last_name: null,
  password: null,
}

const Register = () => {
  const [registerValues, setRegisterValues] = useState(defaultRegisterValues)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (value) => {
    const temp = { ...registerValues, ...value }
    setRegisterValues(temp)
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    const isAnyNullField = hasNullOrEmpty(registerValues)
    if(isAnyNullField || !confirmPassword) {
      return Swal.fire({
        icon: 'warning',
        text: 'Lengkapi form pendaftaran terlebih dahulu'
        }
      )
    }

    if(registerValues.password !== confirmPassword) {
      return Swal.fire({
        icon: 'warning',
        text: 'Pastikan password dan konfirmasi password sama'
        }
      )
    }

    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerValues)
      })

      const data = await response.json()
      
      if(response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Registrasi Berhasil',
          text: data.message
        })
        setRegisterValues(defaultRegisterValues)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registrasi Gagal',
          text: data.message
        })
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col items-center gap-8 w-full">
      <Input 
        className="h-10" 
        prefix="@" 
        placeholder="masukkan email anda"
        onChange={(e) => handleChange({ email: e.target.value })}
      />

      <Input 
        className="h-10" 
        prefix={ <FaRegUser /> } 
        placeholder="nama depan"
        onChange={(e) => handleChange({ first_name: e.target.value })}
      />
      
      <Input 
        className="h-10" 
        prefix={ <FaRegUser /> } 
        placeholder="nama belakang"
        onChange={(e) => handleChange({ last_name: e.target.value })}
      />
      
      <Input.Password 
        className="h-10" 
        prefix={ <MdLockOutline /> } 
        placeholder="buat password"
        onChange={(e) => handleChange({ password: e.target.value })}
      />
      
      <Input.Password 
        className="h-10"
        prefix={ <MdLockOutline /> } 
        placeholder="konfirmasi password"
        onChange={(e) => setConfirmPassword(e.target.value)}  
      />
      
      <Button htmlType="submit" type="primary" danger className="w-full h-10" loading={loading}>Register</Button>
    </form>
  )
}

export default Register