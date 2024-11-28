import { IconButton, Tooltip } from '@mui/material'
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { vacationType } from '../../types/vocationType';

type Props = {
    vacation: vacationType
}

const EditButton = (props: Props) => {

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate(`/edit-vacation/${props.vacation.id}`);
    };
 
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#b0c3c3',
            borderRadius: '250px',
            boxShadow: '0px 2px 5px #606060',
            margin: '25px 20px',
        }}>
            <Tooltip title="Edit" placement='right' slotProps={{
                popper: {
                    modifiers: [{
                        name: 'offset',
                        options: { offset: [0, -10], },
                    }]
                }
            }}>
                <IconButton onClick={handleEditClick}>
                    <ModeEditRoundedIcon fontSize='small' />
                </IconButton>
            </Tooltip>
        </div >
    )
}

export default EditButton