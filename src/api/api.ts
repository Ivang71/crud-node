import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://217.107.219.69:9000/',
})
