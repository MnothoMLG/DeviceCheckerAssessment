
/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */

import * as types from '../actions/types'

const INITIAL_STATE = {

  gestureX : null,

}

export default (state = INITIAL_STATE, action) => {

  const { name, type, commodityName, gestureX,
    range, newList = null, brochureReqFeedback = null, 
    userEmail = null ,lastUpdateDate, errorMsg } = action

  switch (type) {

    case types.UPDATE_GESTURE :
      return { 
        ...state,
          gestureX
      }


       
    default:
      return state
    
    }
}



