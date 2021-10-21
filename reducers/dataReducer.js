/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import * as types from '../actions/types'

const INITIAL_STATE = {
  favourites: [],
  viewNo : 1,
  rangeFocusedOn : '1y',
  lastUpdated :  null,
}

export default (state = INITIAL_STATE, action) => {
  const { name,type,graphRange,range,newList = null,brochureReqFeedback = null,userEmail = null ,lastUpdateDate, errorMsg } = action

  switch (type) {


  case types.ADD_FAVOURITE:
   
    let { favourites } = state
    if (!favourites.includes(name)) favourites.push(name)
    return {
      ...state,
      favourites : favourites
    }

  case types.REMOVE_FAVOURITE:
    
    let favs = state.favourites
    if (favs.includes(name)) { 
      let pos = favs.indexOf(name)
      favs[pos] = null //remove the fav

    }
    return {
      ...state,
      favourites : favs
    }


  case types.UPDATE_RANGE_CHANGE:
    console.log("range changing")
      return {
        ...state,
        rangeFocusedOn : graphRange
      }

  case types.CHANGE_VIEW:
    
    let no = state.viewNo
    no++
    return {
      ...state,
      viewNo : no
    }


  
  case types.UPDATE_EMAIL:
    return {
      ...state,
      userEmail : userEmail
    }

      
  case types.UPDATE_DATE:

    return {
      ...state,
      lastUpdated : lastUpdateDate
    }

      
  default:
    return state
  }
}

// FIXME: Remove logs
