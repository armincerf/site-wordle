const gameStateKey = 'gameState'

type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

export const saveColourBlindMode = (colourBlindMode: boolean) => {
  localStorage.setItem('colourBlindMode', colourBlindMode.toString())
}

export const loadColourBlindMode = () => {
  const colourBlindMode = localStorage.getItem('colourBlindMode')
  return colourBlindMode ? colourBlindMode === 'true' : false
}
