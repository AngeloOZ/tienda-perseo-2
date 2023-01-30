import { NextPage, GetServerSideProps } from 'next';
import { tiendaApi } from 'custom/api';
import { ICategoria, IProduct } from 'src/@types/product';
import { ShopProducts } from 'src/components/e-commerce/shop';
import MainLayout from 'src/layouts/main/MainLayout';
import ImagenPricipal from 'custom/components/principal/ImagenPrincipal';
import FormaPago from 'custom/components/principal/FormaPago';
import { Categoria } from 'custom/components/principal/Categoria';
import { Grid } from '@mui/material';

interface Props {
  products: IProduct[];
}

const index: NextPage<Props> = ({ products }) => {

  const categoria: ICategoria[] = [
    {
      id: '1',
      nombre: 'Categoria1',
      icono: 'https://cdn-icons-png.flaticon.com/512/2432/2432596.png',
    },

    {
      id: '2',
      nombre: 'Categoria2',
      icono: 'https://cdn-icons-png.flaticon.com/512/2432/2432596.png',
    },

    {
      id: '3',
      nombre: 'Categoria3',
      icono: 'https://cdn-icons-png.flaticon.com/512/2432/2432596.png',
    },

    {
      id: '4',
      nombre: 'Categoria4',
      icono: 'https://cdn-icons-png.flaticon.com/512/2432/2432596.png',
    },

    {
      id: '5',
      nombre: 'Categoria5',
      icono: 'https://cdn-icons-png.flaticon.com/512/2432/2432596.png',
    },

    
    
  ];

  return (
    <MainLayout>
      <ImagenPricipal />
       <Grid container justifyContent="center" p={2}>
        <FormaPago />      
 
          <Categoria categoria={categoria} />
      </Grid>
      <ShopProducts products={products} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await tiendaApi.get(`/products`);  
  return {
    props: {
      products: res.data
    },
  };
};

export default index;
