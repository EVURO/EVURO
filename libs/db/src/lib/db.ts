import { Svgs } from '@evuro-frontend/assets';

export const adminPanelMenus = [
  { link: '/', svg: Svgs.adminDashboard, name: 'Dashboard' },
  { link: 'products', svg: Svgs.adminPanelMenuProduct, name: 'Product' },
  { link: 'order', svg: Svgs.adminPanelMenuOrder, name: 'Order' },
  { link: 'user', svg: Svgs.adminPanelMenuUser, name: 'User' },
  {
    link: 'app-settings',
    svg: Svgs.adminPanelMenuSetting,
    name: 'App Setting',
    children: [
      { link: '/app-settings/onBoarding', name: 'OnBoarding' },
      { link: '/app-settings/launchPad', name: 'Launchpad' },
    ],
  },
  {
    link: 'settings',
    svg: Svgs.adminPanelMenuSetting,
    name: 'Settings',
    children: [
      { link: '/settings/change-password', name: 'Change Password' },
      { link: '/settings/edit-profile', name: 'Edit Profile' },
    ],
  },
  {
    link: 'reports',
    svg: Svgs.adminReports,
    name: 'Reports',
    children: [{ link: '/reports/revenue', name: 'Revenue' }],
  },
  {
    link: 'complaints',
    svg: Svgs.complaints,
    name: 'Complaints',
    children: [
      { link: '/complaints/dog-owner', name: 'Dog Owner' },
      { link: '/complaints/dog-walker', name: 'Dog Walker' },
    ],
  },
];
