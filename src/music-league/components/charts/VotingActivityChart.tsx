/**
 * @file VotingActivityChart.tsx
 * @description Area chart showing voting activity over time across rounds.
 */

import {
  mlCard,
  mlText,
} from '@/music-league/styles/music-league-theme';
import * as d3 from 'd3';
import { type FC, useEffect, useRef } from 'react';

interface VotingDataPoint {
  round: string;
  votes: number;
  submissions: number;
}

interface VotingActivityChartProps {
  data: VotingDataPoint[];
  accentColor?: string;
}

const VotingActivityChart: FC<VotingActivityChartProps> = ({
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

    const margin = { top: 16, right: 16, bottom: 32, left: 40 };
    const width =
      svgRef.current.clientWidth - margin.left - margin.right;
    const height = 180 - margin.top - margin.bottom;

    svg.attr(
      'viewBox',
      `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`,
    );

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scalePoint<number>()
      .domain(data.map((_, i) => i))
      .range([0, width]);

    const maxVal =
      d3.max(data, (d) => Math.max(d.votes, d.submissions)) || 1;
    const yScale = d3
      .scaleLinear()
      .domain([0, maxVal])
      .nice()
      .range([height, 0]);

    // Grid lines
    g.append('g')
      .call(
        d3
          .axisLeft(yScale)
          .ticks(4)
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

    // Votes area
    const votesArea = d3
      .area<VotingDataPoint>()
      .x((_, i) => xScale(i) || 0)
      .y0(height)
      .y1((d) => yScale(d.votes))
      .curve(d3.curveMonotoneX);

    const votesLine = d3
      .line<VotingDataPoint>()
      .x((_, i) => xScale(i) || 0)
      .y((d) => yScale(d.votes))
      .curve(d3.curveMonotoneX);

    // Submissions area
    const subsArea = d3
      .area<VotingDataPoint>()
      .x((_, i) => xScale(i) || 0)
      .y0(height)
      .y1((d) => yScale(d.submissions))
      .curve(d3.curveMonotoneX);

    const subsLine = d3
      .line<VotingDataPoint>()
      .x((_, i) => xScale(i) || 0)
      .y((d) => yScale(d.submissions))
      .curve(d3.curveMonotoneX);

    // Draw submissions area (behind)
    g.append('path')
      .datum(data)
      .attr('fill', '#10B981')
      .attr('opacity', 0.08)
      .attr('d', subsArea);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#10B981')
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.5)
      .attr('d', subsLine);

    // Draw votes area (front)
    g.append('path')
      .datum(data)
      .attr('fill', accentColor)
      .attr('opacity', 0.1)
      .attr('d', votesArea);

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', accentColor)
      .attr('stroke-width', 2)
      .attr('opacity', 0.8)
      .attr('d', votesLine);

    // Dots for votes
    g.selectAll('.vote-dot')
      .data(data)
      .join('circle')
      .attr('class', 'vote-dot')
      .attr('cx', (_, i) => xScale(i) || 0)
      .attr('cy', (d) => yScale(d.votes))
      .attr('r', 3)
      .attr('fill', accentColor)
      .attr('opacity', 0.8);
  }, [data, accentColor]);

  if (data.length === 0) {
    return (
      <div className={`${mlCard.base} p-8 text-center`}>
        <p className={mlText.caption}>No activity data available</p>
      </div>
    );
  }

  return (
    <div className={mlCard.base + ' p-5'}>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-xs text-zinc-400">Votes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-zinc-400">Submissions</span>
        </div>
      </div>
      <svg ref={svgRef} className="w-full" style={{ height: 180 }} />
    </div>
  );
};

export default VotingActivityChart;
