import { useState } from 'react'
import ProjectSelector from '../components/ProjectSelector'
import Dashboard from '../components/Dashboard'

export default function Home() {
    const [project, setProject] = useState<{ id: number, name: string } | null>(null)

    return (
        <div className='container mx-auto p-6'>
            {!project ? (
                <ProjectSelector onSelect={setProject} />
            ) : (
                <Dashboard projectId={project.id} projectName={project.name} />
            )}
        </div>
    )
}
