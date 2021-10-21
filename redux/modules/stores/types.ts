import { Transaction } from "@utils/interfaces/transaction.interface";
export interface CustomerState {
  customerDetails?: Customer;
  customerSpend?: CustomerSpend;
  virtualCard?: VirtualCard;
  customerPlan?: CustomerPlan;
  regenerateCard?: RegenerateCard;
  transactionHistory?: TransactionHistory;
  zilchAnywhereRewardsActive: boolean;
  retailerRewardsActive: boolean;
  logOut?: boolean;
  cardUpdateToken?: string;
  unMatchRefund?: UnMatchRefund[];
  unMatchRefundModal?: boolean;
  hideRefundModalDashboard?: boolean;
}

export interface AuthState {
  accessToken: string;
  expiresIn: number;
}

export interface Customer {
  customerId: string;
  emailId: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  dob: string;
}

export interface CustomerSpend {
  availableToSpend: number;
  boostEnabled: boolean;
  unlock: {
    expiryTime: number;
    boosted: boolean;
    currentlyActive: boolean;
  };
  ignoreTransactionFee: boolean;
  hasActivePaymentCard: boolean;
  id: number;
  supportContactNumber: string;
  companyLogo: string;
  companyName: string;
  description: string;
  backgroundImage: string;
  landscapeLogo: string;
  portraitLogo: string;
  fuzzyResult: boolean;
  transactionFee: number;
}

export interface VirtualCard {
  image: string;
  cardValid: boolean;
  publicToken: string;
  customerAccountId: number;
  blockedReason: string;
  cardExpDate: string;
  blockedBy: string;
  PAN: string;
}

export interface CustomerPlan {
  maxTransactionFee: number;
  ignoreTransactionFee: boolean;
  ignoreTransactionReason: string;
  allowedBalance: number;
  numberOfPayments: number;
  paymentFrequency: number;
  anywhereEnabled: boolean;
  hasBehaviourScoredPlan: boolean;
  idvRequired: boolean;
  instalmentsOverdue: boolean;
  snoozeAllowed: boolean;
  snoozeFee: number;
  rewards: {
    totalConverted: number;
    totalAmount: number;
  };
}

export interface RegenerateCard {
  CVV: string;
  PAN: string;
  actionCode: string;
  cardExpDate: string;
  cardValid: boolean;
  publicToken: string;
}

export interface RegenerateCardRequest {
  PAN: string;
  cardExpDate: string;
  publicToken: string;
}

export interface TransactionHistory {
  firstTransaction: string;
  totalOpenPurchaseAmount: number;
  hasNext: boolean;
  openTransaction: Array<Transaction>;
  closedTransaction: Array<Transaction>;
}

export interface CardUpdateTokenResponse {
  token: string;
}

export interface UnMatchRefundResponse {
  returns: UnMatchRefund[];
  paging: {
    count: number;
    currentPage: number;
    hasMore: boolean;
    limit: number;
    totalPages: number;
  };
}
export interface UnMatchRefund extends UnMatchRefundMatch {
  matches: Array<UnMatchRefundMatch>;
}

export interface UnMatchRefundMatch {
  amount: number;
  date: Date;
  retailer: string;
  transactionId: string;
}

export interface RefundReturnRequest {
  purchaseTransactionId: string;
  returnTransactionId: string;
}

export interface UpdateBoostResponse {
  boostEnabled: boolean;
  customerId: number;
}
