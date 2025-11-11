import { useEffect, useState } from 'react'
import { getProjects } from '../api/testhubApi'
import Dashboard from './Dashboard'

interface Project {
    id: number
    name: string
}

export default function ProjectSelector() {
    const [projects, setProjects] = useState<Project[]>([])
    const [darkMode, setDarkMode] = useState(true)
    const [activeProject, setActiveProject] = useState<Project | null>(null)

    useEffect(() => {
        getProjects()
            .then(data => {
                setProjects(data)
                if (data.length > 0) setActiveProject(data[0])
            })
            .catch(console.error)
    }, [])

    const handleSelect = (p: Project) => {
        if (activeProject?.id !== p.id) setActiveProject(p)
    }

    return (
        <div className={darkMode ? 'bg-dark text-white min-vh-100' : 'bg-light text-dark min-vh-100'}>
            <div className="container-fluid p-0">
                <div className="d-flex justify-content-between align-items-center p-3">
                    <h2>⚙️ TestHub</h2>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? '💡' : '⚫'}
                    </button>
                </div>

                <ul className="nav nav-tabs justify-content-start mb-4">
                    {projects.map(p => (
                        <li className="nav-item" key={p.id}>
                            <button
                                className={`nav-link ${activeProject?.id === p.id ? 'active' : ''} ${darkMode && activeProject?.id !== p.id ? 'bg-secondary text-white' : ''}`}
                                style={{ cursor: 'pointer', margin: '0 5px' }}
                                onClick={() => handleSelect(p)}
                            >
                                {p.name}
                            </button>
                        </li>
                    ))}
                </ul>

                {activeProject && (
                    <Dashboard
                        projectId={activeProject.id}
                        projectName={activeProject.name}
                        darkMode={darkMode}
                    />
                )}
            </div>
        </div>
    )
}
