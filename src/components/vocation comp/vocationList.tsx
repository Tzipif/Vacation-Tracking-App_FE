import React, { Dispatch, SetStateAction } from 'react';
import { vacationType } from '../../types/vocationType'
import VocationCard from './vocationCard'
import { Box, Grid, Pagination, PaginationItem, Stack } from '@mui/material'
import AllUserButtons from '../filters/allUserButtons';

type props = {
    vocations: vacationType[];
    onDeleteVocation: (vocationId: number) => void;
    admin: boolean;
    user: any;
    setVacations: Dispatch<SetStateAction<vacationType[]>>;
    page: number
    setPage: (newPage: number) => void;
    setVacationNum: (newNum: number) => void;
    vacationNum: number;
    userName: string;
}

const VacationList = (props: props) => {


    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1
            }}>
                {props.vocations.map((vocation: vacationType) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={vocation.id}>
                        <VocationCard user={props.user} vocation={vocation} onDeleteVocation={props.onDeleteVocation} admin={props.admin} />
                    </Grid>
                ))}
            </Box>
        </div>
    )
}

export default VacationList