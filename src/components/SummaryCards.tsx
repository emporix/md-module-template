import React from 'react'
import { useTranslation } from 'react-i18next'
import { StatisticsSummary } from '../models/Statistics.model'

interface SummaryCardsProps {
  summary: StatisticsSummary
  agreementLabel: string
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary, agreementLabel }) => {
  const { t } = useTranslation()

  const formatNumber = (num: number | undefined) => {
    if (num === undefined || num === null || isNaN(num)) {
      return '0'
    }
    return num.toLocaleString()
  }

  const formatLargeNumber = (num: number | undefined) => {
    if (num === undefined || num === null || isNaN(num)) {
      return '0'
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
  }

  return (
    <div className="statistics-cards" style={{ padding: '0 1rem' }}>
      <div className="stat-card">
        <div className="stat-card-label">{t('yesterday')}</div>
        <div className="stat-card-value">{formatNumber(summary.yesterday)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">{t('thisWeek')}</div>
        <div className="stat-card-value">{formatNumber(summary.thisWeek)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">{t('thisMonth')}</div>
        <div className="stat-card-value">{formatNumber(summary.thisMonth)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">{t('thisYear')}</div>
        <div className="stat-card-value">{formatNumber(summary.thisYear)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-card-label">{agreementLabel}</div>
        <div className="stat-card-value highlight">{formatLargeNumber(summary.agreedAnnual)}</div>
      </div>
    </div>
  )
}

export default SummaryCards 