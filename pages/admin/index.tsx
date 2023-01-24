import { Container } from '@mui/material'
import Head from 'next/head'


import { useSettingsContext } from 'src/components/settings'
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import { BlogNewPostForm } from 'src/sections/blog'
// import BlogNewPostForm from 'src/sections/blog/Nuevo'


PageAdmin.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

export default function PageAdmin() {
    const { themeStretch } = useSettingsContext();

    return (
        <>
            <Head>
                <title> Blog: New Post | Minimal UI</title>
            </Head>

            <Container maxWidth={themeStretch ? false : 'lg'}>
                <BlogNewPostForm />
            </Container>
        </>
    )
} 1