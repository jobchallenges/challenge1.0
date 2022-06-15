import { useState } from "react";
import { ITag } from "../../views/Supplier/supplier";
import NewTagButton from "../NewTagButton";
import Tag from "../Tag";
import TagInputAutoComplete from "../TagInputAutoComplete";

interface ITagLayout {
  title: string;
  tags: ITag[];
  suggestedTags: string[];
  onAddNewTag: (tagLabel: string) => void;
  onDeleteTag: (id: number) => void;
}

const TagLayout: React.FC<ITagLayout> = ({ tags, title, suggestedTags, onAddNewTag, onDeleteTag }) => {
  const [showNewTagButton, setShowNewTagButton] = useState(true);

  return (
    <div className="container md:mt-8 mt-3">
      <h6 className="text-gray-500  mb-3">{title}</h6>
      <div className="flex gap-3 flex-wrap">
        {tags.map((tag, idx) => {
          return <Tag key={tag.id} label={tag.name} onDelete={() => onDeleteTag(tag.id)} disableDelete={idx === 0} />;
        })}

        {showNewTagButton ? (
          <NewTagButton onClick={() => setShowNewTagButton(false)} />
        ) : (
          <TagInputAutoComplete
            suggestedTags={suggestedTags}
            onEnterKeyPressed={(tagLabel) => {
              onAddNewTag(tagLabel);
              setShowNewTagButton(true);
            }}
            onTabKeyPressed={(tagLabel) => onAddNewTag(tagLabel)}
            onEscKeyPressed={() => setShowNewTagButton(true)}
          />
        )}
      </div>
    </div>
  );
};
export default TagLayout;
