import { useEffect, useState } from "react"
import { BASE_URL } from "../../utils/constant"
import { useSelector } from "react-redux"
import { formatDate, formatIDRCurrency } from "../../utils/function"
import Hero from "../../components/Hero"

const Transaction = () => {
  const { token } = useSelector((state) => state.auth)
  const [historyTransaction, setHistoryTransaction] = useState([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getTransactionHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset])

  const getTransactionHistory = async (limit = 5) => {
    setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/transaction/history?limit=${limit}&offset=${offset}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()

      setHistoryTransaction((prev) => [...prev, ...data.data.records])
    } catch (error) {
      console.log("error", error)
    } finally {
      setLoading(false)
    }
  }

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + 5)
  }

  return (
    <section className="w-4/5 mx-auto mt-10">
      <Hero />

      <div className="my-10">
        <p className="text-lg">Semua Transaksi</p>

        <div className="flex flex-col gap-4 mt-4">
          {historyTransaction?.map((item, index) => (
            <div key={index} className="flex justify-between border-2 border-gray-200 rounded-xl py-1 px-8">
              <div className="flex flex-col gap-2">
                <p
                  className={`text-base font-semibold ${
                    item.transaction_type === "PAYMENT" ? "text-red-600" : "text-emerald-500"
                  }`}
                >
                  {item.transaction_type === "PAYMENT" ? "-" : "+"} Rp.{formatIDRCurrency(item.total_amount)}
                </p>
                <span className="text-xs text-gray-400">{formatDate(item.created_on)}</span>
              </div>
              <p className="text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-5">
          <button
            className="text-red-600 text-lg font-semibold"
            onClick={handleShowMore}
            disabled={loading} // Disabled jika loading
          >
            {loading ? "Loading..." : "Show More"}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Transaction
