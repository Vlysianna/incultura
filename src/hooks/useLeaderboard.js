import { useState, useEffect } from 'react'

export function useLeaderboard() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/leaderboard')
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard')
        }
  const data = await response.json()
  const users = Array.isArray(data) ? data : (data.users || [])
  setList(users)
      } catch (err) {
        setError(err.message)
        setList([])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  const getUserRank = (userId) => {
    if (!userId) return null
    const index = list.findIndex(u => u.id === userId)
    return index !== -1 ? index + 1 : null
  }

  const filterUsers = (filter) => {
    if (!filter || filter === 'all') return list

    // filter values: 'quiz', 'articles', 'marketplace'
    switch (filter) {
      case 'quiz':
        return list.filter(u => (u.quizCount || 0) > 0)
      case 'articles':
        return list.filter(u => (u.articleCount || 0) > 0)
      case 'marketplace':
        return list.filter(u => (u.redeemCount || 0) > 0)
      default:
        return list
    }
  }

  const getTotalStats = () => {
    return {
      totalUsers: list.length,
      totalCoins: list.reduce((total, user) => total + (user.coins || 0), 0),
      totalActivities: list.reduce((total, user) => total + (user.activitiesCount || 0), 0)
    }
  }

  return {
    list,
    loading,
    error,
    getUserRank,
    filterUsers,
    getTotalStats
  }
}
