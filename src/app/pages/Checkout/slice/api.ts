import axiosClient from "api/axiosClient";
import { API } from "utils/constants/settings";

export const api = {
    getAllSeat: params => {
        const url = `${API.GET_ALL_SEAT}`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
    bookingTicket: params => {
        const url = `${API.BOOKING_TICKET}`;
        return axiosClient
            .post(url, params)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
};
