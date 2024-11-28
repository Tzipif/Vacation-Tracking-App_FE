import { Backdrop, IconButton, Tooltip } from '@mui/material'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import React from 'react'

type Props = {
}

const ReportsButton = (props: Props) => {

    return (
        <div>
            <Tooltip className='admin-button' title="Get a vacation report" placement='bottom'
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
                onClick={() => { window.location.href = "/report" }}>
                <IconButton>
                    <InsightsRoundedIcon fontSize='medium' sx={{
                        color: '#044a45',
                    }} />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default ReportsButton