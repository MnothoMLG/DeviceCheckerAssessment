import { all, takeLatest } from 'redux-saga/effects'

import { GET_ALL, GET_FILTERED, REQUEST_BROCHURES, SEND_BROCHURE_LIST, START_UP } from '../actions/types'
import {
  getBrochures,
  getCommodityData,
  getData,
  sendBrochuresList,
  startUp
} from './querySaga'

// import API from '../Services/Api'
// import PeachAPI from '../Services/PeachApi'
// import EFTSecureAPI from '../Services/EFTSecureApi'
// import FixtureAPI from '../Services/FixtureApi'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */


/* ------------- Sagas ------------- */



/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
   
    takeLatest(GET_ALL, getData),
    takeLatest(GET_FILTERED, getCommodityData),
    takeLatest(REQUEST_BROCHURES, getBrochures),
    takeLatest(SEND_BROCHURE_LIST, sendBrochuresList),
    takeLatest(START_UP, startUp)
    
  ])
}

// FIXME: Remove unused imports