import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import VacationList from '../vocation comp/vocationList';
import { vacationType } from '../../types/vocationType';
import RegisterLog from '../users comp/registerLog';
import LogIn from '../users comp/logIn';
import EditVacation from '../Admin permission comp/vacation admin page/editVacation';
import ReportPage from '../Admin permission comp/reports admin/reportPage';
import CreateNewVacation from '../Admin permission comp/vacation admin page/createNewVacation';
import AdminButtons from '../Admin permission comp/Admin button/AdminButtons';
import { Pagination, PaginationItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AllUserButtons from '../filters/allUserButtons';
import './appLayout.css';

type Props = {
    setVacations: Dispatch<SetStateAction<vacationType[]>>;
    vacations: vacationType[];
    isToken: boolean;
    admin: boolean;
    user: object | string;
    userName: string;
    vacationNum: number;
    page: number
    setPage: Dispatch<SetStateAction<number>>
    setVacationNum: Dispatch<SetStateAction<number>>;
}

const AppBoddy = (props: Props) => {

    const [editDataVacation, setEditDataVacation] = useState<boolean>(false);
    const totalPages = Math.ceil(props.vacationNum / 10);
    const location = useLocation();

    useEffect(() => {
        setEditDataVacation(false);
    }, [editDataVacation]);


    function handleDeleteVacation(vocationId: number) : void {
        props.setVacations((prevVocations) => prevVocations.filter(v => v.id !== vocationId));
    }

    function handlePageChange(event: React.ChangeEvent<unknown>, value: number) : void {
        props.setPage(value - 1);
    }

    const isVacationPage = location.pathname === '/home' || location.pathname === '/' || location.pathname === '/report';
    console.log("Token Status:", props.isToken);


    return (
        <div id='body'>
            <div id='high-body'>
                {isVacationPage && (
                    <Pagination
                        count={totalPages}
                        page={props.page + 1}
                        onChange={handlePageChange}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                {...item}
                            />
                        )}
                    />
                )}

                {isVacationPage && (props.userName === 'User' ? null :
                    props.admin ?
                        <AdminButtons
                            setVacations={props.setVacations}
                            page={props.page}
                            setVacationNum={props.setVacationNum}
                        />
                        :
                        <AllUserButtons
                            setVacations={props.setVacations}
                            setVacationNum={props.setVacationNum}
                            page={props.page} setPage={props.setPage}
                        />
                )}
            </div>

            <Routes>
                <Route
                    path='/log-in'
                    element={<LogIn />}
                />

                <Route
                    path='/register'
                    element={<RegisterLog />}
                />

                <Route
                    path='/home'
                    element={
                        props.isToken ?
                            (<VacationList
                                userName={props.userName}
                                setVacationNum={props.setVacationNum}
                                vacationNum={props.vacationNum}
                                setVacations={props.setVacations}
                                user={props.user}
                                vocations={props.vacations}
                                onDeleteVocation={handleDeleteVacation}
                                admin={props.admin}
                                page={props.page}
                                setPage={props.setPage} />
                            )
                            : (
                                <Navigate to='/log-in' />
                            )}
                />

                <Route
                    path='/'
                    element={props.isToken ?
                        (<VacationList
                            userName={props.userName}
                            setVacationNum={props.setVacationNum}
                            vacationNum={props.vacationNum}
                            setVacations={props.setVacations}
                            user={props.user}
                            vocations={props.vacations}
                            onDeleteVocation={handleDeleteVacation}
                            admin={props.admin}
                            page={props.page}
                            setPage={props.setPage} />
                        )
                        : (
                            <Navigate to='/log-in' />
                        )}
                />

                <Route
                    path='/create-vacation'
                    element={props.isToken && props.admin ?
                        (<CreateNewVacation
                            setData={setEditDataVacation}
                        />
                        ) : (
                            <Navigate to='/log-in' />
                        )}
                />

                <Route
                    path='/create-vacation'
                    element={props.isToken && props.admin ?
                        (<CreateNewVacation
                            setData={setEditDataVacation}
                        />
                        ) : (
                            <LogIn />
                        )}
                />

                <Route path='/edit-vacation/:id'
                    element={props.isToken && props.admin ?
                        (<EditVacation
                            setData={setEditDataVacation}
                        />
                        ) : (
                            <Navigate to='/log-in' />
                        )}
                />

                <Route path='/report'
                    element={props.isToken && props.admin ?
                        (
                            <ReportPage />
                        ) : (
                            <Navigate to='/log-in' />
                        )}
                />

            </Routes>
        </div>
    )
}

export default AppBoddy