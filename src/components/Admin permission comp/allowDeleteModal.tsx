import React from 'react'
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { vacationType } from '../../types/vocationType';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

type Props = {
    open: boolean;
    onClose: () => void;
    onAgree: () => void;
    vacation: vacationType;
}

const AllowDeleteModal = (props: Props) => {

    const pv = props.vacation;


    return (
        <Modal open={props.open} onClose={props.onClose}>
            <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle sx={{ color: '#17767c' }}>
                    <DeleteRoundedIcon />
                    Are you sure?
                </DialogTitle>
                <Divider />
                <DialogContent>
                    Are you sure you want to delete this vacation? <br />
                    The ID number of the vacation is {pv.id}. <br />
                    The destination of the vacation is to {pv.destination}. <br />
                    It should take place between the dates{' '}
                    {new Date(pv.start_vocation).toLocaleDateString()} -{' '}
                    {new Date(pv.end_vocation).toLocaleDateString()}.
                </DialogContent>
                <DialogActions>
                    <Button variant="solid" color="neutral" sx={{
                        backgroundColor: '#82cbce',
                    }} onClick={props.onAgree}>
                        Delete it
                    </Button>
                    <Button variant="plain" color="neutral" onClick={props.onClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    )
}

export default AllowDeleteModal