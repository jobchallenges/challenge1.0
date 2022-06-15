import { useState } from "react";

interface ITag {
  label: string;
  onDelete: () => void;
  disableDelete: boolean;
}

const Tag: React.FC<ITag> = ({ label, onDelete, disableDelete }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  return (
    <div className="bg-gray-200 h-6 w-fit p-2 rounded-full hover:ring-1 ring-gray-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className="flex items-center justify-around h-full w-full">
        <span className="text-sm text-gray-800 font-medium capitalize">{label}</span>
        {!disableDelete && isHovering && (
          <button className="ml-2" onClick={onDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#6b7280"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Tag;
