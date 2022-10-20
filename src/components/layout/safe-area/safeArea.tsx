import React from "react";
import { SafeAreaView } from "react-native";
import styles from "./safeArea.styles";

export class AppSafeAreaBgColors {
  topBgColor?: string;
  bottomBgColor?: string;
}
interface IProps extends AppSafeAreaBgColors {
  children: any;
}

const AppSafeArea: React.FC<IProps> = (props: IProps) => {
  return (
    <>
      <SafeAreaView
        style={{ ...styles.topArea, backgroundColor: props.topBgColor }}
      />
      <SafeAreaView
        style={{ ...styles.SafeArea, backgroundColor: props.bottomBgColor }}
      >
        {props.children}
      </SafeAreaView>
    </>
  );
};

export default React.memo(AppSafeArea);
