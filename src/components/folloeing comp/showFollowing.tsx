import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import { Checkbox, Tooltip } from '@mui/material';
import { addFollowing, isUserFollow, removeFollowing } from '../../api/following-cleint';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';

type Props = {
    followingNum: number;
    vId: number
    user: {user: {id: number}};
}

const ShowFollowing = (props: Props) => {

    const dark = '#86c5c6';
    const light = '#DDF4F5';

    const [followingNum, setFollowingNum] = useState<number>(props.followingNum);
    const [followingOn, setFollowingOn] = useState<boolean>(false);
    const [bgColor, setBgColor] = useState<string>(light);

    useEffect(() => {
        const checkFollowingStatus = async () => {
            const vacationId = props.vId;
            const userId = props.user.user.id;
            const isFollowing = await isUserFollow(userId, vacationId);

            if (isFollowing) {
                setFollowingOn(true);
                setBgColor(dark);
                setFollowingNum(props.followingNum);
            }
        };

        checkFollowingStatus();
    }, [props.vId, props.user.user.id]);

    async function handleFollowing() {
        const vacationId = props.vId;
        const userId = props.user.user.id;

        try {
            if (followingOn) {
                const remove = await removeFollowing(userId, vacationId);
                if(remove){
                    setBgColor(light);
                    setFollowingOn(!followingOn);
                    setFollowingNum(followingNum - 1);
                }
            } else {
                const add = await addFollowing(userId, vacationId);
                if(add){
                    setBgColor(dark);
                    setFollowingOn(!followingOn);
                    setFollowingNum(followingNum + 1);
                }    
            }
        } catch (error) {
            console.error("Failed to update following:", error);
        }
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            minWidth: '120px',
            backgroundColor: bgColor,
            borderRadius: '250px',
            boxShadow: '0px 2px 5px #606060',
            margin: '25px 20px',
            position: 'absolute',
        }}>
            <Tooltip title="like">
                <Checkbox
                    icon={<FavoriteBorderRounded fontSize='small'/>}
                    checkedIcon={<FavoriteRounded fontSize='small' sx={{color: '#e76d69'}}/>}
                    checked={followingOn}
                    onChange={handleFollowing}
                />
            </Tooltip>
            <Typography variant="body1" sx={{ color: 'text.secondary', marginRight: '12px' }}>
                following {followingNum}
            </Typography>
        </div>
    )
}

export default ShowFollowing