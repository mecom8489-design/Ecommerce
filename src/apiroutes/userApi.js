import axiosInstance from "./axiosInstance";

export const Contactus = (data) => {
    return axiosInstance.post("/user/contactus", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};


export const orderplace = (data) => {
    return axiosInstance.post("/ordered/create", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const getorderplace = (id) => axiosInstance.get(`/ordered/${id}`);



export const addressUpdate = async (userData) => {
    return axiosInstance.put(`/admin/updateUsers/${userData.id}`, userData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
};//working fine