// FIX: Import React for FC and SVGProps types.
import type React from 'react';
import type { SandpackFiles } from '@codesandbox/sandpack-react';

export type Theme = 'light' | 'dark';

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  files: SandpackFiles;
}

export interface ProjectTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  tags: string[];
  files: SandpackFiles;
}

export interface FileSystemNode {
  path: string;
}

export interface FileNode extends FileSystemNode {
  type: 'file';
}

export interface FolderNode extends FileSystemNode {
  type: 'folder';
  children: Tree;
}

export type TreeNode = FileNode | FolderNode;

export interface Tree {
  [key: string]: TreeNode;
}

export { SandpackFiles };