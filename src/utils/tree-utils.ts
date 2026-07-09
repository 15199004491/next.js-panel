export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  parentId?: string;
  [key: string]: unknown;
}

export const flattenTree = (tree: TreeNode[]): TreeNode[] => {
  const result: TreeNode[] = [];
  const traverse = (nodes: TreeNode[], parentId?: string) => {
    nodes.forEach(node => {
      result.push({ ...node, parentId });
      if (node.children) traverse(node.children, node.id);
    });
  };
  traverse(tree);
  return result;
};

export const buildTree = (list: TreeNode[]): TreeNode[] => {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];
  list.forEach(node => map.set(node.id, { ...node, children: [] }));
  list.forEach(node => {
    if (node.parentId && map.has(node.parentId)) {
      map.get(node.parentId)?.children?.push(map.get(node.id)!);
    } else {
      roots.push(map.get(node.id)!);
    }
  });
  return roots;
};

export const findNodeById = (tree: TreeNode[], id: string): TreeNode | undefined => {
  let result: TreeNode | undefined;
  const traverse = (nodes: TreeNode[]) => {
    for (const node of nodes) {
      if (node.id === id) {
        result = node;
        return;
      }
      if (node.children) traverse(node.children);
    }
  };
  traverse(tree);
  return result;
};

export const getPathToNode = (tree: TreeNode[], id: string): TreeNode[] => {
  const path: TreeNode[] = [];
  const traverse = (nodes: TreeNode[]): boolean => {
    for (const node of nodes) {
      path.push(node);
      if (node.id === id) return true;
      if (node.children && traverse(node.children)) return true;
      path.pop();
    }
    return false;
  };
  traverse(tree);
  return path;
};

export const filterTree = (tree: TreeNode[], predicate: (node: TreeNode) => boolean): TreeNode[] => {
  const traverse = (nodes: TreeNode[]): TreeNode[] => {
    const filtered: TreeNode[] = [];
    nodes.forEach(node => {
      const children = node.children ? traverse(node.children) : [];
      if (predicate(node) || children.length > 0) {
        filtered.push({ ...node, children: children.length > 0 ? children : undefined });
      }
    });
    return filtered;
  };
  return traverse(tree);
};

export const countTreeNodes = (tree: TreeNode[]): number => {
  let count = 0;
  const traverse = (nodes: TreeNode[]) => {
    count += nodes.length;
    nodes.forEach(node => { if (node.children) traverse(node.children); });
  };
  traverse(tree);
  return count;
};