/* eslint-disable @typescript-eslint/no-unused-vars */
import {createReducer} from '@reduxjs/toolkit';
import {addContact} from './actions';

const INITIAL_STATE = {
  contacts: [
    {name: 'Mnotho', number: '+27680189220'},
    {name: 'Sfiso', number: '+27727938520'},
  ],
};

export const contactsReducer = createReducer(INITIAL_STATE, builder => {
  builder.addCase(addContact, (state, action) => {
    const {payload} = action;

    console.log('===== new contact payload', {payload});
    return {...state, contacts: [...state.contacts, action.payload]};
  });
});
