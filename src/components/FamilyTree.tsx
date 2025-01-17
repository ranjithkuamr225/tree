import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { FamilyMember } from '../types/family';
import { ChevronDown, ChevronUp, User } from 'lucide-react';

interface TreeNode extends d3.HierarchyNode<FamilyMember> {
  x: number;
  y: number;
}

interface FamilyTreeProps {
  data: FamilyMember[];
  onMemberClick: (member: FamilyMember) => void;
}

export function FamilyTree({ data, onMemberClick }: FamilyTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const width = window.innerWidth;
    const height = window.innerHeight * 0.8;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Clear previous content
    svg.selectAll('*').remove();

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},50)`);

    const root = d3.hierarchy(data[0], d => 
      data.filter(child => child.parentIds.includes(d.id))
    );

    const treeLayout = d3.tree<FamilyMember>()
      .size([width - 100, height - 100])
      .nodeSize([80, 120]);

    const tree = treeLayout(root);

    // Draw links
    const links = g.selectAll('.link')
      .data(tree.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', d3.linkVertical()
        .x((d: any) => d.x)
        .y((d: any) => d.y)
      )
      .attr('fill', 'none')
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('opacity', 0)
      .transition()
      .duration(800)
      .attr('opacity', 1);

    // Draw nodes
    const nodeGroups = g.selectAll('.node')
      .data(tree.descendants())
      .join('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.x},${d.y})`)
      .attr('opacity', 0)
      .on('click', (event, d: any) => {
        onMemberClick(d.data);
      });

    // Add circles to nodes
    nodeGroups.append('circle')
      .attr('r', 30)
      .attr('fill', '#f8fafc')
      .attr('stroke', '#64748b')
      .attr('stroke-width', 2);

    // Add text to nodes
    nodeGroups.append('text')
      .attr('dy', 45)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-sm font-medium')
      .text((d: any) => d.data.name);

    // Animate nodes
    nodeGroups.transition()
      .duration(800)
      .delay((_, i) => i * 50)
      .attr('opacity', 1);

    // Add zoom behavior
    const zoomBehavior = d3.zoom()
      .scaleExtent([0.5, 2])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoom(event.transform.k);
      });

    svg.call(zoomBehavior as any);

  }, [data, collapsed, onMemberClick]);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
          className="p-2 bg-white rounded-full shadow-md hover:bg-slate-50"
        >
          <ChevronDown className="w-5 h-5 text-slate-600" />
        </button>
        <button 
          onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
          className="p-2 bg-white rounded-full shadow-md hover:bg-slate-50"
        >
          <ChevronUp className="w-5 h-5 text-slate-600" />
        </button>
      </div>
      <svg 
        ref={svgRef}
        className="w-full h-full"
        style={{ minHeight: '600px' }}
      />
    </div>
  );
}