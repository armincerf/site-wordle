/* eslint-disable react-hooks/exhaustive-deps */
import { InformationCircleIcon, UserGroupIcon } from '@heroicons/react/outline'
import { ChartBarIcon } from '@heroicons/react/outline'
import {
  useGameForIdQuery,
  useGameHistoryQuery,
  useSaveGameMutation,
  useUpdateStatsMutation,
} from './generated/graphql'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { LeaderboardModal } from './components/modals/LeaderboardModal'
import { WinModal } from './components/modals/WinModal'
import { StatsModal } from './components/modals/StatsModal'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'
import { dateStr, genGameId, genStatsId, notEmpty } from './helpers'
import { useQueryClient } from 'react-query'

function App({ username }: { username: string }) {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isLeaderboardModalOpen, setIsLeaderboardModalOpen] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [shareComplete, setShareComplete] = useState(false)
  const [timeTaken, setTimeTaken] = useState(0)
  const date = dateStr()
  const id = genGameId(username)
  const statsId = genStatsId(username)

  const { data, isLoading } = useGameForIdQuery({ id })
  const gameState = data?.gameForId

  const historyQuery = useGameHistoryQuery({ id })
  const startedAt =
    historyQuery.data?.gameHistoryForId?.filter(notEmpty)?.[0]?._siteValidTime

  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      setIsGameWon(false)
      setIsGameLost(false)
      return []
    }
    if (loaded.guesses.includes(solution)) {
      setIsGameWon(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())
  const queryClient = useQueryClient()
  const updateMutation = useSaveGameMutation({
    onSettled: () => {
      console.log('saved game')
      queryClient.refetchQueries(useGameHistoryQuery.getKey({ id }))
      queryClient.refetchQueries(useGameForIdQuery.getKey({ id }))
    },
  })
  const updateStatsMutation = useUpdateStatsMutation({
    onSettled: () => {
      console.log('saved stats')

      queryClient.refetchQueries(useGameForIdQuery.getKey({ id }))
    },
  })

  useEffect(() => {
    if (!loadGameStateFromLocalStorage()?.guesses?.length && !isLoading) {
      const guessesFromServer = data?.gameForId?.guesses || []
      saveGameStateToLocalStorage({
        guesses: guessesFromServer,
        solution,
      })
      setGuesses(guessesFromServer)
    }
  }, [isLoading, data])

  useEffect(() => {
    if (
      username &&
      !isLoading &&
      guesses.length &&
      (!gameState || gameState.guesses?.length !== guesses.length)
    ) {
      updateMutation.mutate({
        id,
        game: {
          date,
          username,
          finished: isGameLost || isGameWon,
          timeTakenMillis: timeTaken,
          guesses,
          solution,
          statsId,
        },
      })
      saveGameStateToLocalStorage({ guesses, solution })
    }
  }, [JSON.stringify(guesses), gameState, solution])

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true)
    }
  }, [isGameWon])

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    if (!(currentGuess.length === 5)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, 2000)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, 2000)
    }

    const winningWord = isWinningWord(currentGuess)
    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (startedAt && !gameState?.timeTakenMillis) {
        const now = new Date().getTime()
        let millis = now - new Date(startedAt).getTime()
        setTimeTaken(millis)
      }

      if (winningWord) {
        const newStats = addStatsForCompletedGame(
          username,
          stats,
          guesses.length,
          timeTaken
        )
        updateStatsMutation.mutate({
          id: statsId,
          stats: newStats,
        })
        setStats(newStats)
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        const newStats = addStatsForCompletedGame(
          username,
          stats,
          guesses.length + 1,
          timeTaken
        )
        updateStatsMutation.mutate({
          id: statsId,
          stats: newStats,
        })
        setStats(newStats)
        setIsGameLost(true)
        return setTimeout(() => {
          setIsGameLost(false)
        }, 2000)
      }
    }
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Alert message="Not enough letters" isOpen={isNotEnoughLetters} />
      <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message={`You lost, the word was ${solution}`}
        isOpen={isGameLost}
      />
      <Alert
        message="Game copied to clipboard"
        isOpen={shareComplete}
        variant="success"
      />
      <div className="flex w-80 mx-auto items-center mb-8 space-x-2">
        <h1 className="text-xl grow font-bold">Playing as {username}</h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <ChartBarIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsStatsModalOpen(true)}
        />
        <UserGroupIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsLeaderboardModalOpen(true)}
        />
      </div>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        disabled={isGameWon || isGameLost}
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
        handleStats={() => {
          setIsWinModalOpen(false)
          setIsStatsModalOpen(true)
        }}
        handleShare={() => {
          setIsWinModalOpen(false)
          setShareComplete(true)
          return setTimeout(() => {
            setShareComplete(false)
          }, 2000)
        }}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <LeaderboardModal
        isOpen={isLeaderboardModalOpen}
        handleClose={() => setIsLeaderboardModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        username={username}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsAboutModalOpen(true)}
      >
        About this game
      </button>
    </div>
  )
}

export default App
