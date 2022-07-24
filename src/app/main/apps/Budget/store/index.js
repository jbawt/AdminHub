import { combineReducers } from '@reduxjs/toolkit';
import income from './incomeSlice';
import expenses from './expenseSlice';
import goals from './goalSlice';

const budgetAppReducers = combineReducers({
  income,
  expenses,
  goals,
});

export default budgetAppReducers;
