import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


type Props = {
    open: boolean;
    onClose: () => void;
    anchorEl: null | HTMLElement;
}

const InfoModel = (props: Props) => {

    const navigate = useNavigate()

    const handleAdminLogin = () : void => {
        const adminData = {
            email: 'jane.smith@example.com',
            password: 'password456',
        };
        props.onClose();
        navigate('/log-in', { state: adminData });
    };

    return (
        <Menu open={props.open}
            onClose={props.onClose}
            anchorEl={props.anchorEl}
            slotProps={{
                paper: {
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

            <Box sx={{ maxWidth: '70vh' }}>
                <MenuItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <FeedbackRoundedIcon fontSize='medium' sx={{ marginRight: '5px' }} /> Project Info
                    <Typography variant='body2' sx={{ whiteSpace: 'pre-line', fontSize: '0.7rem' }}>
                        This project was developed as part of the Full Stack Web Development program at John Bryce College in 2024, under instructor Ori Brook. Built end-to-end with Node.js for the backend, React.js for the frontend, and TypeScript, it features user and admin interfaces. Registered users can track vacations, while only admins can add, update, delete, and view vacation details.
                        Thanks to John Bryce College for the comprehensive education and to Ori Brook for his dedication to high standards and student success.
                    </Typography>
                </MenuItem>

                <MenuItem onClick={handleAdminLogin} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <AdminPanelSettingsRoundedIcon fontSize='medium' sx={{ marginRight: '5px' }} /> Admin login
                </MenuItem>
                
                <Divider />

                <Button onClick={props.onClose} variant="outlined" sx={{ color: '#86c5c6', borderColor: '#86c5c6', marginLeft: '10px'}}> <HighlightOffRoundedIcon sx={{ marginRight: '5px' }} />Close</Button>
            </Box>
        </Menu >
    )
}

export default InfoModel