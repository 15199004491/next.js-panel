import { useState, useMemo } from 'react';
import TreeNode from '../tree-node';
import type { TreeNodeData, TreeProps } from './types';

export default function CommonTree({
  data,
  selectedKeys = [],
  defaultExpandedKeys = [],
  onSelect,
  onExpand,
  checkable = false,
  defaultCheckedKeys = [],
  onCheck,
}: TreeProps) {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandedKeys);
  const [checkedKeys, setCheckedKeys] = useState<string[]>(defaultCheckedKeys);

  const handleExpand = (key: string) => {
    const isExpanded = expandedKeys.includes(key);
    const newExpandedKeys = isExpanded
      ? expandedKeys.filter((k) => k !== key)
      : [...expandedKeys, key];
    setExpandedKeys(newExpandedKeys);
    onExpand?.(key, !isExpanded);
  };

  const handleSelect = (key: string, node: TreeNodeData) => {
    onSelect?.(key, node);
  };

  const handleCheck = (key: string, node: TreeNodeData) => {
    const isChecked = checkedKeys.includes(key);
    const newCheckedKeys = isChecked
      ? checkedKeys.filter((k) => k !== key)
      : [...checkedKeys, key];
    setCheckedKeys(newCheckedKeys);
    onCheck?.(newCheckedKeys, node);
  };

  const renderTree = useMemo(() => {
    const renderNode = (nodes: TreeNodeData[], level = 0) => {
      return nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          level={level}
          isExpanded={expandedKeys.includes(node.id)}
          isSelected={selectedKeys.includes(node.id)}
          isChecked={checkedKeys.includes(node.id)}
          checkable={checkable}
          onExpand={() => handleExpand(node.id)}
          onSelect={() => handleSelect(node.id, node)}
          onCheck={() => handleCheck(node.id, node)}
        >
          {node.children && expandedKeys.includes(node.id) && renderNode(node.children, level + 1)}
        </TreeNode>
      ));
    };
    return <ul className="list-none p-0 m-0">{renderNode(data)}</ul>;
  }, [data, expandedKeys, selectedKeys, checkedKeys, checkable]);

  return <div className="tree-container">{renderTree}</div>;
}