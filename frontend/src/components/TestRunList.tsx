interface TestRunListProps {
    runs: any[]
}

export default function TestRunList({ runs }: TestRunListProps) {
    if (!runs.length)
        return <p>No test runs available for this project.</p>

    return (
        <table className='w-full border-collapse border border-gray-400'>
            <thead>
                <tr className='bg-gray-200'>
                    <th className='border p-2'>Source</th>
                    <th className='border p-2'>Triggered By</th>
                    <th className='border p-2'>Timestamp</th>
                    <th className='border p-2'>Passed</th>
                    <th className='border p-2'>Failed</th>
                </tr>
            </thead>
            <tbody>
                {runs.map(run => {
                    const passed = run.results.filter((r: any) => r.passed).length
                    const failed = run.results.length - passed
                    return (
                        <tr key={run.id}>
                            <td className='border p-2'>{run.source}</td>
                            <td className='border p-2'>{run.triggeredBy}</td>
                            <td className='border p-2'>{new Date(run.timestamp).toLocaleString()}</td>
                            <td className='border p-2 text-green-600'>{passed}</td>
                            <td className='border p-2 text-red-600'>{failed}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
