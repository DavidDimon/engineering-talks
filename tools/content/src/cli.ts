#!/usr/bin/env node
import path from 'node:path';
import process from 'node:process';

import {
  buildCatalog,
  ContentValidationError,
  validateMetadataFile,
  writeCatalog,
} from './catalog.js';

function valueAfter(flag: string, args: readonly string[]): string | undefined {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0] ?? 'validate';
  const workspaceRoot = path.resolve(valueAfter('--root', args) ?? process.cwd());
  const filePath = valueAfter('--file', args);

  if (filePath) {
    const metadata = await validateMetadataFile(path.resolve(workspaceRoot, filePath));
    process.stdout.write(`Valid metadata: ${metadata.kind}/${metadata.slug}\n`);
    return;
  }

  const catalog = await buildCatalog(workspaceRoot, {
    includeDrafts: args.includes('--include-drafts'),
  });

  if (command === 'validate') {
    process.stdout.write(
      `Content is valid; ${catalog.items.length} item(s) included in the catalog.\n`,
    );
    return;
  }
  if (command !== 'generate') {
    throw new Error(`Unknown command "${command}". Use "validate" or "generate".`);
  }

  const outputPath = await writeCatalog(workspaceRoot, catalog);
  process.stdout.write(`Generated ${path.relative(workspaceRoot, outputPath)}.\n`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exitCode = error instanceof ContentValidationError ? 1 : 2;
});
