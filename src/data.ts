export const initialSalesData = [
  { name: 'Jan', sales: 4000, revenue: 2400, profit: 1600 },
  { name: 'Feb', sales: 3000, revenue: 1398, profit: 1602 },
  { name: 'Mar', sales: 2000, revenue: 9800, profit: -7800 },
  { name: 'Apr', sales: 2780, revenue: 3908, profit: -1128 },
  { name: 'May', sales: 1890, revenue: 4800, profit: -2910 },
  { name: 'Jun', sales: 2390, revenue: 3800, profit: -1410 },
];

export const initialCategoryData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Groceries', value: 300 },
  { name: 'Books', value: 200 },
];

// Function to generate a new random data point for the sales chart
export const getNewSalesDataPoint = () => {
  const lastDataPoint = initialSalesData[initialSalesData.length - 1];
  const newMonth = new Date(Date.parse(lastDataPoint.name + ' 1, 2024') + 30 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' });
  const newSales = Math.floor(Math.random() * 3000) + 1000;
  const newRevenue = Math.floor(Math.random() * 5000) + 2000;
  const newProfit = newRevenue - newSales - Math.floor(Math.random() * 500);
  return { name: newMonth, sales: newSales, revenue: newRevenue, profit: newProfit };
};


// Function to generate new random data for the category chart
export const getNewCategoryData = () => {
  return initialCategoryData.map(item => ({
    ...item,
    value: Math.floor(Math.random() * 500) + 100,
  }));
};
