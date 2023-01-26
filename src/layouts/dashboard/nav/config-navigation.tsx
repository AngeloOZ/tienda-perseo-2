// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// 
import { Dashboard, Inventory, Category, FileCopy } from '@mui/icons-material';


// https://react-icons.github.io/react-icons
// https://mui.com/material-ui/material-icons/

const navConfig = [
  {
    subheader: 'Productos',
    items: [
      {
        title: 'productos',
        path: PATH_DASHBOARD.productos,
        icon: <Inventory />,
      },
      {
        title: 'categorias',
        path: PATH_DASHBOARD.categorias,
        icon: <Category />,
      },
      {
        title: 'archivos',
        path: PATH_DASHBOARD.categorias,
        icon: <FileCopy />,
      },
    ],
  },


  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       // Iconos de plantilla
  //       icon: <Home />,
  //       children: [
  //         { title: 'Four', path: PATH_DASHBOARD.user.four },
  //         { title: 'Five', path: PATH_DASHBOARD.user.five },
  //         { title: 'Six', path: PATH_DASHBOARD.user.six },
  //       ],
  //     },
  //   ],
  // },

];

export default navConfig;
