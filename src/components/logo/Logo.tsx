import { forwardRef, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Box, Link, BoxProps } from '@mui/material';
// import { Image } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { DEFAULT_VENDEDOR } from 'src/routes/paths';
import Image from '../image/Image';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {

    const { query: { vendedor } } = useRouter() as any;
    const [idVendedor] = useState<string>(vendedor || DEFAULT_VENDEDOR.toString());

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 120,
          height: 30,
          display: 'inline-flex',
          ...sx,
        }}
      /*   {...other} */
      >
        <Image
          alt="logo"
          src="https://tienda.socio-perseo.com/assets/media/perseologo.png"
          sx={{ width: "100%", height: "100%" }}
        />

      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={NextLink} href={`/${idVendedor}/tienda`} sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
