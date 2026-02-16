/**
 * @file PointsDistributionChart.tsx
 * @description Bar chart showing average points per round across leagues.
 */

import {
  mlCard,
  mlText,
} from '@/music-league/styles/music-league-theme';
import * as d3 from 'd3';
import { type FC, useEffect, useRef } from 'react';

interface LeaguePointsData {
  league: string;
  avgPoints: number;
  color: string;
}

interface PointsDistributionChartProps {
  data: LeaguePointsData[];
}

const PointsDistributionChart: FC<PointsDistributionChartProps> = ({
  data,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) {
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 16, right: 16, bottom: 60, left: 48 };
    const width =
      svgRef.current.clientWidth - margin.left - margin.right;
    const height = 220 - margin.top - margin.bottom;

    svg.attr(
      'viewBox',
      `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
    );

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.league))
      .range([0, width])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.avgPoints) || 1])
      .nice()
      .range([height, 0]);

    // Y axis
    g.append('g')
      .call(
        d3
          .axisLeft(yScale)
          .ticks(5)
          .tickSize(-width)
          .tickFormat((d) => `${d}`),
      )
      .call((axis) => axis.select('.domain').remove())
      .call((axis) =>
        axis
          .selectAll('.tick line')
          .attr('stroke', '#27272A')
          .attr('stroke-dasharray', '2,2'),
      )
      .call((axis) =>
        axis
          .selectAll('.tick text')
          .attr('fill', '#71717A')
          .attr('font-size', '10px'),
      );

    // Bars
    g.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => xScale(d.league) || 0)
      .attr('width', xScale.bandwidth())
      .attr('rx', 4)
      .attr('fill', (d) => d.color)
      .attr('opacity', 0.7)
      .attr('y', height)
      .attr('height', 0)
      .transition()
      .duration(600)
      .delay((_, i) => i * 80)
      .attr('y', (d) => yScale(d.avgPoints))
      .attr('height', (d) => height - yScale(d.avgPoints));

    // Value labels
    g.selectAll('.value')
      .data(data)
      .join('text')
      .attr('class', 'value')
      .attr(
        'x',
        (d) => (xScale(d.league) || 0) + xScale.bandwidth() / 2,
      )
      .attr('y', (d) => yScale(d.avgPoints) - 6)
      .attr('text-anchor', 'middle')
      .attr('fill', '#D4D4D8')
      .attr('font-size', '10px')
      .attr('font-weight', '600')
      .attr('opacity', 0)
      .transition()
      .duration(400)
      .delay((_, i) => i * 80 + 400)
      .attr('opacity', 1)
      .text((d) => Math.round(d.avgPoints));

    // X axis labels (rotated)
    g.selectAll('.x-label')
      .data(data)
      .join('text')
      .attr('class', 'x-label')
      .attr(
        'x',
        (d) => (xScale(d.league) || 0) + xScale.bandwidth() / 2,
      )
      .attr('y', height + 12)
      .attr('text-anchor', 'start')
      .attr('transform', (d) => {
        const x = (xScale(d.league) || 0) + xScale.bandwidth() / 2;
        return `rotate(35, ${x}, ${height + 12})`;
      })
      .attr('fill', '#A1A1AA')
      .attr('font-size', '9px')
      .text((d) =>
        d.league.length > 16
          ? d.league.substring(0, 16) + '...'
          : d.league,
      );
  }, [data]);

  if (data.length === 0) {
    return (
      <div className={`${mlCard.base} p-8 text-center`}>
        <p className={mlText.caption}>No scoring data available</p>
      </div>
    );
  }

  return (
    <div className={mlCard.base + ' p-5'}>
      <svg ref={svgRef} className="w-full" style={{ height: 220 }} />
    </div>
  );
};

export default PointsDistributionChart;
