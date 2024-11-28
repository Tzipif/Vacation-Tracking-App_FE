import axios from "axios";

export const addFollowing = async (user_id: number, vacation_id:number) => {
    try {            
        const response = await axios.post(`http://localhost:4000/api/v1/add-following`, {user_id, vacation_id});

        return response.data;

    } catch (error) {
        console.log("Add following error:", error);
    }
};

export const removeFollowing = async (user_id: number, vacation_id: number) => {
    try {            
        const response = await axios.delete(`http://localhost:4000/api/v1/remove-following`, {
            params: { user_id, vacation_id }
        });

        return response.data;

    } catch (error) {
        console.log("Remove Following error:", error);
    }
};

export const isUserFollow = async (user_id: number, vacation_id: number) => {
    try {            
        const response = await axios.get(`http://localhost:4000/api/v1/following/${user_id}/${vacation_id}`);

        return response.data;

    } catch (error) {
        console.log("Error to check if user following the vacation:", error);
    }
};