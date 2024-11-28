import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { vacationType } from '../../types/vocationType';
import ShowFollowing from '../folloeing comp/showFollowing';
import ShowAdminButtons from '../Admin permission comp/showAdminButtons';
import { jwtDecode } from 'jwt-decode';

type Props = {
    vocation: vacationType;
    onDeleteVocation: (vocationId: number) => void;
    admin: boolean;
    user: any;
}

const VocationCard = (props: Props) => {

    const pv = props.vocation;
    const vId = pv.id;
    const user = props.user;

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) {
            const decodedToken = jwtDecode(token);
        }
    }, []);

    return (
        <Card sx={{ width: 345, height: 450 }}>
            {props.admin ? <ShowAdminButtons vocation={pv} onDeleteVocation={props.onDeleteVocation}/>
                         : <ShowFollowing followingNum={pv.followers_count ?? 0} vId={vId} user={user}/>}
            <CardMedia
                component="img"
                alt={pv.destination + " image"}
                height="200"
                image={`http://localhost:4000/assets/images/${pv.url_image}`}
                loading="lazy"
                sx={{
                    borderTopRightRadius: '5px',
                    borderTopLeftRadius: '5px',
                }}
            />

            <Typography style={{
                color: '#00504D',
                backgroundColor: '#DDF4F5',
                paddingTop: 5,
                paddingBottom: 3,
                marginTop: -2,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold'
            }}
                gutterBottom
                variant="h5"
                component="div">
                {new Date(pv.start_vocation).toLocaleDateString()} - {new Date(pv.end_vocation).toLocaleDateString()}
            </Typography>

            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '50%' }}>
                <Typography gutterBottom variant="h5" component="div" >
                    {pv.destination}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', }}>
                    {pv.description}
                </Typography>

                <Typography style={{
                    color: 'white',
                    backgroundColor: '#00504D',
                    padding: 10,
                    borderRadius: 4,
                }}>
                    {pv.price} $
                </Typography>

            </CardContent>
        </Card>
    );
}

export default VocationCard