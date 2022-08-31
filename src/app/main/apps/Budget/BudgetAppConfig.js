import { lazy } from 'react';

const BudgetApp = lazy(() => import('./BudgetApp'));
const ManageBudget = lazy(() => import('./manageBudget/ManageBudget'));

const BudgetAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/budget/overview',
      element: <BudgetApp />,
    },
    {
      path: 'apps/budget/manage',
      element: <ManageBudget />,
    },
  ],
};

export default BudgetAppConfig;
