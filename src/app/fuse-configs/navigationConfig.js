import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboards',
    title: 'Dashboards',
    translate: 'DASHBOARDS',
    type: 'group',
    icon: 'dashboard',
    children: [
      {
        id: 'project-dashboard',
        title: 'Github Issues',
        type: 'item',
        icon: 'bug_report',
        url: 'apps/dashboards/project',
      },
    ],
  },
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'budget',
        title: 'Budget',
        type: 'collapse',
        icon: 'attach_money',
        url: 'apps/budget',
        children: [
          {
            id: 'budget-overview',
            title: 'Overview',
            type: 'item',
            url: 'apps/budget/overview',
          },
          {
            id: 'budget-manage',
            title: 'Manage',
            type: 'item',
            url: 'apps/budget/manage',
            end: true,
          },
        ],
      },
      {
        id: 'calendar',
        title: 'Calendar',
        translate: 'CALENDAR',
        type: 'item',
        icon: 'today',
        url: 'apps/calendar',
      },
      {
        id: 'todo',
        title: 'To-Do',
        translate: 'TODO',
        type: 'item',
        icon: 'check_box',
        url: 'apps/todo',
      },
      {
        id: 'scrumboard',
        title: 'Scrumboard',
        translate: 'SCRUMBOARD',
        type: 'item',
        icon: 'assessment',
        url: 'apps/scrumboard',
      },
      {
        id: 'notes',
        title: 'Notes',
        translate: 'NOTES',
        type: 'item',
        icon: 'note',
        url: 'apps/notes',
      },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    translate: 'TOOLS',
    type: 'group',
    icon: 'handyman',
    children: [
      // {
      //   id: '1',
      //   title: 'E-Commerce',
      //   translate: 'ECOMMERCE',
      //   type: 'collapse',
      //   icon: 'shopping_cart',
      //   url: 'apps/e-commerce',
      //   children: [
      //     {
      //       id: 'e-commerce-products',
      //       title: 'Products',
      //       type: 'item',
      //       url: 'apps/e-commerce/products',
      //       end: true,
      //     },
      //     {
      //       id: 'e-commerce-product-detail',
      //       title: 'Product Detail',
      //       type: 'item',
      //       url: 'apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
      //     },
      //     {
      //       id: 'e-commerce-new-product',
      //       title: 'New Product',
      //       type: 'item',
      //       url: 'apps/e-commerce/products/new',
      //     },
      //     {
      //       id: 'e-commerce-orders',
      //       title: 'Orders',
      //       type: 'item',
      //       url: 'apps/e-commerce/orders',
      //       end: true,
      //     },
      //     {
      //       id: 'e-commerce-order-detail',
      //       title: 'Order Detail',
      //       type: 'item',
      //       url: 'apps/e-commerce/orders/1',
      //     },
      //   ],
      // },
      {
        id: 'file-manager',
        title: 'File Manager',
        translate: 'FILE_MANAGER',
        type: 'item',
        icon: 'folder',
        url: 'apps/file-manager',
      },
      {
        id: 'contacts',
        title: 'Contacts',
        translate: 'CONTACTS',
        type: 'item',
        icon: 'account_box',
        url: 'apps/contacts/all',
      },
      {
        id: 'chat',
        title: 'Chat',
        translate: 'CHAT',
        type: 'item',
        icon: 'chat',
        url: 'apps/chat',
        badge: {
          title: 13,
          bg: 'rgb(9, 210, 97)',
          fg: '#FFFFFF',
        },
      },
      {
        id: 'mail',
        title: 'Mail',
        translate: 'MAIL',
        type: 'item',
        icon: 'email',
        url: 'apps/mail',
        badge: {
          title: 25,
          bg: '#F44336',
          fg: '#FFFFFF',
        },
      },
    ],
  },
  // {
  //   id: 'learning',
  //   title: 'Learning',
  //   translate: 'LEARNING',
  //   type: 'group',
  //   icon: 'school',
  //   children: [
  //     {
  //       id: 'academy',
  //       title: 'Academy',
  //       translate: 'ACADEMY',
  //       type: 'item',
  //       icon: 'school',
  //       url: 'apps/academy',
  //     },
  //   ],
  // },
];

export default navigationConfig;
