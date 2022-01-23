import {
  GameStats,
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage,
} from './localStorage'

// In stats array elements 0-5 are successes in 1-6 trys

export const addStatsForCompletedGame = (
  username: string,
  gameStats: GameStats,
  count: number,
  timeTaken: number
) => {
  // Count is number of incorrect guesses before end.
  const stats = { ...gameStats, username }

  stats.totalGames += 1

  if (count > 5) {
    // A fail situation
    stats.currentStreak = 0
    stats.gamesFailed += 1
  } else {
    stats.winDistribution[count] += 1
    stats.currentStreak += 1

    if (stats.bestStreak < stats.currentStreak) {
      stats.bestStreak = stats.currentStreak
    }
  }

  stats.successRate = getSuccessRate(stats)

  stats.totalTimeTakenMillis += timeTaken

  stats.averageTimeTakenMillis = Math.round(
    stats.totalTimeTakenMillis / stats.totalGames
  )

  saveStatsToLocalStorage(stats)
  return stats
}

const defaultStats: GameStats = {
  username: localStorage.getItem('username') || '',
  winDistribution: [0, 0, 0, 0, 0, 0],
  gamesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  averageTimeTakenMillis: 0,
  totalTimeTakenMillis: 0,
  totalGames: 0,
  successRate: 0,
}

export const loadStats = () => {
  return loadStatsFromLocalStorage() || defaultStats
}

const getSuccessRate = (gameStats: GameStats) => {
  const { totalGames, gamesFailed } = gameStats

  return Math.round(
    (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1)
  )
}
