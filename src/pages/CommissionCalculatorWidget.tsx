import React, { useState } from 'react';
import axios from 'axios';
import { PRICE_BREAKDOWN_COLORS, PRICE_BREAKDOWN_PLACEHOLDER } from '../constants';
import BandBreakdownItem from '../types/BandBreakdownItem';
import { 
  RevenueInput, 
  RevenueBreakdownBar, 
  CommissionBreakdown, 
  CommissionResult , 
  CommissionSelector, 
  CalculateButton
} from '../components'


enum CommissionScheme {
  Placeholder = 'placeholder',
  Default = 'default',
  Premium = 'premium',
}



const CommissionCalculatorWidget: React.FC = () => {
  const [commissionScheme, setCommissionScheme] = useState<CommissionScheme>(CommissionScheme.Placeholder);
  const [revenue, setRevenue] = useState<number | string>("");
  const [totalCommission, setTotalCommission] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [bandBreakdown, setBandBreakdown] = useState<BandBreakdownItem[]>(PRICE_BREAKDOWN_PLACEHOLDER);
  const [useMockData, setUseMockData] = useState<boolean>(true);

  const toggleDataSource = () => {
    setUseMockData(!useMockData);
    resetWidgetState();
  };

  const resetWidgetState = () => {
    setRevenue("");
    setCommissionScheme(CommissionScheme.Default);
    setTotalCommission(0);
    setLoading(false);
  };

  const mockFetchBreakdownData = (revenue: number) => {
    const bands = [
      { limit: 5000, rate: 0.0 },
      { limit: 10000, rate: 0.1 },
      { limit: 15000, rate: 0.15 },
      { limit: 20000, rate: 0.2 },
      { limit: Infinity, rate: 0.25 }
    ];

    let commission = 0;
    let remainingRevenue = revenue;
    const mockBreakdown = bands.map((band, index) => {
      const bandValue = Math.min(remainingRevenue, band.limit - (bands[index - 1]?.limit || 0));
      const commissionValue = bandValue * band.rate;
      commission += commissionValue;
      remainingRevenue -= bandValue;
      return {
        label: PRICE_BREAKDOWN_PLACEHOLDER[index].label,
        value: commissionValue,
        rate: band.rate,
        color: PRICE_BREAKDOWN_COLORS[index % PRICE_BREAKDOWN_COLORS.length]
      };
    });

    setBandBreakdown(mockBreakdown);
    setTotalCommission(commission);
  };
    
   

  const fetchBreakdownData = async (revenue: number) => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/calculate-commission`, {
        revenue: revenue,
        modelType: commissionScheme,
      });
      let { breakdown, commission } = response.data;
      let bandBreakdownData = breakdown.map((band: BandBreakdownItem, index: number) => ({
        ...band,
        color: PRICE_BREAKDOWN_COLORS[index % PRICE_BREAKDOWN_COLORS.length]
      }));
      setBandBreakdown(bandBreakdownData);
      setTotalCommission(commission);
    } catch (error) {
      console.error('Failed to fetch breakdown data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommissionSchemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (Object.values(CommissionScheme).includes(e.target.value as CommissionScheme)) {
      setCommissionScheme(e.target.value as CommissionScheme);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/,/g, ''); // Remove commas from the input value
  
    // if (value === "") {
    //   setRevenue(""); // If the input is empty, set revenue as an empty string
    if(!isNaN(Number(value))) {
      setRevenue(Number(value)); // If it's a valid number, set revenue as a number
    }
  };

  const handleCalculateClick = () => {
    if (useMockData) {
      mockFetchBreakdownData(typeof revenue === 'number' ? revenue : 0);
    } else {
      fetchBreakdownData(typeof revenue === 'number' ? revenue : 0);
    }
  };

  const isButtonDisabled = loading || commissionScheme === "placeholder" || revenue === "";

  return (
    <div className="commission-widget p-6 max-w-2xl mx-auto my-auto rounded-2xl shadow-md space-y-4 border-b-4 border-x-[1px] border-t-[1px] border-blue-800 rounded-b-lg relative bg-gradient-to-b bg-slate-50">
      <div className='flex justify-center mb-4'>
        <button onClick={toggleDataSource} className='p-2 rounded-lg bg-gray-500 text-white hover:bg-gray-700'>
          {useMockData ? 'Use API Data' : 'Use Mock Data'}
        </button>
      </div>
      <h2 className="text-3xl font-bold text-center text-blue-900">Commission Calculator</h2>
      <div className="text-center text-    // Verify the breakdown values
gray-500 text-sm">
        <p>Enter a revenue amount and select a commission scheme to calculate your potential commission based on different bracket ranges.</p>
      </div>
      <div className='flex w-full justify-center gap-4 mb-4'>
        {!useMockData && <CommissionSelector value={commissionScheme} onChange={handleCommissionSchemeChange} />}
        <RevenueInput value={revenue !== "" ? revenue.toLocaleString('en-GB') : ""} onChange={handleInputChange} />
        <CalculateButton onClick={handleCalculateClick} disabled={!useMockData ? isButtonDisabled : revenue === "" || loading} />
      </div>
      <div className="commission-result text-center">
        <CommissionResult commission={totalCommission} revenue={revenue} loading={loading} />
        <RevenueBreakdownBar bandBreakdown={bandBreakdown} />
        <CommissionBreakdown bandBreakdown={bandBreakdown} totalCommission={totalCommission} loading={loading} />
        <div className="text-sm text-blue-900 mt-10 mx-auto p-4 bg-blue-200 rounded-md max-w-lg border border-blue-800">
          <p>This widget calculates your commission based on the revenue entered. The breakdown shows how much each revenue bracket contributes to your total commission, using a model that helps visualize your earnings potential clearly.</p>
        </div>
      </div>
    </div>
  );
};

export default CommissionCalculatorWidget;