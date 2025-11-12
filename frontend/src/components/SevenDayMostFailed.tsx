interface SevenDaySuccessBySourceProps {
    data: { testName: string; totalRuns: number; failCount: number; failRate: number }[]
    darkMode: boolean
}

export default function SevenDayMostFailed({ data, darkMode }: SevenDaySuccessBySourceProps) {
    return (
        <div className='d-flex flex-column h-100' style={{ backgroundColor: 'transparent', minHeight: '200px' }}>
            <h5 className='card-title mb-3'>Seven days most failed test (TOP 3)</h5>
            {data.length === 0 ? (
                <p className='text-muted mb-0'>No tests found</p>
            ) : (
                <div className='flex-grow-1 overflow-auto'>
                    <div className='d-flex flex-column'>
                        {/* Header */}
                        <div className='d-flex fw-bold mb-2'>
                            <div style={{ width: '50%' }}>Test Name</div>
                            <div style={{ width: '25%' }}>Toal Executions</div>
                            <div style={{ width: '25%' }}>Total Fails</div>
                        </div>
                        {/* Rows */}
                        {data.map((t, i) => (
                            <div key={i} className='d-flex align-items-center py-1'>
                                <div style={{ width: '50%' }}>{t.testName}</div>
                                <div style={{ width: '25%' }}>{t.totalRuns}</div>
                                <div style={{ width: '25%' }}>{t.failCount} ({t.failRate} %)</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
