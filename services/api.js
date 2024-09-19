import axios from "axios";

export const fetchEvents = async () => {
    try {
        const response = await axios.get("https://api.github.com/events?per_page=25");

        return response.data;
    } catch (error) {
        console.error(error)
        return [];
    }
}