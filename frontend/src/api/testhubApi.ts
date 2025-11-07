import axios from 'axios'

const api = axios.create({
    baseURL: '/api'
})

export const getProjects = async () => {
    const res = await api.get('/projects')
    return res.data
}

export const getTestRunsByProject = async (projectId: number) => {
    const res = await api.get(`/testruns?projectId=${projectId}`)
    return res.data
}
