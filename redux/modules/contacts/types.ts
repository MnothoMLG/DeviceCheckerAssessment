// Module main state
export interface AlertState {
  visible: boolean;
  variant: 'success' | 'error' | 'info' | 'stall';
  message: string;
}
export interface Contact {
  number: string;
  name: string;
}
