import React, { useState } from "react";
import { Change } from "diff";
import { TextArea } from "./components/TextArea";
import classNames from "classnames";

const App: React.FC = () => {
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [diffResult, setDiffResult] = useState<Change[]>([]);

  const worker = new Worker(
    new URL("./workers/diffWorker.ts", import.meta.url),
    { type: "module" }
  );
  const handleCompare = () => {
    worker.postMessage({ text1, text2 });
    worker.onmessage = (event) => {
      setDiffResult(event.data);
      worker.terminate();
    };
  };

  return (
    <main className="flex flex-col gap-5 w-full h-screen  p-10 font-mono">
      <header className="m-10">
        <h1 className="text-5xl font-bold text-center">Compare Text</h1>
      </header>
      <section className="flex gap-5 m-10">
        <TextArea text={text1} onChange={setText1} />
        <TextArea text={text2} onChange={setText2} />
      </section>

      <section className="flex justify-center m-10">
        <button
          className="border-2 border-solid rounded-lg text-2xl w-32"
          onClick={handleCompare}
        >
          Compare
        </button>
      </section>

      <section className="flex justify-center m-10">
        <div className="bg-zinc-200 w-300 h-auto rounded-lg p-5">
          {diffResult.map((part, index) => {
            return (
              <span
                key={index}
                className={classNames(
                  part.added ? "bg-green-200" : "",
                  part.removed ? "bg-rose-200" : "",
                  "font-mono",
                  "whitespace-pre-wrap"
                )}
                dangerouslySetInnerHTML={{
                  __html: part.value.replace(/\n/g, "<br />"),
                }}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default App;
