// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_ADMIN = '/admin';

export const PATH_DASHBOARD = {
  root: PATH_ADMIN,
  productos: {
    root: path(PATH_ADMIN, '/productos'),
    agregar: path(PATH_ADMIN, '/productos/agregar'),
  },
  categorias: path(PATH_ADMIN, '/categorias'),

  // root: ROOTS_DASHBOARD,
  // one: path(ROOTS_DASHBOARD, '/one'),
  // two: path(ROOTS_DASHBOARD, '/two'),
  // three: path(ROOTS_DASHBOARD, '/three'),
  // user: {
  //   root: path(ROOTS_DASHBOARD, '/user'),
  //   four: path(ROOTS_DASHBOARD, '/user/four'),
  //   five: path(ROOTS_DASHBOARD, '/user/five'),
  //   six: path(ROOTS_DASHBOARD, '/user/six'),
  // },
};
