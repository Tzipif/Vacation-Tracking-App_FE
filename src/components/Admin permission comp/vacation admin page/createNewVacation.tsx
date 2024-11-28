import React, { useState } from 'react';
import './createNewVacation.css';
import VacationRandomComp from './vacationRandomComp';
import SendIcon from '@mui/icons-material/Send';
import { createNewVacationInDB } from '../../../api/vacation-cleint';
import { useNavigate } from 'react-router-dom';

type Props = {
    setData: (value: boolean) => void;
}

const CreateNewVacation = (props: Props) => {

    const navigate = useNavigate();
    const buttonSendText = 'Create vacation';
    const icon = <SendIcon />;

    const handleVacationData = async (data: FormData) => {
        try {
            const newVacation = await createNewVacationInDB(data);
            if (newVacation) {
                props.setData(true);
                navigate('/home');
            }
        } catch (error) {
            console.error('Error creating vacation:', error);
            alert('Failed to create vacation. Please try again later.');
        }
    }

    return (
        <VacationRandomComp
            onVacationData={handleVacationData}
            buttonSendText={buttonSendText}
            icon={icon}
        />
    )
}

export default CreateNewVacation;