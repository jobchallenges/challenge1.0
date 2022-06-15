import { useState } from "react";
import TagLayout from "../../components/TagLayout";
import ViewLayout from "../../components/ViewLayout";
import SupplierData from "../../data/supplier.json";
import { tagTypes } from "./constants";
import { ISupplier, ITag } from "./supplier.d";

const Supplier = () => {
  const [supplier, setSupplier] = useState<ISupplier>(SupplierData);

  const getTagsbyKey = (key: keyof ISupplier) => supplier[key] as ITag[];

  const addNewTag = (key: keyof ISupplier, tagLabel: string) => {
    const tags = getTagsbyKey(key);
    const newTag = { id: Date.now(), name: tagLabel, type: tagTypes.find((type) => type.id === key)?.supplierBranch ?? "" };
    setSupplier({ ...supplier, [key]: [...tags, newTag] });
  };

  const deleteTag = (key: keyof ISupplier, tagId: number) => {
    const tags = getTagsbyKey(key);
    const updatedTags = tags.filter((tag) => tag.id !== tagId);
    setSupplier({ ...supplier, [key]: updatedTags });
  };

  return (
    <>
      <ViewLayout title={supplier.name}>
        {tagTypes.map((type) => {
          const key = type.id as keyof ISupplier;
          return (
            <TagLayout
              tags={getTagsbyKey(key)}
              title={type.name}
              key={type.id}
              suggestedTags={type.suggestedTags}
              onAddNewTag={(tagLabel) => addNewTag(key, tagLabel)}
              onDeleteTag={(tagId) => deleteTag(key, tagId)}
            />
          );
        })}
      </ViewLayout>
    </>
  );
};
export default Supplier;
