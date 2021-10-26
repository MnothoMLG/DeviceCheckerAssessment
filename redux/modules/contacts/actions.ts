import {createAction} from '@reduxjs/toolkit';
import {Contact} from './types';
export const addContact = createAction<Contact>('@CONTACTS/ADD');
export const storeContacts = createAction<Contact[]>('@CONTACTS/STORE');
