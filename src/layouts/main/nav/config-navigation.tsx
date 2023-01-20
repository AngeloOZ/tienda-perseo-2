// routes
// config
import { PATH_AFTER_LOGIN } from '../../../config-global';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'Components',
    icon: <Iconify icon="ic:round-grain" />,
    path: "#",
  },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify icon="eva:file-fill" />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'About us', path: "#" },
          { title: 'Contact us', path: "#" },
          { title: 'FAQs', path: "#" },
          { title: 'Pricing', path: "#" },
          { title: 'Payment', path: "#" },
          { title: 'Maintenance', path: "#" },
          { title: 'Coming Soon', path: "#" },
        ],
      },
      {
        subheader: 'Authentication',
        items: [
          { title: 'Login', path: "#" },
          { title: 'Register', path: "#" },
          { title: 'Reset password', path: "#" },
          { title: 'Verify code', path: "#" },
        ],
      },
      {
        subheader: 'Error',
        items: [
          { title: 'Page 403', path: "#" },
          { title: 'Page 404', path: "#" },
          { title: 'Page 500', path: "#" },
        ],
      },
      {
        subheader: 'Dashboard',
        items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN }],
      },
    ],
  },
  {
    title: 'Documentation',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: "#",
  },
];

export default navConfig;
