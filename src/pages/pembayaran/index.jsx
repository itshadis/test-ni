import { MdMoney } from "react-icons/md"
import { Button, Input } from "antd"
import { useSelector } from "react-redux"
import { formatNumber } from "../../utils/function"
import { useState } from "react"
import { BASE_URL } from "../../utils/constant"
import Hero from "../../components/Hero"
import { useLocation } from "react-router-dom"

const Pembayaran = () => {
  const location = useLocation()
  const service = location.state.service
  const { token } = useSelector(state => state.auth)
  // const [rawNominal, setRawNominal] = useState("")
  const [displayNominal, setDisplayNominal] = useState("")
  
  const handleChange = (value) => {
    let rawValue = value.replace(/[^0-9]/g, "")
    if (rawValue.startsWith("0")) {
      rawValue = rawValue.replace(/^0+/, "")
    }
    const formattedValue = formatNumber(rawValue)

    // setRawNominal(rawValue)
    setDisplayNominal(formattedValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const payload = { service_code: service.service_code}

      const response = await fetch(`${BASE_URL}/transaction`, {
        method: 'POST',
        headers: {Authorization: `Bearer ${token}`},
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="w-4/5 mx-auto mt-10">
      <Hero />

      <div className="mt-10">
      {
          service ? (
            <>
              <p className="text-lg mb-2">PemBayaran</p>
              <div className="flex gap-2 items-center">
                <img className="w-10 h-10" src={service.service_icon} alt={service.service_code} />
                <p className="font-bold">{service.service_name}</p>
              </div>
        
              <form onSubmit={handleSubmit} className="flex flex-row gap-10 mt-10">
                <div className="flex flex-col gap-4 basis-2/3">
                  <Input
                    className="h-10"
                    value={displayNominal}
                    prefix={ <MdMoney /> }
                    placeholder="PemBayaran"
                    defaultValue={displayNominal}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                  
                  <Button htmlType="submit" type="primary" danger className="w-full h-10" disabled={displayNominal === ""}>Bayar</Button>
                </div>
              </form>
            </>
          ) : <h1>Services Not Founde</h1>
        }
        
      </div>

    </section>
  )
}

export default Pembayaran