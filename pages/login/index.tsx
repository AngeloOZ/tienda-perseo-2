
import GuestGuard from "src/auth/GuestGuard"
import { Login } from "src/auth"


const PageLogin = () => {

    return (
        <GuestGuard>
            <Login />
        </GuestGuard>
    )
}

export default PageLogin