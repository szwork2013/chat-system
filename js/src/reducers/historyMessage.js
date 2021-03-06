/**
 * Created by jiangyu2016 on 2016/11/7.
 */
import {Map, List, fromJS} from 'immutable'

import actionConstants from '../actions/actionConstants'

export function historyMessage(state = [], action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {

      case actionConstants.message.FETCH_HISTORY_MESSAGE_START:
        nextIState = fetchHistoryMessageStart()
        break

      case actionConstants.message.FETCH_HISTORY_MESSAGE_SUCCESS:
        nextIState = fetchHistoryMessageSuccess()
        break

      default:
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  //---------------------------------------

  function fetchHistoryMessageStart() {
    return fromJS([])
  }

  function fetchHistoryMessageSuccess() {
    return fromJS(action.historyMessages)
  }
}
