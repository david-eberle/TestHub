interface SevenDaySlowestProps {
    data: { testName: string; totalRuns: number; avgDuration: number; }[]
    darkMode: boolean
}

export default function SevenDayMostFailed({ data, darkMode }: SevenDaySlowestProps) {
    return (
        <div className='d-flex flex-column h-100' style={{ backgroundColor: 'transparent', minHeight: '200px' }}>
            <h5 className='card-title mb-3'>Seven days slowest test (TOP 3)</h5>
            {data.length === 0 ? (
                <p className='text-muted mb-0'>No tests found</p>
            ) : (
                <div className='flex-grow-1 overflow-auto'>
                    <div className='d-flex flex-column'>
                        {/* Header */}
                        <div className='d-flex fw-bold mb-2'>
                            <div style={{ width: '50%' }}>Test Name</div>
                            <div style={{ width: '25%' }}>Toal Executions</div>
                            <div style={{ width: '25%' }}>Avg Duration</div>
                        </div>
                        {/* Rows */}
                        {data.map((t, i) => (
                            <div key={i} className='d-flex align-items-center py-1'>
                                <div style={{ width: '50%' }}>{t.testName}</div>
                                <div style={{ width: '25%' }}>{t.totalRuns}</div>
                                <div style={{ width: '25%' }}>{t.avgDuration} m.</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
