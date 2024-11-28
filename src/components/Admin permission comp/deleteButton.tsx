import { IconButton, Tooltip, Typography } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import React, { useState } from 'react';
import AllowDeleteModal from './allowDeleteModal';
import { vacationType } from '../../types/vocationType';
import { fetchDeleteVacation } from '../../api/vacation-cleint';

type Props = {
    vacation: vacationType;
    onDeleteVocation: (vocationId: number) => void;
}

const DeleteButton = (props: Props) => {

    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleOpenModal = (): void => {
        setOpenModal(true);
      };
    
      const handleCloseModal = (): void => {
        setOpenModal(false);
      };
    
      const handleAgreeDelete = async (): Promise<void> => {
        try {
          await fetchDeleteVacation(props.vacation.id);
          setOpenModal(false);
          props.onDeleteVocation(props.vacation.id);
        } catch (error) {
          console.error('Failed to delete vocation:', error);
        }
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
            <Tooltip title="Delete" placement='right' slotProps={{
                popper: {
                    modifiers: [{
                        name: 'offset',
                        options: { offset: [0, -10], },
                    }]
                }
            }}>
                <IconButton onClick={handleOpenModal}>
                    <DeleteOutlineRoundedIcon fontSize='small' />
                </IconButton>
            </Tooltip>

            <AllowDeleteModal vacation={props.vacation} open={openModal} onClose={handleCloseModal} onAgree={handleAgreeDelete}/>
        </div >
    )
}

export default DeleteButton