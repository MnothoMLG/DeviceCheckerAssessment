// Module main state
export interface AlertState {
  visible: boolean;
  variant: "success" | "error" | "info" | "stall";
  message: string;
  button?: IButton;
}
export interface IButton {
  label: string;
  onPress: () => void;
}
