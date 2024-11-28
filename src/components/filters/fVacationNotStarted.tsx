import { Tooltip } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import MoreTimeRoundedIcon from '@mui/icons-material/MoreTimeRounded';

type Props = {
    handleVacationsNotStarted:()=>void;
    notStarted: boolean;
}

const FVacationNotStarted = (props: Props) => {

    return (
        <div>
            <Tooltip className='admin-button'
            title="Vacations that haven't started yet"
            placement='bottom'
            slotProps={{
                popper: {
                    modifiers: [{
                        name: 'offset',
                        options: { offset: [0, -10], },
                    }]
                }
            }}>

                <Checkbox
                    icon={<MoreTimeRoundedIcon />}
                    checked={props.notStarted}
                    checkedIcon={<MoreTimeRoundedIcon sx={{ color: '#00635f' }} />}
                    onChange={props.handleVacationsNotStarted}
                />
            </Tooltip>
        </div>
    )
}

export default FVacationNotStarted