import type { TreeNodeData } from '../common-tree/types';

interface TreeNodeProps {
  node: TreeNodeData;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  isChecked: boolean;
  checkable: boolean;
  onExpand: () => void;
  onSelect: () => void;
  onCheck: () => void;
  children?: React.ReactNode;
}

export default function TreeNode({
  node,
  level,
  isExpanded,
  isSelected,
  isChecked,
  checkable,
  onExpand,
  onSelect,
  onCheck,
  children,
}: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <li className={`relative ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'} transition-colors`} style={{ paddingLeft: `${level * 16}px` }}>
      <div className="flex items-center gap-2 py-2 px-2 rounded cursor-pointer" onClick={onSelect}>
        {hasChildren && (
          <button onClick={(e) => { e.stopPropagation(); onExpand(); }} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
            <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        {!hasChildren && <span className="w-6" />}
        {checkable && (
          <input type="checkbox" checked={isChecked} onChange={(e) => { e.stopPropagation(); onCheck(); }} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" disabled={node.disabled} />
        )}
        {node.icon}
        <span className={`flex-1 text-sm ${isSelected ? 'text-blue-600 font-medium' : 'text-gray-700'} ${node.disabled ? 'text-gray-400 cursor-not-allowed' : ''}`}>
          {node.label}
        </span>
      </div>
      {children}
    </li>
  );
}