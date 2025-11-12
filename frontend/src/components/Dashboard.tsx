import { useEffect, useState } from 'react'
import { getDashboardData } from '../api/testhubApi'
import LastDayTestsCard from './LastDayTestsCard'
import SuccessRateBySourceCard from './SuccessRateBySourceCard'
import SevenDaySuccessBySource from './SevenDaySuccessBySource'
import SevenDayAverageDuration from './SevenDayAverageDuration'
import LastDaySummaryCard from './LastDaySummaryCard'
import SevenDayMostFailed from './SevenDayMostFailed'
import SevenDaySlowest from './SevenDaySlowest'

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
                <div className='col-md-3 mb-3'>
                    <div className={`card h-100`} style={{ borderRadius: '0.75rem' }}>
                        <div className={`card-body ${cardClass}`} style={{ borderRadius: '0.75rem' }}>
                            <LastDaySummaryCard summary={data.lastDaySummary} darkMode={darkMode} />
                        </div>
                    </div>
                </div>

                <div className='col-md-6 mb-3'>
                    <div className={`card h-100`} style={{ borderRadius: '0.75rem' }}>
                        <div className={`card-body ${cardClass}`} style={{ borderRadius: '0.75rem' }}>
                            <LastDayTestsCard tests={data.lastDayTests} />
                        </div>
                    </div>

                </div>

                <div className='col-md-3 mb-3'>
                    <div className={`card h-100`} style={{ borderRadius: '0.75rem' }}>
                        <div className={`card-body ${cardClass}`} style={{ borderRadius: '0.75rem' }}>
                            <SuccessRateBySourceCard rates={data.successRateBySource} darkMode={darkMode} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row flex-fill'>
                <div className='col-md-6 mb-3'>
                    <div className={`card h-100`} style={{ borderRadius: '0.75rem' }}>
                        <div className={`card-body ${cardClass}`} style={{ borderRadius: '0.75rem' }}>
                            <SevenDaySuccessBySource data={data.successRate7Days} darkMode={darkMode} />
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-3'>
                    <div className={`card h-100`} style={{ borderRadius: '0.75rem' }}>
                        <div className={`card-body ${cardClass}`} style={{ borderRadius: '0.75rem' }}>
                            <SevenDayAverageDuration data={data.avgDuration7Days} darkMode={darkMode} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row flex-fill'>
                <div className='col-md-6 mb-3'>
                    <div className={`card h-100`} style={{ borderRadius: '0.75rem' }}>
                        <div className={`card-body ${cardClass}`} style={{ borderRadius: '0.75rem' }}>
                            <SevenDayMostFailed data={data.topFailedTests} darkMode={darkMode} />
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mb-3'>
                    <div className={`card h-100`} style={{ borderRadius: '0.75rem' }}>
                        <div className={`card-body ${cardClass}`} style={{ borderRadius: '0.75rem' }}>
                            <SevenDaySlowest data={data.topSlowestTests} darkMode={darkMode} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
