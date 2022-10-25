import { createAction } from "@reduxjs/toolkit";
import { AlertState } from './types';

export const closeAlert = createAction("@AlERT/CLOSE");
export const setAndShowFeedback = createAction<AlertState>("@AlERT/SHOW");
