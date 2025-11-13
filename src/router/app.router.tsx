import { lazy } from 'react';
import { createHashRouter, Navigate } from 'react-router';
import { AdminLayout } from '@/admin/layout/AdminLayout';
import { HeroesLayout } from '@/heroes/layouts/HeroesLayout';
import { HeroPage } from '@/heroes/pages/hero/HeroPage';
import { HomePage } from '@/heroes/pages/home/HomePage';
//import { AdminPage } from '@/admin/pages/AdminPage';
//import { SearchPage } from '@/heroes/pages/search/SearchPage';

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
const AdminPage = lazy(() => import('@/admin/pages/AdminPage'));

//export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
  {
    path: '/',
    element: <HeroesLayout />,
    children: [
      {
        index: true,
        element: <HomePage />, // Puede aparecer como Component
      },
      {
        path: 'heroes/:idSlug',
        element: <HeroPage />, // Puede aparecer como Component
      },
      {
        path: 'search',
        element: <SearchPage />, // Puede aparecer como Component
      },
      {
        path: '*',
        element: <Navigate to={'/'} />, // Puede aparecer como Component
      },
    ],
  },

  {
    path: '/admin',
    element: <AdminLayout />, // Puede aparecer como Component
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
]);
