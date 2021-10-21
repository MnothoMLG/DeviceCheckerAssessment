import { call, put } from 'redux-saga/effects'
import {
  UpdateBrochuresList,UpdateBrochuresReqFeed,UpdateDate,UpdateFilteredList,
  UpdateList,errorOccured,hideLoadingAction,loadingDataDone,
  showCommodityGraph,showLoadingAction
} from '../actions/appActions'
import { filterCommodities, getBrochuresList, getCommodities, getDate, sendRequestedBrochuresList } from '../api'
import Strings from '../constants/strings'


export function* startUp (action) {
   
  const response = yield call(getDate)
  
  if (response.ok) {          
    const { latest_import_date } = response.data
    yield put(UpdateDate(latest_import_date))
        
  }
}

export function* getData (action) {
  yield put(showLoadingAction())

  
  const response = yield call(getCommodities)

  if (response.ok) {          
    const latestList = response.data.list[0]

    console.log("latest data ", latestList)
    yield put(UpdateList(latestList))
    yield put(hideLoadingAction())
  } else {
    yield put(hideLoadingAction())
    yield put(errorOccured(Strings.fetchAllError)) 
  }  
}

// ====== ===== BROCHURES ======  ===========
export function* getBrochures (action) {

  yield put(showLoadingAction())
  const response = yield call(getBrochuresList)

  if (response.ok) {          
    const { brochures } = response.data
    yield put(UpdateBrochuresList(brochures))
    yield put(hideLoadingAction())
  } 
  else {
    yield put(hideLoadingAction())
    yield put(errorOccured(Strings.brochureListError))
  }
}

export function* sendBrochuresList (action) {
    
  const { requestedBrochures, userEmail } = action
    
  if (requestedBrochures) {          
    const response = yield call(sendRequestedBrochuresList, requestedBrochures, userEmail)
    if(response.ok)
    {
      const { message } = response.data
      yield put(UpdateBrochuresReqFeed(message))
    }
        
  } else {
    yield put(errorOccured(Strings.brochureReqError))
  }
}

// ============

export function* getCommodityData (action , api) {
  const { name }  = action
  const ranges = ['1w','1m','1y','5y', '10y']
    
  yield put(showLoadingAction())

  for (range in ranges){
    let response = yield call(filterCommodities, name , ranges[range])
    let commTrend = []

    if (response.ok) {
            
      (response.data.list).map(({ date, commodities })=>{
        let newObj = commodities[0]
        newObj['date'] =  date
        delete newObj.name
        delete newObj.measure
        delete newObj.change
        commTrend.push(newObj)

      })

      yield put(UpdateFilteredList(commTrend, ranges[range], name))  

      if (ranges[range] === '10y'){ //we're done 
                
        yield put(loadingDataDone())  
        yield put(showCommodityGraph())
        yield put(hideLoadingAction())
      }
      
      
      
    } 
    else {
      yield put(loadingDataDone()) 
      yield put(hideLoadingAction())
      yield put(errorOccured(Strings.fetchOneError))   
            
    }
  }

 

   
}

// FIXME: Remove logs
