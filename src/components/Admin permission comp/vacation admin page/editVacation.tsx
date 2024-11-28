import React, { useEffect, useState } from 'react';
import VacationRandomComp from './vacationRandomComp';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllVacations, updateVacation } from '../../../api/vacation-cleint';
import { vacationType } from '../../../types/vocationType';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';

type Props = {
    setData: (isUpdated: boolean) => void;
};

const EditVacation = (props: Props) => {

    const { id } = useParams<{ id: string }>();
    const [vacationData, setVacationData] = useState<vacationType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const buttonSendText = 'Update';
    const icon = <AutorenewRoundedIcon />;

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const vacationId = Number(id);
            if (isNaN(vacationId)) {
                throw new Error("Invalid vacation ID");
            }

            const data = await fetchAllVacations(0, 0, undefined, undefined, undefined, undefined, vacationId);

            const selectedVacation = data?.find(vacation => vacation.id === vacationId) || null;
            setVacationData(selectedVacation);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error fetching vacation data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleVacationData = async (data: FormData) => {
        try {
            const updatedVacation = await updateVacation(data, Number(id));
            if (updatedVacation) {
                props.setData(true);
                navigate('/home');
            }
        } catch (error) {
            console.error("Error updating vacation:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!vacationData) return <p>No vacation data found.</p>;

    return (
        <div>
            <VacationRandomComp 
                onVacationData={handleVacationData} 
                initialValues={vacationData} 
                buttonSendText={buttonSendText} 
                icon={icon} 
            />
        </div>
    );
};

export default EditVacation;