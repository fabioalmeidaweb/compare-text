import classNames from "classnames";

type TextAreaProps = {
  text: string;
  expanded: boolean;
  onChange: (text: string) => void;
};

export function TextArea({ text, expanded, onChange }: TextAreaProps) {
  const className = classNames(
    "border-2 border-solid bg-slate-700 text-slate-50 border-slate-700 hover:border-slate-800 focus:border-slate-900 focus:outline-none w-full h-64 rounded-lg p-5",
    { "h-50": !expanded, "h-200": expanded }
  );

  return (
    <textarea
      className={className}
      value={text}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
