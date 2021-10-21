import { AppState } from "../../root.reducer";

export const getCustomerSpend = (app: AppState) => app.storesReducer.customerSpend;
export const getVirtualCard = (app: AppState) => app.storesReducer.virtualCard;
export const getCustomerPlan = (app: AppState) => app.storesReducer.customerPlan;
export const getUserName = (app: AppState) => {
  return {
    firstName: app.storesReducer.customerDetails?.firstName,
    lastName: app.storesReducer.customerDetails?.lastName,
  };
};
export const getRegenerateCard = (app: AppState) => app.storesReducer.regenerateCard;
export const getTransactionHystory = (app: AppState) => app.storesReducer.transactionHistory;
export const getBoostEnabled = (app: AppState) => {
  if (!app.storesReducer.customerSpend) {
    return false;
  }
  if (app.storesReducer.customerSpend?.unlock.currentlyActive) {
    return app.storesReducer.customerSpend.unlock.boosted;
  }
  return app.storesReducer.customerSpend?.boostEnabled;
};
export const getLogOut = (app: AppState) => app.storesReducer.logOut;
export const getCustomerEmail = (app: AppState) => app.storesReducer.customerDetails?.emailId;
export const getCardUpdateToken = (app: AppState) => app.storesReducer.cardUpdateToken;
export const getAnywhereRewards = (app: AppState) => app.storesReducer.zilchAnywhereRewardsActive;
export const getRetailerRewards = (app: AppState) => app.storesReducer.retailerRewardsActive;
export const getUnMatchRefund = (app: AppState) => app.storesReducer.unMatchRefund;
export const getUnMatchRefundModal = (app: AppState) => app.storesReducer.unMatchRefundModal;
export const getHideRefundModalDashboard = (app: AppState) => app.storesReducer.hideRefundModalDashboard;
