import { Box } from '@mui/material';

import FormasPagoCart from './FormasPagoCart';


export default function FormaPago() {

	const FormPago = [
		{
			icono: "/img/otros/icono1.png",
			title: "Paga cómodo y seguro"
		},
		{
			icono: "/img/otros/icono2.png",
			title: "Hasta 12 cuotas"
		},
		{
			icono: "/img/otros/icono3.png",
			title: "Tarjeta de débito"
		}
	]

	return (
		<Box
			gap={2}
			width="100%"
			display="flex"
			justifyContent='center'
			flexWrap="wrap"
			paddingTop={2}
		>
			{FormPago.map((fp) => (
				<FormasPagoCart
					key={fp.title}
					FormPago={fp}
				/>
			))}
		</Box>
	);
};
