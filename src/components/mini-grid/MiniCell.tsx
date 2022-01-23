import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  status: CharStatus
  letter?: string
}

export const MiniCell = ({ status, letter }: Props) => {
  const classes = classnames(
    'w-10 h-10 border-solid text-white border-2 border-slate-200 flex items-center justify-center mx-0.5 text-lg font-bold rounded',
    {
      'bg-white': status === 'absent',
      'bg-green-500': status === 'correct',
      'bg-yellow-500': status === 'present',
      'border-none': letter,
      'bg-slate-400': letter && status === 'absent',
    }
  )

  return (
    <>
      <div className={classes}>{letter}</div>
    </>
  )
}
