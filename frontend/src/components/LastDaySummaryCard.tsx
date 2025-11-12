interface LastDayTestsCardProps {
    summary: { totalTests: string; successRate: number; totalMinutes: number }
    darkMode: boolean
}

export default function LastDayTestsCard({ summary: data, darkMode }: LastDayTestsCardProps) {
    return (
        <div className='d-flex flex-column h-100' style={{ backgroundColor: 'transparent' }}>
            <h5 className='card-title mb-3'>Last day Summary</h5>
            {data === null ? (
                <p className='text-muted mb-0'>No tests found</p>
            ) : (
                <div className='d-flex flex-column gap-2'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className='d-flex align-items-center py-1'>Total Tests</span>
                        <span className={`fw-bold ${darkMode ? 'text-light' : 'text-dark'}`}>
                            {data.totalTests}
                        </span>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className='d-flex align-items-center py-1'>Success Rate</span>
                        <span
                            className={`fw-bold ${data.successRate >= 80
                                    ? 'text-success'
                                    : data.successRate >= 50
                                        ? 'text-warning'
                                        : 'text-danger'
                                }`}
                        >
                            {data.successRate}%
                        </span>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span className='d-flex align-items-center py-1'>Total Duration</span>
                        <span className={`fw-bold ${darkMode ? 'text-light' : 'text-dark'}`}>
                            {data.totalMinutes} min
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
