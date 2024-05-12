import { useContext } from 'react'
import appContext from '../appContext'
import { AppContextInterface } from '../types'

/**
 * a test doc
 * @returns context
 */
const useAppContext = (): AppContextInterface => {
  return useContext(appContext)
}
export default useAppContext
