import Checkbox from '@mui/material/Checkbox';
import { Tooltip } from '@mui/material'
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';

type Props = {
    handleUserFollows: ()=>void
    isFollowing: boolean;
}


function FVacationUserFollows(props: Props) {

    return (
        <div>
            <Tooltip className='admin-button' title="Your follow ups filter" placement='bottom'
                slotProps={{
                    popper: {
                        modifiers: [{
                            name: 'offset',
                            options: { offset: [0, -10], },
                        }]
                    }
                }}>

                <Checkbox
                    icon={<FavoriteBorderRounded />}
                    checkedIcon={<FavoriteRounded sx={{ color: '#00635f' }} />}
                    onChange={props.handleUserFollows}
                />
            </Tooltip>
        </div>
    );
}

export default FVacationUserFollows