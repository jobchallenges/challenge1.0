import { InputHTMLAttributes, useState } from "react";
import Autosuggest from "react-autosuggest";
import { ENTER_KEY, TAB_KEY, ESC_KEY } from "./constants";

interface ITagInputAutoComplete {
  onEnterKeyPressed: (tagLabel: string) => void;
  onTabKeyPressed: (tagLabel: string) => void;
  onEscKeyPressed: () => void;
  suggestedTags: string[];
}

const TagInputAutoComplete: React.FC<ITagInputAutoComplete> = ({ suggestedTags, onEnterKeyPressed, onTabKeyPressed, onEscKeyPressed }) => {
  const [value, setValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(suggestedTags);
  const [valid, setValid] = useState<boolean>(true);
  const isFreeInput = !suggestedTags.length;

  const onKeyPressed = (event: KeyboardEvent | any) => {
    const { key } = event;

    if (key !== ENTER_KEY && key !== TAB_KEY && key !== ESC_KEY) {
      return;
    }

    event.preventDefault();

    if (key === ESC_KEY) {
      onEscKeyPressed();
      return;
    }

    if (!isFreeInput && suggestedTags.indexOf(value) === -1) {
      setValid(false);
      return;
    }

    key === ENTER_KEY ? onEnterKeyPressed(value) : onTabKeyPressed(value);

    setValue("");
  };

  const getSuggestions = (value: string) => {
    if (isFreeInput) {
      return [];
    }

    return suggestedTags.filter((tag) => tag.toLowerCase().includes(value.toLowerCase()));
  };

  const renderSuggestionComponent = (suggestedTag: string) => <div className="cursor-pointer text-gray-600 text-sm leading-3 py-2 hover:bg-gray-100 px-2 ">{suggestedTag}</div>;
  const renderInputComponent = (inputProps: InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...inputProps}
      className={`bg-gray-200 h-6 w-36 rounded-full outline-0 focus:ring-1 text-base text-gray-800 p-2 ${valid ? "ring-gray-500" : "ring-red-300"}`}
      onKeyDown={onKeyPressed}
    />
  );

  const renderSuggestionsContainer = ({ containerProps, children }: any) => {
    const showSuggestions = !!(filteredSuggestions.length && value.length);
    return (
      showSuggestions && (
        <div {...containerProps} className="transition duration-300 opacity-100 bg-white shadow rounded mt-2 py-1 w-36 z-10 absolute">
          {children}
        </div>
      )
    );
  };

  return (
    <>
      <Autosuggest
        suggestions={filteredSuggestions}
        onSuggestionsFetchRequested={({ value }) => setFilteredSuggestions(getSuggestions(value))}
        getSuggestionValue={(suggestedTag) => suggestedTag}
        renderSuggestion={renderSuggestionComponent}
        inputProps={{ placeholder: "Enter Tag Name", value, onChange: (_, { newValue }) => setValue(newValue) }}
        renderInputComponent={renderInputComponent}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionsClearRequested={() => {
          setFilteredSuggestions([]);
          setValid(true);
        }}
      />
    </>
  );
};
export default TagInputAutoComplete;
