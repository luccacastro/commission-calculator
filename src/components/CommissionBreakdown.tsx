import Skeleton from "react-loading-skeleton";
import BandBreakdownItem from "../types/BandBreakdownItem";

import 'react-loading-skeleton/dist/skeleton.css';


export const CommissionBreakdown: React.FC<{ bandBreakdown: BandBreakdownItem[], totalCommission: number, loading: boolean }> = ({ bandBreakdown, totalCommission, loading }) => (
    <div>
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-blue-100 border-b border-blue-800 font-semibold text-blue-700 text-center">
            <th className="p-2 text-left">Bracket Range</th>
            <th className="p-2 text-center">Amount (£)</th>
            <th className="p-2 text-center">Percentage (%)</th>
          </tr>
        </thead>
        <tbody>
          {bandBreakdown.map((band) => (
            <tr key={band.label} className="border-b border-blue-800">
              <td className="p-2 text-left">
                <span className="w-[12px] h-[12px] rounded-full" style={{ backgroundColor: band.color }}></span>
                <span className="breakdown-label text-blue-700 font-bold text-lg whitespace-nowrap overflow-hidden" style={{ color: band.color }}>{band.label}</span>
              </td>
              <td className="breakdown-value text-gray-900 font-semibold text-center p-2">
                {loading ? <Skeleton width={50} /> : `£${(band.value).toFixed(2)}`}
              </td>
              <td className="breakdown-percentage text-gray-900 font-semibold text-center p-2">
                {loading ? <Skeleton width={30} /> : `${totalCommission > 0 ? (band.value / totalCommission * 100).toFixed(2) : 0}%`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );