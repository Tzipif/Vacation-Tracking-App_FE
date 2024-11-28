import axios from "axios";
import { vacationType } from "../types/vocationType";

const getToken = () => localStorage.getItem("token");

export async function countVacations(active?: boolean, notStarted?: boolean, following?: boolean, userId?: number): Promise<any> {
    try {
        const token = localStorage.getItem("token");

        const queryParams = new URLSearchParams({
            active: active ? 'true' : 'false',
            notStarted: notStarted ? 'true' : 'false',
            following: following ? 'true' : 'false',
            userId: userId ? userId.toString() : '',
        });

        const res = await axios.get(`http://localhost:4000/api/v1/vacations-count?${queryParams.toString()}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return res.data;
    } catch (error) {
        console.log("Geot count vacations error:", error);
    }
}

export async function fetchAllVacations(page: number, limit: number = 2, active?: boolean, notStarted?: boolean, following?: boolean, userId?: number, vacationId?: number): Promise<vacationType[] | void> {
    try {
        const token = localStorage.getItem("token");

        const queryParams = new URLSearchParams({
            active: active ? 'true' : 'false',
            notStarted: notStarted ? 'true' : 'false',
            following: following ? 'true' : 'false',
            userId: userId ? userId.toString() : '',
            vacationId: vacationId ? vacationId.toString() : ''
        });

        const res = await axios.get(`http://localhost:4000/api/v1/vacations?page=${page}&limit=${limit}&${queryParams.toString()}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return res.data;
    } catch (error) {
        console.log("Fetch vacations error:", error);
    }
}

export async function fetchDeleteVacation(id: number) {
    try {
        const token = getToken();
        const res = await axios.delete(`http://localhost:4000/api/v1/vacations/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.log("Delete vacation error:", error);
    }
}

export async function createNewVacationInDB(v: FormData) {
    try {
        const token = getToken();

        const res = await axios.post(`http://localhost:4000/api/v1/create-vacation`, v, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        return res

    } catch (error) {
        console.log("Create new vacation error:", error);
    }
}

export async function updateVacation(v:FormData, id: number) {
    try {
        const token = getToken();
        const vid = id 
        
        v.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        const res = await axios.put(`http://localhost:4000/api/v1/edit-vacation/${vid}`, v, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });

        return res

    } catch (error) {
        console.log("Create new vacation error:", error);
    }
}

export async function downloadReport() {
    try {

        const token = localStorage.getItem("token");

        const res = await axios.get('http://localhost:4000/api/v1/download-report', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            responseType: 'blob'
        });

        if (res) {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', 'vacation_report.csv');

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
        }

        else {
            console.log('no res for download report');

        }


    } catch (error) {
        console.log("Download report error:", error);
    }
}


