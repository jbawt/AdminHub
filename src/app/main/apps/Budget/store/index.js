import { combineReducers } from '@reduxjs/toolkit';
import income from './incomeSlice';
import expenses from './expenseSlice';
import goals from './goalSlice';
import card from './cardSlice';

const budgetAppReducers = combineReducers({
  income,
  expenses,
  goals,
  card,
});

export default budgetAppReducers;
