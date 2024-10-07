import daisyui from 'daisyui';
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    colors: {
      white: 'white',
      black: 'black',
      red: 'red',
      lightGray: '#959595',
      launchPadPlaceHolder: '#B0B0B0',
      darkGray: '#5B5B5B',
      darkBlue: '#196F92',
      webSidebarMenuActive: '#196F9233',
      otpGrayText: '#A7A7A7',
      skin: 'rgba(244, 181, 71, 0.60)',
      alphaLightGray: '#D9D9D9',
      alphaLightBlack: '#00000099',
      dashboardLayoutBackground: '#F7F7F7',
      tablePaginationShadow: '#00000026',
      error: '#E83B2E',
      success: '#2fa345',
      info: '#3659E3',
      staryellow: '#FFAD0E',
      iconColor: '#B7B7B7',
      euvroBlack: '#000000',
      euvroWhite: '#FFFFFF',
      buttonWhite: ' #FFFCFC',
      firstLaunchPadImage: '#FB9595',
      secondLaunchPadImage: '#8DF49E',
      thirdLaunchPadImage: '#95FBFB',
      fourthLaunchPadImage: '#DEBDF8',
      completeStatus: '#17E228',
      pendingStatus: '#184BFF',
      inProgressStatus: '#FF8A00',
      completedStatus: '#17E228',
      processingStatus: '#FFD600',
      cancelledStatus: '#FF0000',
      dashboardEarningCardGradient: '#5EBEF5',
      dashboardEarningCardGradient2: '#1390D7',
      dashboardOrderCardGradient: '#D581FC',
      dashboardOrderCardGradient2: '#A546D2',
      dashboardUserCardGradient: '#FE8CD1',
      dashboardUserCardGradient2: '#FD39AF',
      purpleProgressColor: '#5F27CD',
      redProgressColor: '#FF6B6B',
      yellowProgressColor: '#FFC029',
      orangeProgressColor: '#FF8918',
      summaryCashGradient: '#5EBEF5',
      summaryCashGradient2: '#1390D7',
      summaryOrderGradient: '#D581FC',
      summaryOrderGradient2: '#A546D2',
      summaryCompletedGradient: '#FE8CD1',
      summaryCompletedGradient2: '#FD39AF',
      summarycancelledGradient: '#57F5FF',
      summarycancelledGradient2: '#45C4CC',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    extend: {
      fontFamily: {
        sans: [
          '"Poppins"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      gridTemplateRows: {
        12: 'repeat(12, minmax(0, 1fr))',
      },
      boxShadow: {
        paginationShadow: '0 2px 10px 0 #00000026',
        drowDownShadow: '0 5px 14px -5px rgba(0, 0, 0, 0.3)',
      },
    },
  },

  plugins: [daisyui],
};
