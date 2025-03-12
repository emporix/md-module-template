// import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useDashboardContext } from '../context/Dashboard.context'
import { Product } from '../models/Product.model'
// import { useTranslation } from 'react-i18next'
import { fetchPriceLists } from '../api'
import { Table } from '../herffjones/ProductTable'
import 'react-day-picker/style.css'

const Pricing = () => {
  // const { t } = useTranslation()
  // const navigate = useNavigate()
  const { token, tenant } = useDashboardContext()
  const [priceLists, setPriceLists] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ; (async () => {
      setIsLoading(true)
      const lists = await fetchPriceLists(tenant, token)
      setPriceLists(lists)
      setIsLoading(false)
    })()
  }, [token, tenant])

  return (
    <div className='flex flex-col gap-4 px-10 w-full bg-gray-50'>
      <div className="flex justify-between items-center">
        <h3 className='text-3xl font-medium text-gray-800'>Prices</h3>
        <button
          className="px-6 py-1.5 text-sm text-white border border-transparent transition-colors bg-gradient-to-b from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700">
          ADD PRICE LIST
        </button>
      </div>
      {/* <Table data={priceLists} /> */}
    </div>
  )
}

export default Pricing
