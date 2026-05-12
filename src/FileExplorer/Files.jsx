import React, { Fragment, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ConstructionIcon,
  FilePlusCorner,
  FolderPlus,
} from "lucide-react";

const Files = ({ data = {}, callParent = () => {} }) => {
  const [showChild, setShowChild] = useState(false);
  const [fileFoderName, setFileFoderName] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isFile, setIsFile] = useState(false);

  const {
    name = "",
    isFolder = false,
    items = [],
    id = "",
  } = data;

  const addFileAndFolder = (type) => {
    setIsFile(type);
    setShowInput(true);
  };

  //handleChange
  const handleChange = (e) => {
    const val = e.target.value;
    setFileFoderName(val);
  };

  const addNewFIleAndFolder = () => {
    const payload = {
      id,
      type: isFile,
      fileFoderName,
    };
    console.log(payload);
    callParent(payload);
    setFileFoderName('');
    setShowInput(false)
  };

  // handleKeyDown
  const handleKeyDown = (e) => {
    // if (!fileFoderName) return;
    if (e.keyCode === 13 || e.key === "Enter") {
      // save file name
      addNewFIleAndFolder();
    }
  };

  // handleBlur
  const handleBlur = (e) => {
    // if (!fileFoderName) return;
    // save file name
    addNewFIleAndFolder();
  };

  return (
    <Fragment>
      {isFolder ? (
        <div className="folderWraper">
          <div
            className="singleFile flex justify-between cursor-pointer items-center"
            onClick={() => setShowChild((p) => !p)}
          >
            <div className="filename flex gap-0.5">
              <ChevronRight />
              <span>{name}</span>
            </div>

            <div className="actions flex gap-1">
              <FilePlusCorner
                size={16}
                onClick={() => addFileAndFolder(false)}
              />
              <FolderPlus size={16} onClick={() => addFileAndFolder(true)} />
            </div>
          </div>

          {showChild && (
            <div className="childwitInput">
              {items.length > 0 && <div className="chilItems pl-4">
                {items.map((cFile) => (
                  <Files data={cFile} callParent={callParent} />
                ))}
              </div>}

              {showInput && (
                <input
                  value={fileFoderName}
                  onChange={handleChange}
                  className="border bg-white text-black"
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="singleFile flex gap-0.5 cursor-pointer items-cente">
          <span>{name}</span>
        </div>
      )}
    </Fragment>
  );
};

export default Files;
