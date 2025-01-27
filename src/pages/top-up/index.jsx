import { Button, Input } from "antd"
import { useState } from "react"
import { MdMoney } from "react-icons/md"
import { formatNumber } from "../../utils/function"
import Hero from "../../components/Hero"
import { useSelector } from "react-redux"
import { BASE_URL } from "../../utils/constant"

const TopUp = () => {
  const { token } = useSelector(state => state.auth)
  const [rawNominal, setRawNominal] = useState("")
  const [displayNominal, setDisplayNominal] = useState("")
  
  const handleChange = (value) => {
    let rawValue = value.replace(/[^0-9]/g, "")
    if (rawValue.startsWith("0")) {
      rawValue = rawValue.replace(/^0+/, "")
    }
    const formattedValue = formatNumber(rawValue)

    setRawNominal(rawValue)
    setDisplayNominal(formattedValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const payload = { top_up_amount: parseInt(rawNominal)}

      const response = await fetch(`${BASE_URL}/topup`, {
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
        <p className="text-xl">Silahkan masukkan</p>
        <p className="text-3xl font-semibold">Nominal Top Up</p>
        
        <form onSubmit={handleSubmit} className="flex flex-row gap-10 mt-10">
          <div className="flex flex-col gap-4 basis-2/3">
            <Input
              className="h-10"
              value={displayNominal}
              prefix={ <MdMoney /> }
              placeholder="masukkan nominal Top Up"
              onChange={(e) => handleChange(e.target.value)}
            />
            
            <Button htmlType="submit" type="primary" danger className="w-full h-10" disabled={rawNominal === ""}>Top Up</Button>
          </div>
      
          <div className="flex flex-wrap gap-4 basis-1/3">
            <button type="button" className="border-[1px] border-gray-300 rounded h-10 w-28" value="10000" onClick={(e) => handleChange(e.target.value)}>Rp10.000</button>
            <button type="button" className="border-[1px] border-gray-300 rounded h-10 w-28" value="20000" onClick={(e) => handleChange(e.target.value)}>Rp20.000</button>
            <button type="button" className="border-[1px] border-gray-300 rounded h-10 w-28" value="50000" onClick={(e) => handleChange(e.target.value)}>Rp50.000</button>
            <button type="button" className="border-[1px] border-gray-300 rounded h-10 w-28" value="100000" onClick={(e) => handleChange(e.target.value)}>Rp100.000</button>
            <button type="button" className="border-[1px] border-gray-300 rounded h-10 w-28" value="250000" onClick={(e) => handleChange(e.target.value)}>Rp250.000</button>
            <button type="button" className="border-[1px] border-gray-300 rounded h-10 w-28" value="500000" onClick={(e) => handleChange(e.target.value)}>Rp500.000</button>
          </div>
        </form>
      </div>

    </section>
  )
}

export default TopUp