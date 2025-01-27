/* eslint-disable react/prop-types */
import { Button, Input } from 'antd'
import { FaRegUser } from "react-icons/fa"
import { BASE_URL } from '../../../utils/constant'
import { useDispatch } from 'react-redux'
import { detailUser } from '../../../store/slices/authSlice'
import { useEffect, useState } from 'react'

const FormDetailUser = ({ token, user }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
  })

  useEffect(() => {
    if (user) {
      setFormValues({
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/profile/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formValues.first_name,
          last_name: formValues.last_name,
        }),
      })

      const data = await response.json()

      if(response.ok) {
        dispatch(detailUser(data.data))
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-5">
      <div>
        <p className="mb-2">Email</p>
        <Input
          className="h-10"
          prefix="@"
          placeholder="masukkan email anda"
          name="email"
          value={formValues.email}
          disabled
        />
      </div>

      <div>
        <p className="mb-2">Nama Depan</p>
        <Input
          className="h-10"
          prefix={<FaRegUser />}
          placeholder="masukkan nama depan anda"
          name="first_name"
          value={formValues.first_name}
          onChange={handleChange}
        />
      </div>

      <div>
        <p className="mb-2">Nama Belakang</p>
        <Input
          className="h-10"
          prefix={<FaRegUser />}
          placeholder="masukkan nama belakang anda"
          name="last_name"
          value={formValues.last_name}
          onChange={handleChange}
        />
      </div>

      <Button
        className="h-10 text-red-600 font-semibold"
        htmlType="submit"
        variant="outlined"
        color="danger"
        loading={loading}
      >
        Edit Profile
      </Button>
    </form>
  )
}

export default FormDetailUser