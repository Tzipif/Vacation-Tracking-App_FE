import React from 'react'
import {IconButton, Tooltip } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

type Props = {}

const HomePageButton = (props: Props) => {
    return (
        <div>
            <Tooltip title="Home page" placement='bottom'
                slotProps={{
                    popper: {
                        modifiers: [{
                            name: 'offset',
                            options: { offset: [0, -10], },
                        }]
                    }
                }}
                onClick={() => { window.location.href = "/" }}>
                <IconButton>
                    <HomeRoundedIcon fontSize='medium' color='action'/>
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default HomePageButton