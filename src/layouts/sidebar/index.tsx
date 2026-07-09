'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '../../core/store';

interface MenuItem {
  name: string;
  icon: string;
  href?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    name: 'New Properties',
    icon: 'home',
    children: [
      { name: 'Newhouse', icon: 'home', href: '/newhouses' },
      { name: 'Developers', icon: 'users', href: '/developers' },
    ],
  },
  { name: 'Resale Properties', icon: 'building', href: '/resale' },
  { name: 'Rentals', icon: 'key', href: '/rentals' },
];

const iconPaths: Record<string, string> = {
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  building: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  key: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
};

function MenuItem({ item, openMenus, setOpenMenus }: { item: MenuItem; openMenus: Set<string>; setOpenMenus: React.Dispatch<React.SetStateAction<Set<string>>> }) {
  const isOpen = openMenus.has(item.name);

  const toggleMenu = () => {
    setOpenMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item.name)) {
        newSet.delete(item.name);
      } else {
        newSet.add(item.name);
      }
      return newSet;
    });
  };

  if (item.children && item.children.length > 0) {
    return (
      <li key={item.name}>
        <button
          onClick={toggleMenu}
          className="flex items-center justify-between w-full px-4 py-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[item.icon]} />
            </svg>
            <span className="font-medium">{item.name}</span>
          </div>
          <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {isOpen && (
          <ul className="mt-1 space-y-1">
            {item.children.map((child) => (
              <li key={child.name}>
                <Link
                  href={child.href || '#'}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex items-center gap-3 px-4 py-2 ml-8 text-gray-500 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[child.icon]} />
                  </svg>
                  <span className="text-sm">{child.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li key={item.name}>
      <Link
        href={item.href || '#'}
        className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPaths[item.icon]} />
        </svg>
        <span className="font-medium">{item.name}</span>
      </Link>
    </li>
  );
}

export default function Sidebar() {
  const { state } = useAppStore();
  const { sidebarOpen } = state;
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set(['New Properties']));

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-10 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <MenuItem key={item.name} item={item} openMenus={openMenus} setOpenMenus={setOpenMenus} />
          ))}
        </ul>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <ul className="space-y-1">
            <li>
              <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}