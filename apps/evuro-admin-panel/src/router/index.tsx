import { createBrowserRouter, redirect } from 'react-router-dom';
import AuthLayout from '../layout/Auth';
import DashboardLayout from '../layout/Dashboard';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { Login } from '../pages/Login';
import React from 'react';

async function protectedLoader({ request }: LoaderFunctionArgs) {
  const data = localStorage.getItem('isAuth');
  if (!data) {
    const params = new URLSearchParams();
    params.set('from', new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return null;
}
async function loginLoader() {
  const data = localStorage.getItem('isAuth');

  if (data) {
    return redirect('/');
  }
  return null;
}

export default createBrowserRouter([
  {
    path: '/',
    loader: protectedLoader,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        async lazy() {
          const { Dashboard } = await import('../pages/Dashboard');
          return { Component: Dashboard };
        },
      },
      {
        path: 'products',
        async lazy() {
          try {
            const { Product } = await import('../pages/Dashboard');
            return { Component: Product };
          } catch (error) {
            if (error.message.includes('dynamically imported module')) {
              window.location.reload();
            }
            return {};
          }
        },
      },
      {
        path: 'order',
        async lazy() {
          try {
            const { Order } = await import('../pages/Dashboard');
            return { Component: Order };
          } catch (error) {
            if (error.message.includes('dynamically imported module')) {
              window.location.reload();
            }
            return {};
          }
        },
      },
      {
        path: 'order/:orderId',
        async lazy() {
          try {
            const { OrderSummary } = await import('../pages/Dashboard');
            return { Component: OrderSummary };
          } catch (error) {
            if (error.message.includes('dynamically imported module')) {
              window.location.reload();
            }
            return {};
          }
        },
      },
      {
        path: 'user',
        async lazy() {
          try {
            const { User } = await import('../pages/Dashboard');
            return { Component: User };
          } catch (error) {
            if (error.message.includes('dynamically imported module')) {
              window.location.reload();
            }
            return {};
          }
        },
      },
      {
        path: 'user/:userId',
        async lazy() {
          try {
            const { CustomerSummary } = await import('../pages/Dashboard');
            return { Component: CustomerSummary };
          } catch (error) {
            if (error.message.includes('dynamically imported module')) {
              window.location.reload();
            }
            return {};
          }
        },
      },
      {
        path: 'settings',
        children: [
          {
            index: true,
            path: 'change-password',
            async lazy() {
              try {
                const { ChangePassword } = await import('../pages/Dashboard');
                return { Component: ChangePassword };
              } catch (error) {
                if (error.message.includes('dynamically imported module')) {
                  window.location.reload();
                }
                return {};
              }
            },
          },
          {
            path: 'edit-profile',
            async lazy() {
              try {
                const { EditProfile } = await import('../pages/Dashboard');
                return { Component: EditProfile };
              } catch (error) {
                if (error.message.includes('dynamically imported module')) {
                  window.location.reload();
                }
                return {};
              }
            },
          },
        ],
      },
      {
        path: 'app-settings',
        children: [
          {
            index: true,
            path: 'onBoarding',
            async lazy() {
              try {
                const { OnBoarding } = await import('../pages/Dashboard');
                return { Component: OnBoarding };
              } catch (error) {
                if (error.message.includes('dynamically imported module')) {
                  window.location.reload();
                }
                return {};
              }
            },
          },
          {
            path: 'launchPad',
            async lazy() {
              try {
                const { LaunchPad } = await import('../pages/Dashboard');
                return { Component: LaunchPad };
              } catch (error) {
                if (error.message.includes('dynamically imported module')) {
                  window.location.reload();
                }
                return {};
              }
            },
          },
        ],
      },
      {
        path: 'reports',
        children: [
          {
            index: true,
            path: 'revenue',
            async lazy() {
              try {
                const { Revenue } = await import('../pages/Dashboard');
                return { Component: Revenue };
              } catch (error) {
                if (error.message.includes('dynamically imported module')) {
                  window.location.reload();
                }
                return {};
              }
            },
          },
        ],
      },
      {
        path: 'complaints',
        children: [
          {
            index: true,
            path: 'dog-walker',
            async lazy() {
              try {
                const { DogWalker } = await import('../pages/Dashboard');
                return { Component: DogWalker };
              } catch (error) {
                if (error.message.includes('dynamically imported module')) {
                  window.location.reload();
                }
                return {};
              }
            },
          },
          {
            path: 'dog-owner',
            async lazy() {
              try {
                const { DogOwner } = await import('../pages/Dashboard');
                return { Component: DogOwner };
              } catch (error) {
                if (error.message.includes('dynamically imported module')) {
                  window.location.reload();
                }
                return {};
              }
            },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    async lazy() {
      try {
        const { NoMatch } = await import('../pages/NoMatch');
        return { Component: NoMatch };
      } catch (error: any) {
        if (error.message.includes('dynamically imported module')) {
          window.location.reload();
        }
        return {};
      }
    },
  },
  {
    element: <AuthLayout />,
    loader: loginLoader,
    children: [
      {
        path: 'login',
        element: <Login />,
      },

      {
        path: 'otp-verification',
        async lazy() {
          try {
            const { OTPVerification } = await import(
              '../pages/OTPVerification'
            );
            return { Component: OTPVerification };
          } catch (error) {
            if (error.message.includes('dynamically imported module')) {
              window.location.reload();
            }
            return {};
          }
        },
      },
      {
        path: 'forget_password',
        async lazy() {
          try {
            const { ForgetPassword } = await import('../pages/ForgetPassword');
            return { Component: ForgetPassword };
          } catch (error) {
            if (error.message.includes('dynamically imported module')) {
              window.location.reload();
            }
            return {};
          }
        },
      },
      {
        path: 'reset_password',
        async lazy() {
          try {
            const { ResetPassword } = await import('../pages/ResetPassword');
            return { Component: ResetPassword };
          } catch (error) {
            if (error.message.includes('dynamically imported module')) {
              window.location.reload();
            }
            return {};
          }
        },
      },
    ],
  },
]);
