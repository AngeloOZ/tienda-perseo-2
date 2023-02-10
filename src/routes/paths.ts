// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

// const ROOTS_DASHBOARD = '/dashboard';

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
    editar: path(PATH_ADMIN, '/productos/editar'),
  },
  categorias: {
    root: path(PATH_ADMIN, '/categorias'),
    agregar: path(PATH_ADMIN, '/categorias/agregar'),
    editar: path(PATH_ADMIN, '/categorias/editar'),
  },
  ventas: {
    root: path(PATH_ADMIN, '/ventas'),
    editar: path(PATH_ADMIN, '/ventas/editar'),
  }
};

export const PATH_TIENDA = '/tienda';

export const PATH_PAGE_TIENDA = {
  tienda: {
    root: PATH_TIENDA,
    resumen: path(PATH_TIENDA, '/resumen'),
    finalizar: path(PATH_TIENDA, '/resumen/finalizar'),
  }
};
