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
            <div className="container-fluid p-3">

                <div className="d-flex align-items-center mb-4">

                    <div className="me-3">
                        <h2 className="mb-0">⚙️ TestHub</h2>
                    </div>

                    <div className="flex-grow-1">
                        {projects.length === 0 ? (
                            <ul className="nav nav-tabs justify-content-left mb-0">
                                <li className="nav-item">
                                    <span
                                        className={`nav-link disabled ${darkMode ? 'bg-secondary text-white' : ''
                                            }`}
                                        style={{ margin: '0 5px', cursor: 'default' }}
                                    >
                                        No projects available
                                    </span>
                                </li>
                            </ul>
                        ) : (
                            <ul className="nav nav-tabs justify-content-left mb-0">
                                {projects.map(p => (
                                    <li className="nav-item" key={p.id}>
                                        <button
                                            className={`nav-link ${activeProject?.id === p.id ? 'active' : ''
                                                } ${darkMode && activeProject?.id !== p.id ? 'bg-secondary text-white' : ''}`}
                                            style={{ cursor: 'pointer', margin: '0 5px' }}
                                            onClick={() => handleSelect(p)}
                                        >
                                            {p.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>


                    <div className="ms-3">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => setDarkMode(!darkMode)}
                        >
                            {darkMode ? '💡' : '⚫'}
                        </button>
                    </div>
                </div>

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
