interface SuccessRateBySourceCardProps {
    rates: { source: string; successRate: number }[]
    darkMode: boolean
}

export default function SuccessRateBySourceCard({ rates, darkMode }: SuccessRateBySourceCardProps) {
    return (
        <div>
            <h5 className='card-title mb-3'>Success rate by source (last 7 days)</h5>
            {rates.length === 0 ? (
                <p className='text-muted mb-0'>No data available</p>
            ) : (
                <table className={`table table-sm table-borderless align-middle mb-0 ${darkMode ? 'table-dark' : ''}`}>
                    <thead>
                        <tr>
                            <th>Source</th>
                            <th>Success rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.map((r, i) => (
                            <tr key={i}>
                                <td>{r.source}</td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div
                                            className='progress flex-grow-1 me-2'
                                            style={{ height: '6px', backgroundColor: darkMode ? '#444' : '#eee' }}
                                        >
                                            <div
                                                className='progress-bar bg-success'
                                                role='progressbar'
                                                style={{ width: `${r.successRate}%` }}
                                            ></div>
                                        </div>
                                        <span>{r.successRate.toFixed(1)}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
