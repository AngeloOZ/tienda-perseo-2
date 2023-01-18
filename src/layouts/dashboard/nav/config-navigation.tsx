// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';
import { Dashboard, Home } from '@mui/icons-material';
import { AiOutlineDashboard } from 'react-icons/ai';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// https://react-icons.github.io/react-icons
// https://mui.com/material-ui/material-icons/

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'General',
    items: [
      // Iconos de Material Icons
      { title: 'Home', path: '/home', icon: <Home /> },
      { title: 'One', path: PATH_DASHBOARD.one, icon: <Dashboard /> },
      // Iconos de react-icons
      { title: 'Two', path: PATH_DASHBOARD.two, icon: <AiOutlineDashboard size={20} /> },
      { title: 'Three', path: PATH_DASHBOARD.three, icon: <TbBrandGoogleAnalytics size={20} />},
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        // Iconos de plantilla
        icon: ICONS.user,
        children: [
          { title: 'Four', path: PATH_DASHBOARD.user.four },
          { title: 'Five', path: PATH_DASHBOARD.user.five },
          { title: 'Six', path: PATH_DASHBOARD.user.six },
        ],
      },
    ],
  },
];

export default navConfig;
