'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../core/store';
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

export default function Header() {
  const { state, toggleSidebar } = useAppStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
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

  const handleSelect = (path: string[], region: Region) => {
    setSelectedPath(path);
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
    setSelectedPath([]);
    setExpandedIds(new Set());
  };

  const displayText = selectedPath.length > 0 ? selectedPath.join(' > ') : 'Select Region';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">Admin Panel</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-left min-w-[200px]"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
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
                      selectedPath={selectedPath}
                      onSelect={handleSelect}
                      onExpand={handleExpand}
                      expandedIds={expandedIds}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">{state.currentUser?.name || 'Admin'}</span>
              <span className="text-xs text-gray-500">{state.currentUser?.role || 'Administrator'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}