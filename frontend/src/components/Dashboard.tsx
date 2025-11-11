import { useEffect, useState } from 'react'
import { getDashboardData } from '../api/testhubApi'
import LastDayTestsCard from './LastDayTestsCard'
import SuccessRateBySourceCard from './SuccessRateBySourceCard'

interface DashboardProps {
    projectId: number
    projectName: string
    darkMode: boolean
}

export default function Dashboard({ projectId, projectName, darkMode }: DashboardProps) {
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        getDashboardData(projectId).then(setData).catch(console.error)
    }, [projectId])

    if (!data) return <div className='p-4'>Loading dashboard...</div>

    const cardClass = darkMode ? 'bg-dark text-white' : 'bg-light text-dark'

    return (
        <div className='container-fluid d-flex flex-column h-100 p-4 overflow-hidden'>
            <div className='row flex-fill'>
                <div className='col-md-6 mb-3'>
                    <div className='card h-100'>
                        <div className={`card-body ${cardClass}`}>
                            <LastDayTestsCard tests={data.lastDayTests} darkMode={darkMode} />
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-3'>
                    <div className='card h-100'>
                        <div className={`card-body ${cardClass}`}>
                            <SuccessRateBySourceCard rates={data.successRateBySource} darkMode={darkMode} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row flex-fill'>
                <div className='col-md-6 mb-3'>
                    <div className={`card h-100 text-center ${cardClass}`}>
                        <div className='card-body d-flex align-items-center justify-content-center'>
                            7-day chart — % success by source
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-3'>
                    <div className={`card h-100 text-center ${cardClass}`}>
                        <div className='card-body d-flex align-items-center justify-content-center'>
                            7-day chart — average duration
                        </div>
                    </div>
                </div>
            </div>

            <div className='row flex-fill'>
                <div className='col-md-6 mb-3'>
                    <div className={`card h-100 text-center ${cardClass}`}>
                        <div className='card-body d-flex align-items-center justify-content-center'>
                            Most failed tests (7 days)
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-3'>
                    <div className={`card h-100 text-center ${cardClass}`}>
                        <div className='card-body d-flex align-items-center justify-content-center'>
                            Overall success rate (7 days)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
