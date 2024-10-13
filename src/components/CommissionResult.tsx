import Skeleton from 'react-loading-skeleton';
import CountUp from 'react-countup';

import 'react-loading-skeleton/dist/skeleton.css';


export const CommissionResult: React.FC<{ commission: number, revenue:  number | string, loading: boolean }> = ({ commission, revenue, loading }) => (
    <h3 className="text-5xl font-bold text-blue-600 text-center my-10">
      <p className="text-lg text-center text-gray-500 mb-4">Your commission based on the assessed value of 
        <span className='bold text-black mx-1'>£{revenue ? revenue.toLocaleString('en-GB') : "0"}</span> is:</p>
      {loading ? (
        <Skeleton width={100} />
      ) : (
        <CountUp
          className='totalCommission'
          start={0}
          end={commission}
          duration={1.5}
          separator=","
          decimals={2}
          prefix="£"
        />
      )}
    </h3>
  );