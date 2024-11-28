import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

type Props = {
    open: boolean;
    onClose: () => void;
    initials: string;
    anchorEl: null | HTMLElement;
}

const UserModel = (props: Props) => {

    const navigate = useNavigate()

    const handleLogOut = (): void => {
        localStorage.removeItem('token');
        window.location.href = "/log-in";
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
                            right: 50,
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

            <Box >
                <MenuItem onClick={props.onClose}>
                    <Avatar sx={{ fontSize: '8px', width: '20px', height: '20px', marginRight: '10px' }}>{props.initials}</Avatar> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
                <Divider />
                <MenuItem onClick={props.onClose} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="outlined" sx={{ color: '#86c5c6', borderColor: '#86c5c6' }}>Close</Button>
                </MenuItem>
            </Box>
        </Menu >
    )
}

export default UserModel