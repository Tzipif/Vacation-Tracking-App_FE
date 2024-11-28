import React, {useState} from 'react'
import {IconButton, Tooltip } from '@mui/material'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import InfoModel from '../users comp/infoModel';


type Props = {
}

const InfoButton = (props: Props) => {
    const [isModalInfoOpen, setIsModalInfoOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const handleOpenInfoModel = (event: React.MouseEvent<HTMLElement>) : void => {
        setAnchorEl(event.currentTarget);
        setIsModalInfoOpen(true);
    };

    const handleCloseModal = () :void => {
        setIsModalInfoOpen(false);
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip title="Project Info" placement='bottom'
                slotProps={{
                    popper: {
                        modifiers: [{
                            name: 'offset',
                            options: { offset: [0, -10], },
                        }]
                    }
                }}>
                <IconButton onClick={handleOpenInfoModel}>
                    <InfoRoundedIcon fontSize='medium' color='action' />
                </IconButton>
            </Tooltip>

            <InfoModel open={isModalInfoOpen} onClose={handleCloseModal} anchorEl={anchorEl} />
        </div>

    )
}

export default InfoButton