export interface AlertState {
  visible: boolean;
  variant: 'success' | 'error' | 'info' | 'stall' | 'confirm' | 'transfer';
  message?: string;
  link?: string;
  left?: IButton;
  right?: IButton;
  title?: string;
  voucherTitle?: string;
  onClose?: () => void;
  shopLogo?: string;
}

export interface IButton {
  label: string;
  onPress: () => void;
}
