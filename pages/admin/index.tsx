import { NextPage } from 'next'
import AuthGuard from 'src/auth/AuthGuard'

const PageAdmin: NextPage = () => {
    return (
        <AuthGuard>
            Dashboad
        </AuthGuard>
    )
}

export default PageAdmin