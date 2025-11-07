import { useEffect, useState } from 'react'
import { getProjects } from '../api/testhubApi'

interface Project {
    id: number
    name: string
}

interface Props {
    onSelect: (project: Project) => void
}

export default function ProjectSelector({ onSelect }: Props) {
    const [projects, setProjects] = useState < Project[] > ([])

    useEffect(() => {
        getProjects().then(setProjects).catch(console.error)
    }, [])

    return (
        <div className='flex flex-col items-center mt-10'>
            <h2 className='text-xl font-semibold mb-4'>Select a Project</h2>
            <select
                className='border rounded p-2'
                onChange={(e) => {
                    const selected = projects.find(p => p.id === Number(e.target.value))
                    if (selected) onSelect(selected)
                }}
            >
                <option value=''>-- Choose project --</option>
                {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>
        </div>
    )
}
