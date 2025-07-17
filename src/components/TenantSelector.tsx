import React, { useState, useEffect } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { fetchAllTenants } from '../api'

interface TenantSelectorProps {
  currentTenant: string
  token: string
  onTenantChange: (tenant: string) => void
}

const TenantSelector: React.FC<TenantSelectorProps> = ({ 
  currentTenant, 
  token, 
  onTenantChange 
}) => {
  const [tenants, setTenants] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState(currentTenant)

  // Special tenants that can see the dropdown
  const specialTenants = ['emporix', 'emporixstage', 'emporixdev']

  useEffect(() => {
    if (specialTenants.includes(currentTenant)) {
      fetchTenants()
    }
  }, [currentTenant, token])

  useEffect(() => {
    setSelectedTenant(currentTenant)
  }, [currentTenant])

  const fetchTenants = async () => {
    setIsLoading(true)
    try {
      const response = await fetchAllTenants(currentTenant, token)
      setTenants(response.tenants || [])
    } catch (error) {
      console.error('Error fetching tenants:', error)
      setTenants([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleTenantChange = (e: { value: string }) => {
    const newTenant = e.value
    setSelectedTenant(newTenant)
    onTenantChange(newTenant)
  }

  // Only show dropdown for special tenants
  if (!specialTenants.includes(currentTenant)) {
    return null
  }

  // Convert tenants array to dropdown options
  const tenantOptions = tenants.map(tenant => ({
    label: tenant,
    value: tenant
  }))

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>Tenant:</span>
      <Dropdown
        value={selectedTenant}
        options={tenantOptions}
        onChange={handleTenantChange}
        placeholder="Select tenant"
        disabled={isLoading}
        filter
        showClear={false}
        style={{ 
          minWidth: '200px',
          fontSize: '0.9rem'
        }}
        panelStyle={{ 
          maxHeight: '300px' 
        }}
      />
    </div>
  )
}

export default TenantSelector 