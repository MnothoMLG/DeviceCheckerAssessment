/* eslint-disable @typescript-eslint/no-unused-vars */
import {createReducer} from '@reduxjs/toolkit';
import {addContact, storeContacts} from './actions';

const INITIAL_STATE = {
  contacts: [],
};

export const contactsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(addContact, (state, action) => {
    const {payload} = action;
    return {...state, contacts: [...state.contacts, payload]};
  });
  builder.addCase(storeContacts, (state, action) => {
    const {payload} = action;
    return {contacts: payload};
  });
});
