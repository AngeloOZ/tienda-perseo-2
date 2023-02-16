import { FC, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router";

import * as Yup from 'yup';
import { Box, BoxProps, Card, CardContent, Stack } from "@mui/material"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";

import FormProvider, { RHFTextField } from "src/components/hook-form";
import { useSnackbar } from 'src/components/snackbar';
import { FormFactura } from "interfaces";
import { tiendaApi } from "custom/api";
import { PATH_DASHBOARD } from "src/routes/paths";

type FormValuesProps = FormFactura
interface Props extends BoxProps {
	initDdataEdit: FormFactura;
}

export const EditarDatoVentas: FC<Props> = ({ initDdataEdit }) => {
	const [defaultValuesData, setDefaultValuesData] = useState<FormValuesProps>();
	const { enqueueSnackbar } = useSnackbar();
	const router = useRouter();

	useEffect(() => {
		if (initDdataEdit) {
			setDefaultValuesData(initDdataEdit);
		}
	}, []);

	useEffect(() => {
		if (defaultValuesData) {
			reset(defaultValuesData);
		}
	}, [defaultValuesData])

	const newCategorySchema = Yup.object().shape({
		nombre: Yup.string().required('El nombre es necesario para la factura').trim(),
		ruc: Yup.string().required('La identificación es necesaria para la factura').matches(/^[0-9]+$/, 'La identificación solo puede contener números').min(10, 'La identificación debe tener al menos 10 dígitos').max(13, 'La identificación no puede tener más de 13 dígitos').trim(),
		whatsapp: Yup.string().required('El número de WhatsApp es necesario').matches(/^[0-9+]+$/, 'El número de WhatsApp solo puede contener números').max(13, 'El número de WhatsApp no puede tener más de 13 números').trim(),
		correo: Yup.string().required('El correo electrónico es necesario para la factura').email('El correo electrónico no es válido').trim(),
		concepto: Yup.string().required('El concepto es necesario para la factura').trim(),
	});

	const defaultValues = useMemo<FormValuesProps>(() => ({
		id: defaultValuesData?.id!,
		nombre: defaultValuesData?.nombre || '',
		ruc: defaultValuesData?.ruc || '',
		whatsapp: defaultValuesData?.whatsapp || '',
		correo: defaultValuesData?.correo || '',
		concepto: defaultValuesData?.concepto || '',
	}), [defaultValuesData]);

	const methods = useForm<FormValuesProps>({
		resolver: yupResolver(newCategorySchema),
		defaultValues,
	});

	const {
		reset,
		handleSubmit,
		formState: { isSubmitting },
	} = methods;

	const onSubmitEvent = async (datos: FormFactura) => {
		try {
			const { data } = await tiendaApi.put('/ventas', datos);
			enqueueSnackbar('Datos de la venta actualizados correctamente', { variant: 'success' });
			router.push(PATH_DASHBOARD.ventas.root);
		} catch (error) {
			enqueueSnackbar('Hubo un error al actualizar los datos de la venta', { variant: 'error' });
		}
	}

	return (
		<Box >
			<Card>
				<CardContent>
					<FormProvider methods={methods} onSubmit={handleSubmit(onSubmitEvent)}>
						<Stack spacing={2}>
							<RHFTextField sx={{ fontSize: 10 }} size="small" name="nombre" label="Nombres" />
							<RHFTextField size="small" type="number" name="ruc" label="Identificación" />
							<RHFTextField size="small" type="tel" name="whatsapp" label="WhatsApp" />
							<RHFTextField size="small" type="email" name="correo" label="Correo electrónico" />

							<RHFTextField size="small" type="text" name="concepto" label="Concepto factura" />

							<Stack direction="row-reverse" spacing={2}  >
								<LoadingButton
									type="submit"
									variant="contained"
									loading={isSubmitting}
								>
									Guardar
								</LoadingButton>
							</Stack>
						</Stack>
					</FormProvider>
				</CardContent>
			</Card>
		</Box>
	)
}
