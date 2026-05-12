import { useState } from "react";
import { explorerData } from "./fileData";
import Files from "./Files";



// if Object type
// const addNewNodeData1 = (node, newFileData) => {
//   const newNode = {
//     id: Date.now(),
//     name: newFileData.fileFolderName,
//     isFolder: newFileData.type,
//     items: [],
//   };

//   // Parent folder found
//   if (node.id === newFileData.id && node.isFolder) {
//     return {
//       ...node,
//       items: [...node.items, newNode],
//     };
//   }

//   // Traverse children recursively
//   if (node.items?.length > 0) {
//     return {
//       ...node,
//       items: node.items.map((child) =>
//         addNewNodeData(child, newFileData)
//       ),
//     };
//   }

//   return node;
// };

//addNewNodeData type array
const addNewNodeData = (currentData = [], newFileData) => {
  const newNode = {
    id: Date.now(),
    name: newFileData.fileFolderName,
    isFolder: newFileData.type,
    items: [],
  };

  return currentData.map((item) => {
    // Parent folder found
    if (item.id === newFileData.id) {
      return {
        ...item,
        items: [...item.items, newNode],
      };
    }

    // Check nested folders recursively
    if (item.items?.length > 0) {
      return {
        ...item,
        items: addNewNodeData(item.items, newFileData),
      };
    }

    // No changes
    return item;
  });
};

const FileExplorer = () => {
  const [fileData, setFileData] = useState(structuredClone(explorerData));

  const callParent = (newFileData = {}) => {
    console.log(newFileData);
    const newAllData = addNewNodeData(structuredClone(fileData), newFileData);
    setFileData(newAllData);
  };

  return (
    <div className="my-2 flex flex-col">
      {fileData?.map((file) => {
        return <Files data={file} key={file?.id} callParent={callParent} />;
      })}
    </div>
  );
};

export default FileExplorer;
