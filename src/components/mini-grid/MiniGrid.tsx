import { MiniCompletedRow } from './MiniCompletedRow'

type Props = {
  guesses: string[]
  showLetters?: boolean
}

export const MiniGrid = ({ guesses, showLetters }: Props) => {
  return (
    <div className="pb-6">
      {guesses.map((guess, i) => (
        <MiniCompletedRow key={i} guess={guess} showLetters={showLetters} />
      ))}
    </div>
  )
}
