import React, { useState } from 'react';
import { useSandpack } from '@codesandbox/sandpack-react';
import type { Tree, TreeNode, FolderNode, SandpackFiles } from '../types';
import FileCodeIcon from './icons/FileCodeIcon';
import FolderIcon from './icons/FolderIcon';
import TrashIcon from './icons/TrashIcon';
import PencilIcon from './icons/PencilIcon';
import Modal from './Modal';

interface FileTreeProps {
  tree: Tree;
  onFilesUpdate: (files: SandpackFiles) => void;
  level?: number;
}

const FileTree: React.FC<FileTreeProps> = ({ tree, onFilesUpdate, level = 0 }) => {
  const { sandpack: { activeFile, files, setActiveFile }, dispatch } = useSandpack();
  const [renameModal, setRenameModal] = useState<{ isOpen: boolean; path: string; isFolder: boolean }>({ isOpen: false, path: '', isFolder: false });
  const [newPath, setNewPath] = useState('');
  const [renameError, setRenameError] = useState('');

  const handleDelete = (path: string, isFolder: boolean) => {
    if (window.confirm(`Are you sure you want to delete ${path}? This cannot be undone.`)) {
      const newFiles: SandpackFiles = {};
      const prefix = path + '/';

      for (const filePath in files) {
        if (isFolder) {
          if (!filePath.startsWith(prefix)) {
            newFiles[filePath] = files[filePath];
          }
        } else {
          if (filePath !== path) {
            newFiles[filePath] = files[filePath];
          }
        }
      }

      let activeFileWasDeleted = false;
      if (isFolder) {
        activeFileWasDeleted = activeFile.startsWith(prefix);
      } else {
        activeFileWasDeleted = activeFile === path;
      }

      if (activeFileWasDeleted) {
        const newActiveFile = Object.keys(newFiles).find(f => !newFiles[f].hidden) || '';
        setActiveFile(newActiveFile);
      }
      
      dispatch({ type: 'reset', files: newFiles });
      onFilesUpdate(newFiles);
    }
  };
  
  const openRenameModal = (path: string, isFolder: boolean) => {
    setNewPath(path);
    setRenameError('');
    setRenameModal({ isOpen: true, path, isFolder });
  };

  const handleRename = () => {
    const oldPath = renameModal.path;
    const isFolder = renameModal.isFolder;
    const finalNewPath = (newPath.startsWith('/') ? newPath : `/${newPath}`).trim();
    setRenameError('');

    if (!finalNewPath || oldPath === finalNewPath) {
        setRenameModal({ isOpen: false, path: '', isFolder: false });
        return;
    }
    
    const pathExists = Object.keys(files).some(p => 
      isFolder ? p.startsWith(finalNewPath + '/') || p === finalNewPath : p === finalNewPath
    );

    if (pathExists) {
        setRenameError("New path is invalid or already exists.");
        return;
    }

    const newFiles: SandpackFiles = {};
    if (isFolder) {
      const prefix = oldPath + '/';
      for (const filePath in files) {
        if (filePath.startsWith(prefix)) {
          const newFilePath = finalNewPath + filePath.substring(oldPath.length);
          newFiles[newFilePath] = files[filePath];
        } else {
          newFiles[filePath] = files[filePath];
        }
      }
    } else { // It's a file
      for (const filePath in files) {
        if (filePath === oldPath) {
          newFiles[finalNewPath] = files[filePath];
        } else {
          newFiles[filePath] = files[filePath];
        }
      }
    }
    
    // Update the Sandpack instance and the persistent state
    dispatch({ type: 'reset', files: newFiles });
    onFilesUpdate(newFiles);

    // Update active file if it was part of the rename
    if (isFolder) {
      if (activeFile.startsWith(oldPath + '/')) {
        const newActiveFile = finalNewPath + activeFile.substring(oldPath.length);
        setActiveFile(newActiveFile);
      }
    } else if (activeFile === oldPath) {
      setActiveFile(finalNewPath);
    }
    
    setRenameModal({ isOpen: false, path: '', isFolder: false });
  };

  return (
    <div style={{ paddingLeft: level > 0 ? '1rem' : 0 }}>
      {Object.entries(tree)
        .sort(([aName, a]: [string, TreeNode], [bName, b]: [string, TreeNode]) => {
          if (a.type === 'folder' && b.type === 'file') return -1;
          if (a.type === 'file' && b.type === 'folder') return 1;
          return aName.localeCompare(bName);
        })
        .map(([name, node]: [string, TreeNode]) => {
          if (node.type === 'folder') {
            return <FolderItem key={node.path} name={name} node={node} level={level} onDelete={handleDelete} onRename={openRenameModal} />;
          }
          return (
            <div
              key={node.path}
              onClick={() => setActiveFile(node.path)}
              className={`flex items-center justify-between group px-2 py-1 rounded cursor-pointer ${
                activeFile === node.path
                  ? 'bg-blue-500/20 text-blue-500 dark:text-blue-400'
                  : 'hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FileCodeIcon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate">{name}</span>
              </div>
               <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={(e) => { e.stopPropagation(); openRenameModal(node.path, false); }} className="p-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600"><PencilIcon className="w-3 h-3"/></button>
                 <button onClick={(e) => { e.stopPropagation(); handleDelete(node.path, false)}} className="p-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600"><TrashIcon className="w-3 h-3"/></button>
               </div>
            </div>
          );
        })}
        {renameModal.isOpen && (
            <Modal isOpen={renameModal.isOpen} onClose={() => setRenameModal({isOpen: false, path: '', isFolder: false})}>
                 <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Rename</h3>
                <input
                    type="text"
                    value={newPath}
                    onChange={(e) => setNewPath(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                />
                 {renameError && <p className="text-red-500 text-sm mt-2">{renameError}</p>}
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={() => setRenameModal({ isOpen: false, path: '', isFolder: false })} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                    <button onClick={handleRename} className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors">Rename</button>
                </div>
            </Modal>
        )}
    </div>
  );
};

const FolderItem: React.FC<{
  name: string;
  node: FolderNode;
  level: number;
  onDelete: (path: string, isFolder: boolean) => void;
  onRename: (path: string, isFolder: boolean) => void;
}> = ({ name, node, level, onDelete, onRename }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  // FileTree requires onFilesUpdate, but it's handled at the top level.
  // We grab it from context here to pass it down recursively.
  const { onFilesUpdate } = React.useContext(FileTreeContext);

  return (
    <div key={node.path}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between group px-2 py-1 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        <div className="flex items-center gap-2 truncate">
          <FolderIcon className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-semibold truncate">{name}</span>
        </div>
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); onRename(node.path, true); }} className="p-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600"><PencilIcon className="w-3 h-3"/></button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(node.path, true)}} className="p-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600"><TrashIcon className="w-3 h-3"/></button>
        </div>
      </div>
      {isOpen && <FileTree tree={node.children} level={level + 1} onFilesUpdate={onFilesUpdate} />}
    </div>
  );
};


// Create a context to pass down the onFilesUpdate function through recursion
// without having to add it to the props of every recursive call site.
const FileTreeContext = React.createContext<{ onFilesUpdate: (files: SandpackFiles) => void }>({
  onFilesUpdate: () => {},
});

const FileTreeWrapper: React.FC<FileTreeProps> = (props) => {
    return (
        <FileTreeContext.Provider value={{ onFilesUpdate: props.onFilesUpdate }}>
            <FileTree {...props} />
        </FileTreeContext.Provider>
    );
};

export default FileTreeWrapper;