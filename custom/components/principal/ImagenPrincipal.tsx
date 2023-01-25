import * as React from 'react';
import Box from '@mui/material/Box';
import Image from 'src/components/image/Image';



export default function ImagenPricipal() {
    return(
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
            <Image
            //src='https://http2.mlstatic.com/storage/homes-korriban/assets/images/exhibitors/fallbacks/es-desktop.jpg'
            src='https://img.freepik.com/vector-premium/paisaje-urbano-verano-larga-noche-horizontal-panorama-ciudad-ilustracion-plana_318844-225.jpg?w=2000'
            />
        </Box>

    )
}