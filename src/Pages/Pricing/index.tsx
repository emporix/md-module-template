// import { useNavigate } from 'react-router'
// import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useDashboardContext } from '../../context/Dashboard.context'
import { fetchPriceLists } from '../../api'
import { Table } from '../../herffjones/PricingTable'

interface PriceList {
  id: string;
  name: string;
}

const PagePricing = () => {
  // const { t } = useTranslation()
  // const navigate = useNavigate()
  const { token, tenant } = useDashboardContext()
  // Properly type the state
  const [priceLists, setPriceLists] = useState<PriceList[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    ; (async () => {
      setIsLoading(true)
      const lists = await fetchPriceLists(tenant, token)
      setPriceLists(lists as PriceList[])
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
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 rounded-full border-b-2 border-sky-500 animate-spin"></div>
        </div>
      ) : (
        <Table data={priceLists} />
      )}
    </div>
  )
}

export default PagePricing
