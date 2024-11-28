import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { vacationType } from '../../../types/vocationType';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { fetchAllVacations } from '../../../api/vacation-cleint';

type Props = {
}

const ReportPage = (props: Props) => {

    const [vacations, setVacations] = useState<vacationType[]>([])

    useEffect(() => {
        const fetchVacations = async () => {
            try {
                const res = await fetchAllVacations(0, Number.MAX_SAFE_INTEGER);
                if (res) {
                    setVacations(res);
                }
            } catch (error) {
                console.error('Failed to fetch vacations:', error);
            }
        };

        fetchVacations();
    }, []);

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Card variant="outlined" sx={{
                width: { xs: '95%', sm: '80%', md: '70%', lg: '80%' },
                textAlign: 'center',
            }}>
                <CardContent>
                    <Typography component="h2" variant="body2">
                        Vacation Followers Count
                    </Typography>
                    <BarChart
                        xAxis={
                            [
                                {
                                    scaleType: 'band',
                                    categoryGapRatio: 0.5,
                                    data: vacations.map(v => v.destination || 0),
                                },
                            ] as any
                        }
                        series={[
                            {
                                id: 'page-views',
                                label: 'Following users',
                                data: vacations.map(v => v.followers_count || 0),
                                stack: 'A',
                            },
                        ]}
                        borderRadius={8}
                        colors={['#ce4845']}
                        height={300}
                        margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
                        grid={{ horizontal: true }}
                        slotProps={{
                            legend: {
                                hidden: true,
                            },
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default ReportPage;