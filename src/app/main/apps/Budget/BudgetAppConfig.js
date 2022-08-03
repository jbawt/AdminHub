import { lazy } from 'react';

const BudgetApp = lazy(() => import('./BudgetApp'));

const BudgetAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/budget',
      element: <BudgetApp />,
    },
  ],
};

export default BudgetAppConfig;
