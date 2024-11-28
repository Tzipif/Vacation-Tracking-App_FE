import React from 'react'
import {IconButton, Tooltip } from '@mui/material'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { useNavigate } from 'react-router-dom';

type Props = {}

function LogInPageButton(props: Props) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/log-in");
    };

    return (
        <div>
            <div>
                <Tooltip title="Log in page" placement='bottom'
                    slotProps={{
                        popper: {
                            modifiers: [{
                                name: 'offset',
                                options: { offset: [0, -10], },
                            }]
                        }
                    }}
                    onClick={handleClick}>
                    <IconButton>
                        <LoginRoundedIcon fontSize='medium' sx={{
                            color: '#f1efee',
                        }} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}

export default LogInPageButton