import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Notes from './pages/Notes';
import Planner from './pages/Planner';
import Pomodoro from './pages/Pomodoro';
import Todo from './pages/Todo';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'expenses', element: <Expenses /> },
        { path: 'notes', element: <Notes /> },
        { path: 'planner', element: <Planner /> },
        { path: 'pomodoro', element: <Pomodoro /> },
        { path: 'todo', element: <Todo /> },
      ],
    },
  ]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
