import {createAction} from '@reduxjs/toolkit';
export const addContact =
  createAction<{number: string; name: string}>('@CONTACTS/ADD');
