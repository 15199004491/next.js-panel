'use client';

import { useState, useRef, useEffect } from 'react';
import { regionTree, type Region } from '../../data/regions';

interface TreeNodeProps {
  region: Region;
  level: number;
  selectedPath: string[];
  onSelect: (path: string[], region: Region) => void;
  onExpand: (id: string) => void;
  expandedIds: Set<string>;
}

function TreeNode({ region, level, selectedPath, onSelect, onExpand, expandedIds }: TreeNodeProps) {
  const hasChildren = region.children && region.children.length > 0;
  const isExpanded = expandedIds.has(region.id);
  const isSelected = selectedPath[level] === region.name;

  const handleClick = () => {
    const newPath = selectedPath.slice(0, level + 1);
    newPath[level] = region.name;
    onSelect(newPath, region);
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <button
            className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              onExpand(region.id);
            }}
          >
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {!hasChildren && <span className="w-5" />}
        <span className="text-sm font-medium truncate">{region.name}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {region.children!.map((child) => (
            <TreeNode
              key={child.id}
              region={child}
              level={level + 1}
              selectedPath={selectedPath}
              onSelect={onSelect}
              onExpand={onExpand}
              expandedIds={expandedIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface RegionSelectorProps {
  selectedPath?: string[];
  onChange?: (path: string[], region: Region | null) => void;
  placeholder?: string;
}

export default function RegionSelector({ selectedPath = [], onChange, placeholder = 'Select Region' }: RegionSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [internalPath, setInternalPath] = useState<string[]>(selectedPath);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setInternalPath(selectedPath);
  }, [selectedPath]);

  const handleSelect = (path: string[], region: Region) => {
    setInternalPath(path);
    onChange?.(path, region);
    if (!region.children || region.children.length === 0) {
      setIsDropdownOpen(false);
    }
  };

  const handleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleReset = () => {
    setInternalPath([]);
    setExpandedIds(new Set());
    onChange?.([], null);
  };

  const displayText = internalPath.length > 0 ? internalPath.join(' > ') : placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-left min-w-[200px]"
        >
          <span className="text-sm text-gray-700 truncate">{displayText}</span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          title="Reset"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
          <div className="p-2">
            {regionTree.map((region) => (
              <TreeNode
                key={region.id}
                region={region}
                level={0}
                selectedPath={internalPath}
                onSelect={handleSelect}
                onExpand={handleExpand}
                expandedIds={expandedIds}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}