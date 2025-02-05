import { diffWords } from "diff";

self.onmessage = (event: MessageEvent) => {
  const { text1, text2 } = event.data;
  const diff = diffWords(text1, text2);
  self.postMessage(diff);
};
