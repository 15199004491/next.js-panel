'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { regionTree, type Region } from '@/src/data/regions';
import { isRegionSwitchAllowed } from '@/src/config/routeConfig';

interface TreeNodeProps {
  region: Region;
  level: number;
  parentPath: string[];
  internalPath: string[];
  onSelect: (path: string[], region: Region) => void;
  onExpand: (id: string) => void;
  expandedIds: Set<string>;
}

function TreeNode({ region, level, parentPath, internalPath, onSelect, onExpand, expandedIds }: TreeNodeProps) {
  const hasChildren = region.children && region.children.length > 0;
  const isExpanded = expandedIds.has(region.id);
  const currentFullPath = [...parentPath, region.name];
  const isSelected = internalPath.length >= currentFullPath.length && 
                    currentFullPath.every((name, idx) => internalPath[idx] === name);

  const handleClick = () => {
    if (hasChildren) {
      onExpand(region.id);
    } else {
      onSelect(currentFullPath, region);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${hasChildren ? 'cursor-pointer hover:bg-gray-100 text-gray-700' : isSelected ? 'bg-blue-50 text-blue-600 cursor-pointer hover:bg-blue-100' : 'text-gray-700 cursor-pointer hover:bg-gray-100'}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
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
              parentPath={currentFullPath}
              internalPath={internalPath}
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
  const pathname = usePathname();
  const isAllowed = isRegionSwitchAllowed(pathname || '');
  
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
    if (!isAllowed) return;
    setInternalPath(path);
    onChange?.(path, region);
    if (!region.children || region.children.length === 0) {
      setIsDropdownOpen(false);
    }
  };

  const handleExpand = (id: string) => {
    if (!isAllowed) return;
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
    if (!isAllowed) return;
    setInternalPath([]);
    setExpandedIds(new Set());
    setIsDropdownOpen(false);
    onChange?.([], null);
  };

  const displayText = internalPath.length > 0 ? internalPath.join(' > ') : placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2">
        <button
          onClick={() => isAllowed && setIsDropdownOpen(!isDropdownOpen)}
          disabled={!isAllowed}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-left min-w-[160px] w-fit ${
            isAllowed 
              ? 'bg-gray-50 border-gray-200 hover:bg-gray-100 cursor-pointer' 
              : 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
          }`}
        >
          <span className={`text-sm truncate ${isAllowed ? 'text-gray-700' : 'text-gray-500'}`}>{displayText}</span>
          {isAllowed && (
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
        {isAllowed && (
          <button
            onClick={handleReset}
            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title="Reset"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
          <div className="p-2">
            {regionTree.map((region) => (
              <TreeNode
                key={region.id}
                region={region}
                level={0}
                parentPath={[]}
                internalPath={internalPath}
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