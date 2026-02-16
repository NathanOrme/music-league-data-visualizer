/**
 * @file TopArtistsChart.tsx
 * @description Horizontal bar chart showing top submitted artists using D3.
 */

import {
  mlCard,
  mlText,
} from '@/music-league/styles/music-league-theme';
import * as d3 from 'd3';
import { type FC, useEffect, useRef } from 'react';

interface TopArtistsChartProps {
  data: [string, number][];
  accentColor?: string;
}

const TopArtistsChart: FC<TopArtistsChartProps> = ({
  data,
  accentColor = '#A78BFA',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 8, right: 50, bottom: 8, left: 120 };
    const width =
      svgRef.current.clientWidth - margin.left - margin.right;
    const barHeight = 28;
    const gap = 4;
    const height = data.length * (barHeight + gap) - gap;

    svg.attr(
      'viewBox',
      `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
    );

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[1]) || 1])
      .range([0, width]);

    const yScale = d3
      .scaleBand<number>()
      .domain(data.map((_, i) => i))
      .range([0, height])
      .padding(gap / (barHeight + gap));

    // Bars
    g.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', 0)
      .attr('y', (_, i) => yScale(i) || 0)
      .attr('height', yScale.bandwidth())
      .attr('rx', 4)
      .attr('fill', accentColor)
      .attr('opacity', 0.15)
      .attr('width', 0)
      .transition()
      .duration(600)
      .delay((_, i) => i * 50)
      .attr('width', (d) => xScale(d[1]));

    // Bar fill overlay
    g.selectAll('.bar-fill')
      .data(data)
      .join('rect')
      .attr('class', 'bar-fill')
      .attr('x', 0)
      .attr('y', (_, i) => yScale(i) || 0)
      .attr('height', yScale.bandwidth())
      .attr('rx', 4)
      .attr('fill', accentColor)
      .attr('opacity', 0.6)
      .attr('width', 0)
      .transition()
      .duration(600)
      .delay((_, i) => i * 50)
      .attr('width', (d) => xScale(d[1]));

    // Artist labels (left)
    g.selectAll('.label')
      .data(data)
      .join('text')
      .attr('class', 'label')
      .attr('x', -8)
      .attr('y', (_, i) => (yScale(i) || 0) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .attr('fill', '#D4D4D8')
      .attr('font-size', '12px')
      .text((d) =>
        d[0].length > 18 ? d[0].substring(0, 18) + '...' : d[0],
      );

    // Count labels (right of bar)
    g.selectAll('.count')
      .data(data)
      .join('text')
      .attr('class', 'count')
      .attr('x', (d) => xScale(d[1]) + 8)
      .attr('y', (_, i) => (yScale(i) || 0) + yScale.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('fill', '#A1A1AA')
      .attr('font-size', '11px')
      .attr('opacity', 0)
      .transition()
      .duration(400)
      .delay((_, i) => i * 50 + 400)
      .attr('opacity', 1)
      .text((d) => d[1]);
  }, [data, accentColor]);

  if (data.length === 0) {
    return (
      <div className={`${mlCard.base} p-8 text-center`}>
        <p className={mlText.caption}>No submission data available</p>
      </div>
    );
  }

  return (
    <div className={mlCard.base + ' p-5'}>
      <svg
        ref={svgRef}
        className="w-full"
        style={{ height: data.length * 32 + 16 }}
      />
    </div>
  );
};

export default TopArtistsChart;
