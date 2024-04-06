import { useState, useEffect } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export function PopulationGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
        );
        const result = await response.json();
        const populationData = result.data.map((item) => ({
          name: item.Year,
          population: item.Population,
        }));
        setData(populationData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Find the minimum and maximum population values
  const minPopulation = Math.min(...data.map((item) => item.population));
  const maxPopulation = Math.max(...data.map((item) => item.population));

  // Calculate the tick interval based on the range of population values
  const tickInterval = Math.ceil((maxPopulation - minPopulation) / 5);

  // Format the tick labels to display in millions or thousands
  const formatTickLabel = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={formatTickLabel}
          domain={[minPopulation - tickInterval, maxPopulation + tickInterval]}
          ticks={[
            minPopulation,
            minPopulation + tickInterval,
            minPopulation + tickInterval * 2,
            minPopulation + tickInterval * 3,
            minPopulation + tickInterval * 4,
            maxPopulation,
          ]}
        />
        <Bar
          dataKey="population"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
