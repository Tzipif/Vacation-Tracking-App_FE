import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import CreatNewVacationB from './creatNewVacationB'
import ReportsButton from './reportsButton'
import '../../app layout comp/appLayout.css'
import ReportDownloudButton from './reportDownloudButton'
import updateVacations from '../../../utils/vacationNum'
import { vacationType } from '../../../types/vocationType'

type Props = {
    setVacations: Dispatch<SetStateAction<vacationType[]>>;
    setVacationNum: Dispatch<SetStateAction<number>>;
    page: number;
}

const AdminButtons = (props: Props) => {

    useEffect(() => {
        updateVacations(false, false, false, props.page, props.setVacations, props.setVacationNum);
    }, [props.page])

    return (
        <div id='buttons-div'>
            <CreatNewVacationB />
            <ReportsButton />
            <ReportDownloudButton />
        </div>
    )
}

export default AdminButtons