import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'

interface SevenDayAverageDurationProps {
    data: { date: string; source: string; avgDuration: number }[]
    darkMode: boolean
}

export default function SevenDayAverageDuration({ data, darkMode }: SevenDayAverageDurationProps) {
    if (!data || !data.length) return <div>No data</div>

    const borderColor = darkMode ? '#555' : '#ddd'
    const textColor = darkMode ? '#fff' : '#000'

    const grouped = Object.values(
        data.reduce((acc: any, { date, source, avgDuration }) => {
            const day = date.split('T')[0]
            if (!acc[day]) acc[day] = { day }
            acc[day][source] = avgDuration
            return acc
        }, {})
    )

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (!active || !payload?.length) return null
        return (
            <div
                style={{
                    backgroundColor: darkMode ? '#222' : '#fff',
                    border: `1px solid ${borderColor}`,
                    padding: '6px 10px',
                    borderRadius: '8px'
                }}
            >
                <div><b>Date:</b> {label}</div>
                {payload.map((p: any) => (
                    <div key={p.dataKey}>
                        <b>Source:</b> {p.dataKey}<br />
                        <b>Avg Duration (minutes):</b> {Number(p.value).toFixed(1)}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className='d-flex flex-column h-100' style={{ backgroundColor: 'transparent', minHeight: '200px' }}>
            <h5 className='card-title mb-3'>Seven days AVG duration (minutes)</h5>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={grouped}>
                    <CartesianGrid stroke={darkMode ? '#444' : '#ccc'} />
                    <XAxis dataKey="day" stroke={textColor} />
                    <YAxis stroke={textColor} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {Object.keys(grouped[0])
                        .filter(k => k !== 'day')
                        .map((source, i) => (
                            <Line
                                key={source}
                                type="monotone"
                                dataKey={source}
                                strokeWidth={2}
                                stroke={`hsl(${i * 70}, 70%, 50%)`}
                                dot
                                activeDot={{ r: 5 }}
                            />
                        ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
