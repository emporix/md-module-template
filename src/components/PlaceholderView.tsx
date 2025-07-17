import React from 'react'

interface PlaceholderViewProps {
  tabName: string
}

const PlaceholderView: React.FC<PlaceholderViewProps> = ({ tabName }) => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: '#6c757d' }}>
      <h3>{tabName} statistics will be implemented here</h3>
      <p>This tab will contain {tabName.toLowerCase()} usage statistics and charts.</p>
    </div>
  )
}

export default PlaceholderView 