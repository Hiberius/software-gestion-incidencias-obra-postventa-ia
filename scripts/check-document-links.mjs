import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const excludedDirectories = new Set([
  ".git",
  ".next",
  ".tmp",
  "coverage",
  "node_modules",
  "out",
  "playwright-report",
  "test-results",
]);

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return excludedDirectories.has(entry.name)
        ? []
        : markdownFiles(absolutePath);
    }

    return entry.isFile() && entry.name.endsWith(".md") ? [absolutePath] : [];
  });
}

const linkPattern = /!?\[[^\]]*]\(([^)]+)\)/g;
const failures = [];

for (const file of markdownFiles(root)) {
  const content = readFileSync(file, "utf8");

  for (const match of content.matchAll(linkPattern)) {
    const rawTarget = match[1].trim().replace(/^<|>$/g, "");
    const target = rawTarget.split(/\s+["']/)[0].split("#")[0];

    if (
      !target ||
      target.startsWith("#") ||
      /^(?:https?:|mailto:|tel:)/i.test(target)
    ) {
      continue;
    }

    const resolved = path.resolve(path.dirname(file), decodeURI(target));

    if (!existsSync(resolved)) {
      failures.push(
        `${path.relative(root, file)} -> ${path.relative(root, resolved)}`,
      );
      continue;
    }
  }
}

if (failures.length > 0) {
  console.error("Enlaces locales rotos:\n" + failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Todos los enlaces locales de Markdown son válidos.");
}
