import { Backdrop, IconButton, Tooltip } from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import React from 'react'

type Props = {
}

const CreatNewVacationB = (props: Props) => {

    return (
        <div>
            <Tooltip className='admin-button' title="Create a new vacation" placement='bottom'
                sx={{
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 10px rgba(30, 74, 72, 0.5)',
                }}
                slotProps={{
                    popper: {
                        modifiers: [{
                            name: 'offset',
                            options: { offset: [0, -10], },
                        }]
                    }
                }}
                onClick={() => { window.location.href = "/create-vacation" }}>
                <IconButton>
                    <AddCircleOutlineRoundedIcon fontSize='medium' sx={{
                        color: '#044a45',
                    }} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default CreatNewVacationB