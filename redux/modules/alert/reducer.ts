import { createReducer } from "@reduxjs/toolkit";
import { closeAlert, setAndShowFeedback } from "./actions";
import { AlertState } from "./types";

const INITIAL_STATE: AlertState = {
  visible: false,
  variant: "success",
  message: "",
  button: {
    label: "",
    onPress: () => {
      return;
    },
  },
};

export const alertReducer = createReducer(INITIAL_STATE, (builder) => {
  builder
    .addCase(closeAlert, (state) => {
      return { ...state, visible: false };
    })
    .addCase(setAndShowFeedback, (state, action) => {
      const { payload } = action;
      return { ...state, ...payload };
    });
});
