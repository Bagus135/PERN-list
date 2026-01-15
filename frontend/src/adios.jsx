/* eslint-disable no-undef */
import axios from "axios";

const axi = axios.create({
    baseURL : import.meta.env.VITE_baseURL
})

export default axi