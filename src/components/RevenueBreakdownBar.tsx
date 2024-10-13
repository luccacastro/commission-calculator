import BandBreakdownItem from "../types/BandBreakdownItem";

export const RevenueBreakdownBar: React.FC<{ bandBreakdown: BandBreakdownItem[] }> = ({ bandBreakdown }) => {
    // Normalize breakdown so that each element has at least 5% of the bar
    const totalValue = bandBreakdown.reduce((sum, band) => sum + band.value, 0);
    const minPercentage = 0.10;
    const normalizedBreakdown = bandBreakdown.map((band) => {
      const percentage = band.value / totalValue;
      return {
        ...band,
        value: percentage < minPercentage ? minPercentage * totalValue : band.value,
      };
    });
  
    const adjustedTotal = normalizedBreakdown.reduce((sum, band) => sum + band.value, 0);
    const finalBreakdown = normalizedBreakdown.map((band) => ({
      ...band,
      value: (band.value / adjustedTotal) * totalValue,
    }));
  
    return (
      <div className="color-bar flex h-4 mt-4 my-2 rounded-full overflow-hidden bg-blue-100">
        {finalBreakdown.map((band, index) => (
          <div
            key={index}
            style={{ flex: band.value, backgroundColor: band.color }}
            className="transition-all duration-500"
          />
        ))}
      </div>
    );
  };
  