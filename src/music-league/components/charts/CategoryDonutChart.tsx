/**
 * @file CategoryDonutChart.tsx
 * @description Donut chart showing distribution of submissions/rounds by league category.
 */

import {
  mlCard,
  mlText,
} from '@/music-league/styles/music-league-theme';
import * as d3 from 'd3';
import { type FC, useEffect, useRef } from 'react';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface CategoryDonutChartProps {
  data: CategoryData[];
  title: string;
}

const CategoryDonutChart: FC<CategoryDonutChartProps> = ({
  data,
  title,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const size = 200;
    const radius = size / 2;
    const innerRadius = radius * 0.6;

    svg.attr('viewBox', `0 0 ${size} ${size}`);

    const g = svg
      .append('g')
      .attr('transform', `translate(${radius},${radius})`);

    const pie = d3
      .pie<CategoryData>()
      .value((d) => d.value)
      .sort(null)
      .padAngle(0.03);

    const arc = d3
      .arc<d3.PieArcDatum<CategoryData>>()
      .innerRadius(innerRadius)
      .outerRadius(radius - 4)
      .cornerRadius(3);

    const arcs = g
      .selectAll('path')
      .data(pie(data))
      .join('path')
      .attr('fill', (d) => d.data.color)
      .attr('opacity', 0.8)
      .attr('stroke', '#0F0F0F')
      .attr('stroke-width', 2);

    // Animate
    arcs
      .transition()
      .duration(800)
      .attrTween('d', function (d) {
        const interpolate = d3.interpolate(
          { startAngle: d.startAngle, endAngle: d.startAngle },
          d,
        );
        return (t: number) => arc(interpolate(t)) || '';
      });

    // Center total
    const total = data.reduce((sum, d) => sum + d.value, 0);
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('fill', '#FAFAFA')
      .attr('font-size', '24px')
      .attr('font-weight', '700')
      .text(total);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .attr('fill', '#71717A')
      .attr('font-size', '11px')
      .text('total');
  }, [data]);

  if (data.length === 0) {
    return (
      <div className={`${mlCard.base} p-8 text-center`}>
        <p className={mlText.caption}>No data available</p>
      </div>
    );
  }

  return (
    <div className={mlCard.base + ' p-5'}>
      <h3 className={`${mlText.h4} mb-4 text-center`}>{title}</h3>
      <div className="flex flex-col items-center gap-4">
        <svg ref={svgRef} className="w-[200px] h-[200px]" />
        <div className="flex flex-wrap justify-center gap-3">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-xs text-zinc-400">
                {d.name} ({d.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDonutChart;
