import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import FVacationUserFollows from './fVacationUserFollows';
import { vacationType } from '../../types/vocationType';
import FVacationNotStarted from './fVacationNotStarted';
import '../app layout comp/appLayout.css';
import FActiveVacation from './fActiveVacation';
import updateVacations from '../../utils/vacationNum';

type Props = {
    page: number;
    setVacations: Dispatch<SetStateAction<vacationType[]>>;
    setVacationNum: (newNam: number) => void;
    setPage: (newNam: number) => void;
}

const AllUserButtons = (props: Props) => {

    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [notStarted, setNotStarted] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        updateVacations(active, notStarted, isFollowing, props.page, props.setVacations, props.setVacationNum);
    }, [active, notStarted, isFollowing, props.page]);

    const handleUserFollows = () : void => {
        setIsFollowing(prev => !prev);
        props.setPage(0);
    };

    const handleVacationsNotStarted = () => {
        setNotStarted(prev => {
            const newValue = !prev;
            if (newValue) setActive(false);
            return newValue;
        });
        props.setPage(0);
    };

    const handleActiveVacations = () => {
        setActive(prev => {
            const newValue = !prev;
            if (newValue) setNotStarted(false);
            return newValue;
        });
        props.setPage(0);
    }

    return (
        <div id='buttons-div'>
            <FVacationUserFollows handleUserFollows={handleUserFollows} isFollowing={isFollowing} />
            <FVacationNotStarted handleVacationsNotStarted={handleVacationsNotStarted} notStarted={notStarted} />
            <FActiveVacation handleActiveVacations={handleActiveVacations} active={active} />
        </div>
    )
}

export default AllUserButtons;
