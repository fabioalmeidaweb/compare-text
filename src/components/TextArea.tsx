type TextAreaProps = {
  text: string;
  onChange: (text: string) => void;
};

export function TextArea({ text, onChange }: TextAreaProps) {
  return (
    <textarea
      className="border-2 border-solid border-zinc-200 hover:border-zinc-300 focus:border-zinc-400 focus:outline-none w-full h-64 rounded-lg p-5"
      value={text}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
