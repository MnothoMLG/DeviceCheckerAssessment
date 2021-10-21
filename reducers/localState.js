/**
 * Loading reducer made seperate for easy blacklisting
 * Avoid data persist
 */
import * as types from '../actions/types';

const INITIAL_STATE = {
  brochures: {},
  brochureRequestFeedBack: {},
  showGraph: {},
  focusedCommTrend: {},
  currentCommName: {},
  commoditiesObject: {},
  focusedCommTrend: {},
  currentCommName: {},
  error: {},
  isLoading: false,
  userEmail: {},
  dataRetrieved: true,
};

export default (state = INITIAL_STATE, action) => {
  const {
    name,
    type,
    commodityName,
    gestureX,
    range,
    newList = null,
    brochureReqFeedback = null,
    userEmail = null,
    lastUpdateDate,
    errorMsg,
  } = action;

  switch (type) {
    case types.START_UP:
      const {commoditiesObject} = state;
      return {
        ...state,
        commoditiesObject: commoditiesObject || {},
        isLoading: false,
      };

    case types.UPDATE_BROCHURES:
      if (newList) {
        return {
          ...state,
          brochures: newList,
        };
      }

      return {
        ...state,
      };

    case types.BROCHURE_REQ_FDB:
      if (brochureReqFeedback) {
        return {
          ...state,
          brochureRequestFeedBack: brochureReqFeedback,
        };
      }
      return {
        ...state,
      };

    case types.CLR_BROCHURE_REQ_FDB:
      return {
        ...state,
        brochureRequestFeedBack: null,
        userEmail: null,
      };

    case types.CLEAR_GRAPH_DATA:
      return {
        ...state,
        focusedCommTrend: null,
        currentCommName: null,
        dataRetrieved: false,
        isLoading: false,
      };
    case types.UPDATE_FOCUS_COMM_DATA:
      const {currentCommName, focusedCommTrend} = state;
      let dataObj = currentCommName === commodityName ? focusedCommTrend : {};
      if (newList && range) {
        dataObj[range] = newList;
        return {
          ...state,
          currentCommName: commodityName,
          focusedCommTrend: dataObj,
        };
      }

      return {
        ...state,
      };

    case types.UPDATE_LIST:
      if (newList) {
        return {
          ...state,
          commoditiesObject: newList,
        };
      }
      return {
        ...state,
      };

    case types.SHOW_GRAPH:
      return {
        ...state,
        showGraph: true,
      };

    case types.HIDE_GRAPH:
      return {
        ...state,
        showGraph: null,
      };

    case types.DATA_FETCHING:
      return {
        ...state,
        isLoading: true,
      };

    case types.DATA_FETCHING_DISMISS:
      return {
        ...state,
        isLoading: false,
      };

    case types.ERROR_OCCURED:
      return {
        ...state,
        error: errorMsg,
      };

    case types.CLEAR_ERR:
      return {
        ...state,
        error: null,
        isLoading: null,
      };

    /// ===== LAODING

    case types.DATA_LOADED:
      return {
        ...state,
        dataRetrieved: true,
        isLoading: false,
      };

    case types.BROCHURE_REQ_FDB:
      if (brochureReqFeedback) {
        return {
          ...state,
          brochureRequestFeedBack: brochureReqFeedback,
        };
      }
      return {
        ...state,
      };

    default:
      return state;
  }
};
