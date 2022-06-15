type TagType = "tags-general" | "tags-certificates" | "tags-portfolio";
type TagTypeRecord = Record<TagType, ITag[]>;

interface ITag {
  id: number;
  name: string;
  type: string;
}
export interface ISupplier extends TagTypeRecord {
  name: string;
}
