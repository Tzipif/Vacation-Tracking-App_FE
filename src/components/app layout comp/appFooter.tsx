import React from 'react';
import './appLayout.css';
import LogOutButton from '../footer opstions/logOutButton';
import LogInPageButton from '../footer opstions/logInPageButton';
import CopyrightRoundedIcon from '@mui/icons-material/CopyrightRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { Typography } from '@mui/material';

type Props = {}

const AppFooter = (props: Props) => {

    return (
        <div id='footer'>
            <div id='buttons-div'>
                <LogInPageButton />
                <LogOutButton />
            </div>
            <div style={{display: 'flex', alignItems: 'center', color: '#d5524e'}}>
                <Typography variant='caption' fontSize={10} sx={{fontWeight: 'bold'}}> tzipif0583211059@gmail.com
                <FavoriteRoundedIcon fontSize='inherit'/> ציפי</Typography>
                <CopyrightRoundedIcon sx={{color: '#f1efee', marginLeft: '7px'}}/>
            </div>
        </div>
    )
}

export default AppFooter