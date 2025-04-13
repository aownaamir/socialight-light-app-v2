import API_URL from "./apiURL";
import axios from "axios";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const createSubscribtionApi = async (token) => {
    setAuthToken(token);
    try {
        const response = await api.post('stripe/subscription');
        return response.data
    } catch (error) {
        throw handleApiError(error);
    }
};

const handleApiError = (error) => {
    const message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong';

    return {
        message,
        status: error.response?.status,
        data: error.response?.data
    };
};

export default {
    createSubscribtionApi,
    setAuthToken
};





// const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     // Verify the webhook signature
//     event = stripe.webhooks.constructEvent(
//       req.rawBody, // You need to get the raw request body
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error(`Webhook Error: ${err.message}`);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }