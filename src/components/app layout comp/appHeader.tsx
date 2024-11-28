import React, { useState, useEffect } from 'react'
import './appLayout.css'
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import UserModel from '../users comp/userModel';
import HomePageButton from '../footer opstions/homePageButton'
import InfoButton from '../footer opstions/infoButton';

type Props = {
    userName: string;
    admin: boolean;
}

const AppHeader = (props: Props) => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [initial, setInitial] = useState<string>('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenUserModel = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setAnchorEl(null);
    };

    useEffect(() => {
        const nameParts = props.userName.split(" ");
        const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
        const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";
        setInitial(firstNameInitial + lastNameInitial);
    }, [props.userName]);

    return (
        <div id='header'>
            <span >
                <b onClick={handleOpenUserModel} style={{ cursor: 'pointer' }}>
                    {props.admin ?
                        <Badge color='info' overlap="circular" badgeContent="AD">
                            <Chip avatar={<Avatar>{initial}</Avatar>} label={`Hi ${props.userName}`} />
                        </Badge>
                        :
                        <Chip avatar={<Avatar>{initial}</Avatar>} label={`Hi ${props.userName}`} />
                    }
                </b>
                , nice to meet you!
            </span>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <InfoButton />
                <HomePageButton />
            </div>

            <UserModel open={isModalOpen} onClose={handleCloseModal} initials={initial} anchorEl={anchorEl} />
        </div>
    )
}

export default AppHeader