import GuestGuard from "src/auth/GuestGuard"
import { Login } from "src/auth"

// eslint-disable-next-line
const PageLogin = () => {
    return (
        <GuestGuard>
            <Login />
        </GuestGuard>
    )
}

export default PageLogin