import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";

interface FormInputsProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
  name: string;
  className: string;
}

export default function FormInput({
  type,
  placeholder,
  required,
  errors,
  name,
  className,
}: FormInputsProps) {
  return (
    <div className="gap-2 flex flex-col">
      <div
        className={`flex items-center px-3 border-2 border-neutral-200 rounded-full gap-2  h-14 ${className}`}
      >
        {name === "password" ? (
          <KeyIcon className="size-6 text-neutral-500" />
        ) : name === "email" ? (
          <EnvelopeIcon className="size-6 text-neutral-500" />
        ) : name === "name" ? (
          <UserIcon className="size-6 text-neutral-500" />
        ) : (
          <></>
        )}
        <input
          name={name}
          className={"outline-none"}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </div>
      {errors.map((error, index) => (
        <span key={index} className="text-rose-400 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
