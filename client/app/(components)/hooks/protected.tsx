import {redirect} from 'next/navigation';
import userAuth from './userAuth';

export default function Protected({children}: {children: React.ReactNode}) {
    const isAuthenticated = userAuth();
    return isAuthenticated ? children : redirect('/')
}