import { combineReducers } from '@reduxjs/toolkit';
import income from './incomeSlice';
import expenses from './expenseSlice';

const budgetAppReducers = combineReducers({
  income,
  expenses,
});

export default budgetAppReducers;
