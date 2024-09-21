import React, {
  type ChangeEvent,
  type InvalidEvent,
  type KeyboardEvent,
} from "react";

export interface FormFieldProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  required?: boolean;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  isSurpriseMe?: boolean;
  handleSurpriseMePrompt?: () => void;
  autoComplete?: string;
  rows: number;
  maxLength?: number;
  minLength?: number;
  preventEnterKeyDefault?: boolean;
  inputMode: "search" | "text";
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  placeholder,
  value,
  required,
  handleChange,
  isSurpriseMe,
  handleSurpriseMePrompt,
  autoComplete,
  rows,
  minLength = 3,
  maxLength = 300,
  preventEnterKeyDefault = false,
  inputMode,
}: FormFieldProps) => {
  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { currentTarget } = event;

    if (!currentTarget.validity.valid) {
      currentTarget.setCustomValidity("");
      currentTarget.checkValidity();
    }
  };

  const handleInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
    const { currentTarget } = event;

    if (currentTarget.validity.valueMissing) {
      currentTarget.setCustomValidity(
        `Please enter your ${currentTarget.name} here.`,
      );
    }
    if (currentTarget.validity.typeMismatch) {
      currentTarget.setCustomValidity(
        `Please enter valid ${currentTarget.name} here.`,
      );
    }
    if (currentTarget.validity.patternMismatch) {
      currentTarget.setCustomValidity(
        `Please enter valid ${currentTarget.name} here.`,
      );
    }
  };

  const handleDisableEnterKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 13) event.preventDefault();
  };

  return (
    <fieldset>
      <div className="mb-2 flex items-center gap-2">
        <label
          htmlFor={name}
          className="block text-sm md:text-base font-medium text-gray-900"
        >
          {label}
        </label>

        {required && (
          <span className="-ml-2 text-red-800" aria-label="required">
            &#42;
          </span>
        )}

        {isSurpriseMe && (
          <button
            type="button"
            className="py-1 md:p-3 px-2 md-p-6 bg-[#ECECF1] rounded-lg font-semibold md:font-bol text-xs md:base text-black uppercase hover:bg-[#CACAD1] hover:outline-none hover:translate-y-0.5 hover:scale-90 transition duration-100 ease-out hover:ease-in border border-slate-300"
            onClick={handleSurpriseMePrompt}
          >
            Surprise me
          </button>
        )}
      </div>
      <textarea
        id={name}
        name={name}
        value={value}
        inputMode={inputMode}
        placeholder={"Eg: " + placeholder}
        onChange={handleChange}
        onInput={handleInput}
        onInvalid={handleInvalid}
        onKeyDown={preventEnterKeyDefault ? handleDisableEnterKey : undefined}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base text-ellipsis rounded-lg focus:ring-secondary focus:border-secondary outline-none block w-full p-3 resize-none overflow-x-hidden`}
        rows={rows}
        autoComplete={autoComplete}
      />
    </fieldset>
  );
};

export default FormField;
