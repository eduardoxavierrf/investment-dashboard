import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import DateRangeSelect from './DateRangeSelect';

interface HistoricalData {
  dataId: number;
  date: string;
  openPrice: number;
  closePrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
}

interface DashboardProps {
  data: HistoricalData[];
}
const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};
const xformatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleString('default', { month: 'short', year: '2-digit' });
};

const Dashboard: React.FC<DashboardProps> = ({data}) => {
  const latest = data[data.length - 1]
  const first = data[0]
  const change = ((latest.closePrice - first.closePrice) / first.closePrice) * 100
  return (
    <div>
    <div className='text-sm'>
      <DateRangeSelect />
      <LineChart width={800} height={400} data={data}>
        <XAxis 
          dataKey="date" 
          tickFormatter={xformatDate}
        />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip
          labelFormatter={(date: string) => formatDate(date)}
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
        />
        <Line 
          type="monotone" 
          dataKey="closePrice" 
          stroke="#22c55e" 
          dot={false}
        />
      </LineChart>
    </div>
    <div className=" mb-4 rounded-6 px-6 py-4">
      <h3 className="flex flex-col gap-1">
        Mudança no preço
        <span className="text-4xl font-reckless">{change.toFixed(2)}%</span>
      </h3>
    </div>
    </div>
  )
}

export default Dashboard;