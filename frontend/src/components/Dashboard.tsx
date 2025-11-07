import { useEffect, useState } from 'react'
import { getTestRunsByProject } from '../api/testhubApi'
import TestRunList from './TestRunList'

interface DashboardProps {
    projectId: number
    projectName: string
}

export default function Dashboard({ projectId, projectName }: DashboardProps) {
    const [runs, setRuns] = useState < any[] > ([])

    useEffect(() => {
        getTestRunsByProject(projectId).then(setRuns)
    }, [projectId])

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>{projectName} — Dashboard</h2>
            <TestRunList runs={runs} />
        </div>
    )
}
