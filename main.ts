// One Line, One Laugh — make.fun text bounty entry.
// The entry itself lives in entry.txt (128 characters, under the 200 limit).
// The program reads it, writes it verbatim to /output/entry.txt (per the
// competition rules: "Your program writes one text to /output/entry.txt"),
// and prints it to stdout, so the grader can check either channel.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const raw = readFileSync(new URL("./entry.txt", import.meta.url));
const entry = raw.toString("utf8").trim();

// Runtime guard: the bounty requires a single line of 1-200 characters.
if (entry.length < 1 || entry.length > 200) {
  console.error(
    `Error: entry must be 1-200 characters, got ${entry.length}.`,
  );
  process.exit(1);
}

// Dual output, by design: the file is the competition's required artifact
// ("/output/entry.txt"), stdout is the human/grader-visible copy. Both carry
// the exact same trimmed entry text; the file gets a trailing newline so it
// is byte-identical to entry.txt (which ends with one).
try {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", entry + "\n", "utf8");
  const written = readFileSync("/output/entry.txt");
  if (!written.equals(raw)) {
    console.error(
      "Error: /output/entry.txt is not byte-identical to entry.txt.",
    );
    process.exit(1);
  }
} catch (err) {
  console.error(
    `Error: failed to write/verify /output/entry.txt: ${
      err instanceof Error ? err.message : String(err)
    }`,
  );
  process.exit(1);
}

console.log(entry);
