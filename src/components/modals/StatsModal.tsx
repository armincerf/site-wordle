import { Fragment, useState } from 'react'
import _ from 'lodash-es'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/outline'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { dateStr, notEmpty } from '../../helpers'
import { useTodaysGamesQuery } from '../../generated/graphql'
import classNames from 'classnames'
import { MiniGrid } from '../mini-grid/MiniGrid'

type Props = {
  isOpen: boolean
  handleClose: () => void
  username: string
}

export const StatsModal = ({ isOpen, handleClose, username }: Props) => {
  const date = dateStr()
  const { data } = useTodaysGamesQuery({ date }, { refetchInterval: 5000 })
  const [user, setUser] = useState(username)
  const allUsers =
    _.uniq(
      data?.todaysGames
        ?.filter((game) => game?.stats?.totalGames)
        .map((game) => game?.username)
        .filter(notEmpty)
    ) || []
  const currentGame = data?.todaysGames?.find((game) => game?.username === user)
  const myGame = data?.todaysGames?.find((game) => game?.username === username)
  const canSpoil = myGame?.finished
  const allStats =
    data?.todaysGames
      ?.map((game) => {
        return game?.stats
      })
      .filter(notEmpty) || []
  const gameStats = allStats.find((game) => game.username === user)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 
                            pt-5 pb-4 text-left overflow-hidden shadow-xl transform 
                            transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
            >
              <div className="absolute right-4 top-4">
                <XCircleIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={handleClose}
                />
              </div>
              <div>
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Statistics for {user}
                  </Dialog.Title>
                  {gameStats && currentGame && currentGame?.guesses ? (
                    <>
                      <StatBar gameStats={gameStats} />
                      <h4 className="text-lg leading-6 font-medium text-gray-900">
                        Guess Distribution
                      </h4>
                      <Histogram gameStats={gameStats} />
                      <p className="text-lg text-gray-600 my-2">Today's game</p>
                      <MiniGrid
                        showLetters={canSpoil}
                        guesses={currentGame.guesses}
                      />
                    </>
                  ) : (
                    <div className="text-center">
                      <p className="text-lg leading-6 font-medium text-gray-900">
                        No stats for this user
                      </p>
                    </div>
                  )}
                  {allUsers && (
                    <div className="relative z-0 inline-flex justify-center rounded-md w-full overflow-x-auto">
                      {allUsers.map((currentUser) => (
                        <button
                          key={currentUser}
                          className={classNames(
                            user === currentUser ? 'bg-gray-200' : 'bg-white',
                            'rounded-none first:ml-0 first:rounded-l-md last:rounded-r-md last:mr-0 -mx-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500'
                          )}
                          onClick={() => setUser(currentUser)}
                        >
                          {currentUser}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
