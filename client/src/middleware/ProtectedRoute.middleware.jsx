import {Navigate, Outlet} from 'react-router-dom'
import { useAuth } from '../context/Auth.context'

export default function ProtectedRoute() {
    const {accessToken, loading} = useAuth()

    if(loading){
        return <div>
            Painters' Diary Loading ...  </div>
    }

    if(!accessToken){
        return <Navigate to={'/auth/login'} replace />
    }
    return <Outlet/>
}