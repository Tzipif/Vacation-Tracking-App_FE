import React from 'react'
import { IconButton, Tooltip } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';


type Props = {}

const LogOutButton = (props: Props) => {

    const navigate = useNavigate()

    const handleLogOut = () : void => {
        localStorage.removeItem('token');
        navigate("/log-in");
    };

    return (
        <div><Tooltip title="Log out" placement='bottom'
            slotProps={{
                popper: {
                    modifiers: [{
                        name: 'offset',
                        options: { offset: [0, -10], },
                    }]
                }
            }}
            onClick={handleLogOut}>
            <IconButton>
                <LogoutRoundedIcon fontSize='medium' sx={{
                    color: '#f1efee'
                }} />
            </IconButton>
        </Tooltip></div>
    )
}

export default LogOutButton