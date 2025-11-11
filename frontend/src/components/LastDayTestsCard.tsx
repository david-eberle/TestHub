interface LastDayTestsCardProps {
    tests: { name: string; passed: boolean; duration: string }[]
}

export default function LastDayTestsCard({ tests }: LastDayTestsCardProps) {
    return (
        <div className='d-flex flex-column h-100' style={{ backgroundColor: 'transparent' }}>
            <h5 className='card-title mb-3'>Last day test detail</h5>
            {tests.length === 0 ? (
                <p className='text-muted mb-0'>No tests found</p>
            ) : (
                <div className='flex-grow-1 overflow-auto'>
                    <div className='d-flex flex-column'>
                        {/* Header */}
                        <div className='d-flex fw-bold mb-2'>
                            <div style={{ width: '50%' }}>Test Name</div>
                            <div style={{ width: '25%' }}>Result</div>
                            <div style={{ width: '25%' }}>Duration</div>
                        </div>
                        {/* Rows */}
                        {tests.map((t, i) => (
                            <div key={i} className='d-flex align-items-center py-1'>
                                <div style={{ width: '50%' }}>{t.name}</div>
                                <div style={{ width: '25%' }}>
                                    {t.passed === true ? (
                                        <span className='text-success fw-semibold'>✅ Passed</span>
                                    ) : t.passed === false ? (
                                        <span className='text-danger fw-semibold'>❌ Failed</span>
                                    ) : (
                                        <span className='text-secondary fw-semibold'>⏺ Unknown</span>
                                    )}
                                </div>
                                <div style={{ width: '25%' }}>{t.duration} m.</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
