import { Inventory, Category } from '@mui/icons-material';
import { MdLoyalty } from 'react-icons/md';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';


// https://react-icons.github.io/react-icons
// https://mui.com/material-ui/material-icons/

const navConfig = [
  {
    subheader: 'Productos',
    items: [
      {
        title: 'productos',
        path: PATH_DASHBOARD.productos.root,
        icon: <Inventory />,
        roles: ['admin','editor'],
        children: [
          { title: 'Listar', path: PATH_DASHBOARD.productos.root },
          {
            title: 'Agregar', path: PATH_DASHBOARD.productos.agregar,
          },
        ]
      },
      {
        title: 'categorias',
        path: PATH_DASHBOARD.categorias.root,
        icon: <Category />,
        roles: ['admin','editor'],
        children: [
          { title: 'Listar', path: PATH_DASHBOARD.categorias.root, },
          { title: 'Agregar', path: PATH_DASHBOARD.categorias.agregar },
        ]
      },
    ],
  },
  {
    subheader: 'Ventas',
    items: [
      {
        roles: ['admin','vendedor'],
        title: 'Ventas',
        path: PATH_DASHBOARD.ventas.root,
        icon: <MdLoyalty />,
      },
    ],
  },

];

export default navConfig;