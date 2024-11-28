import { countVacations, fetchAllVacations } from '../api/vacation-cleint';

export default async function updateVacations(active: boolean, notStarted: boolean, isFollowing: boolean, page: number, setVacations: (vacations: any[]) => void, setVacationNum: (num: number) => void) {
    const token = localStorage.getItem("token");
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.user.id;

    const res = await fetchAllVacations(page, 10, active, notStarted, isFollowing, userId);

    if (res) {
        setVacations(res);
    }
    
    const res1 = await countVacations(active, notStarted, isFollowing, userId);
    console.log("the counter res1: ", res1);
    if (res1) {
        setVacationNum(res1);
    }
}
