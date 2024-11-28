import { Tooltip } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

type Props = {
    handleActiveVacations: () => void;
    active: boolean;
}

const FActiveVacation = (props: Props) => {


  return (
    <div>
        <Tooltip className='admin-button'
            title="Only active vacations"
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
                    icon={<NotificationsActiveOutlinedIcon/>}
                    checked={props.active}
                    checkedIcon={<NotificationsActiveRoundedIcon sx={{ color: '#00635f' }} />}
                    onClick={props.handleActiveVacations}
                />
            </Tooltip>
    </div>
  )
}

export default FActiveVacation