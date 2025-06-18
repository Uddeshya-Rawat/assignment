import { createBrowserRouter } from 'react-router-dom';

import AllBoard from './AllBoard';
import App from '../App';
import CreateBoard from './CreateBoard';
import BoardDetail from './BoardDetail';


const AppRouter = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <AllBoard/>
      },
      {
        path: '/create',
        element: <CreateBoard/>
      },
      {
        path: '/board/:id',
        element: <BoardDetail/>
      }
    ]
  }
]);

export default AppRouter;
