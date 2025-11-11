interface LastDayTestsCardProps {
    tests: { name: string; passed: boolean; duration: string; }[]
    darkMode: boolean
}

export default function LastDayTestsCard({ tests, darkMode }: LastDayTestsCardProps) {
    return (
        <div className='d-flex flex-column h-100' style={{ overflow: 'hidden' }}>
            <h5 className='card-title mb-3'>Last day summary</h5>
            {tests.length === 0 ? (
                <p className='text-muted mb-0'>No tests found</p>
            ) : (
                <div className='flex-grow-1 overflow-auto'>
                    <table className={`table table-sm table-borderless align-middle mb-0 ${darkMode ? 'table-dark' : ''}`}>
                        <thead>
                            <tr>
                                <th>Test Name</th>
                                <th>Result</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map((t, i) => (
                                <tr key={i}>
                                    <td>{t.name}</td>
                                    <td>
                                        {t.passed === true ? (
                                            <span className='text-success fw-semibold'>✅ Passed</span>
                                        ) : t.passed === false ? (
                                            <span className='text-danger fw-semibold'>❌ Failed</span>
                                        ) : (
                                            <span className='text-secondary fw-semibold'>⏺ Unknown</span>
                                        )}
                                    </td>
                                    <td>{t.duration} m.</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
