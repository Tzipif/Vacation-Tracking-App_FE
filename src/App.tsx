import React, { useEffect, useState } from 'react'
import AppBoddy from './components/app layout comp/appBoddy'
import AppHeader from './components/app layout comp/appHeader'
import './components/app layout comp/appLayout.css'
import { vacationType } from './types/vocationType'
import AppFooter from './components/app layout comp/appFooter'
import { SnackbarProvider } from 'notistack'

type Props = {
    
}

const App = (props: Props) => {

    const [userName, setUserName] = useState<string>('User');
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isToken, setIsToken] = useState<boolean>(false);
    const [user, setUser] = useState<object | string>('');
    const [vacations, setVacations] = useState<vacationType[]>([])
    const [page, setPage] = useState<number>(0);
    const [vacationNum, setVacationNum] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);


    const parseToken = async (token: string) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            console.log(payload);

            if (payload && payload.user) {
                setUserName(`${payload.user.first_name} ${payload.user.last_name}` || 'User');
                setUser(payload);
                setIsAdmin(payload.user.role === 'admin');
                setIsToken(true);
            } else {
                setIsToken(false);
            }
        } catch (error) {
            console.error("Invalid token:", error);
            setIsToken(false);
        }
    }

    useEffect(() => {
        const tokenUser = localStorage.getItem('token');
        if (tokenUser) {
            parseToken(tokenUser).finally(() => setLoading(false));
        } else {
            setIsToken(false);
            setLoading(false);
        }
    }, []);

    return (
        <SnackbarProvider maxSnack={10} autoHideDuration={4000} style={{ maxWidth: '200px' }}>
            <div id='app'>
                <AppHeader userName={userName} admin={isAdmin} />
                {loading ? <div id='body'>Loading...</div> :
                    <AppBoddy
                        userName={userName}
                        isToken={isToken}
                        admin={isAdmin}
                        user={user}
                        setVacations={setVacations}
                        setVacationNum={setVacationNum}
                        vacations={vacations}
                        page={page}
                        setPage={setPage}
                        vacationNum={vacationNum}
                    />}
                <AppFooter />
            </div>
        </SnackbarProvider>
    );
}


export default App