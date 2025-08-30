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
        setList(data || [])
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
    if (filter === 'all') return list
    // Add filter logic here based on user activities
    return list
  }

  const getTotalStats = () => {
    return {
      totalUsers: list.length,
      totalCoins: list.reduce((total, user) => total + (user.coins || 0), 0),
      totalActivities: list.reduce((total, user) => total + (user.activities?.length || 0), 0)
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
