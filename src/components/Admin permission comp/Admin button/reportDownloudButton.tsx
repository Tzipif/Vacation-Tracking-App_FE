import { Backdrop, IconButton, Tooltip } from '@mui/material'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import React from 'react'
import { downloadReport } from '../../../api/vacation-cleint';
import { useLocation } from 'react-router-dom';

type Props = {}

const ReportDownloudButton: React.FC = (props: Props) => {

    const location = useLocation();

    if (location.pathname !== '/report') {
        return null;
    }

    const handleDownloadCsv = async () => {
        try {
            await downloadReport();
        } catch (error) {
            console.error('Failed to download report:', error);
        }
    }

    return (
        <div>
            <Tooltip className='admin-button' title="Download report" placement='bottom'
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
                }}>

                <IconButton onClick={handleDownloadCsv}>
                    <DownloadRoundedIcon
                        fontSize="medium"
                        sx={{
                            color: '#044a45',
                        }}
                    />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default ReportDownloudButton