import { Inventory, Category } from '@mui/icons-material';
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
        children: [
          { title: 'Listar', path: PATH_DASHBOARD.productos.root },
          { title: 'Agregar', path: PATH_DASHBOARD.productos.agregar },
        ]
      },
      {
        title: 'categorias',
        path: PATH_DASHBOARD.categorias.root,
        icon: <Category />,
        // roles: ['vendedorcd'],
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
        title: 'productos',
        path: '#',
        icon: <Inventory />,
        caption: 'Solo vendedores',
      },
    ],
  },

];

export default navConfig;