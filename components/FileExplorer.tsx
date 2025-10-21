import React, { useState, useMemo } from 'react';
import { useSandpack, SandpackFiles } from '@codesandbox/sandpack-react';
import FileTree from './FileTree';
import PlusIcon from './icons/PlusIcon';
import Modal from './Modal';
import type { Tree } from '../types';

interface FileExplorerProps {
  onFilesUpdate: (files: SandpackFiles) => void;
}

const buildTree = (files: { [key: string]: any }): Tree => {
  const tree: Tree = {};
  Object.keys(files).forEach(path => {
    if (files[path].hidden) return;

    const parts = path.substring(1).split('/');
    let currentLevel: Tree = tree;
    
    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      if (isFile) {
        if (!currentLevel[part]) {
          currentLevel[part] = { type: 'file', path };
        }
      } else {
        if (!currentLevel[part]) {
          currentLevel[part] = { type: 'folder', path: `/${parts.slice(0, index + 1).join('/')}`, children: {} };
        }
        // This handles cases where a file might have been processed before its parent folder
        if (currentLevel[part].type === 'file') {
             currentLevel[part] = { type: 'folder', path: `/${parts.slice(0, index + 1).join('/')}`, children: {} };
        }
        currentLevel = (currentLevel[part] as any).children;
      }
    });
  });
  return tree;
};


const FileExplorer: React.FC<FileExplorerProps> = ({ onFilesUpdate }) => {
  const { sandpack: { files, updateFile } } = useSandpack();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFilePath, setNewFilePath] = useState('');
  const [modalError, setModalError] = useState('');

  const fileTree = useMemo(() => buildTree(files), [files]);

  const handleCreateFile = () => {
    setModalError('');
    const path = newFilePath.trim().startsWith('/') ? newFilePath.trim() : `/${newFilePath.trim()}`;

    if (path && path !== '/' && !files[path]) {
      const newFiles = { ...files, [path]: { code: '' } };
      onFilesUpdate(newFiles);
      updateFile(path, '');
      setIsModalOpen(false);
      setNewFilePath('');
    } else {
        setModalError("File path is invalid or already exists.");
    }
  };
  
  const openCreateModal = () => {
    setNewFilePath('');
    setModalError('');
    setIsModalOpen(true);
  };

  return (
    <aside className="w-64 bg-gray-200 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 p-2 flex flex-col flex-shrink-0">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold uppercase tracking-wider">Files</h2>
        <button
          onClick={openCreateModal}
          className="p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
          title="New File"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        <FileTree tree={fileTree} onFilesUpdate={onFilesUpdate} />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Create New File</h3>
        <input
          type="text"
          value={newFilePath}
          onChange={(e) => setNewFilePath(e.target.value)}
          placeholder="/path/to/new-file.js"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleCreateFile()}
        />
        {modalError && <p className="text-red-500 text-sm mt-2">{modalError}</p>}
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateFile}
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Create
          </button>
        </div>
      </Modal>
    </aside>
  );
};

export default FileExplorer;