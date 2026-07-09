export interface TreeNodeData {
  id: string;
  label: string;
  children?: TreeNodeData[];
  icon?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  expanded?: boolean;
  [key: string]: unknown;
}

export interface TreeProps {
  data: TreeNodeData[];
  selectedKeys?: string[];
  defaultExpandedKeys?: string[];
  onSelect?: (key: string, node: TreeNodeData) => void;
  onExpand?: (key: string, expanded: boolean) => void;
  checkable?: boolean;
  defaultCheckedKeys?: string[];
  onCheck?: (checkedKeys: string[], node: TreeNodeData) => void;
}