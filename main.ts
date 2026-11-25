// Make the AI Judge Feel Nostalgic: A Childhood Memory — one sentence.
// The program writes exactly one sentence of plain text to /output/entry.txt:
// at most 280 characters, a single sentence, nothing else.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MEMORY =
  "Every summer evening my grandmother\u2019s kitchen smelled of fresh rice and woodsmoke, and she pressed the warm pot lid into my hands like a small sun, humming a song she never finished, as if supper \u2014 and she \u2014 would last forever.";

const MAX_CHARS = 280;
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function validate(line: string): void {
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`memory must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.trim().length === 0 || /\r|\n/.test(line)) {
    throw new Error("memory must be a single non-blank line");
  }
  if (!line.endsWith(".")) {
    throw new Error("memory must be one sentence ending with a period");
  }
  // One sentence only: no sentence-ending punctuation mid-line.
  const body = line.slice(0, -1);
  if (/[.!?]\s/.test(body) || /[.!?]$/.test(body)) {
    throw new Error("memory must be a single sentence, not two");
  }
}

validate(MEMORY);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, MEMORY, "utf8");

// Read the file back: a silent short write must fail loudly, never ship.
const written = readFileSync(OUT_FILE, "utf8");
if (written !== MEMORY) {
  throw new Error("entry.txt does not match the memory line");
}
console.log(`wrote ${MEMORY.length} characters to ${OUT_FILE}`);
