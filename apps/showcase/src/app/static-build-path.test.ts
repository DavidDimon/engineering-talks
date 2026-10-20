import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';

import { decodeRoutePath, isPathInsideRoot } from './static-build-path.js';

test('accepts files inside the configured static root', () => {
  const root = path.resolve('/workspace/dist/presentations');

  assert.equal(isPathInsideRoot(root, path.join(root, 'flutter', 'index.html')), true);
  assert.equal(isPathInsideRoot(root, root), true);
});

test('rejects parent and similarly prefixed sibling directories', () => {
  const root = path.resolve('/workspace/dist/presentations');

  assert.equal(isPathInsideRoot(root, path.resolve(root, '..', 'private', 'token.txt')), false);
  assert.equal(
    isPathInsideRoot(root, path.resolve(root, '..', 'presentations-private', 'token.txt')),
    false,
  );

  const encodedTraversal = decodeRoutePath(
    '/engineering-talks/presentations/%2e%2e%2fpresentations-private%2ftoken.txt',
    '/engineering-talks/presentations/',
  );
  assert.notEqual(encodedTraversal, undefined);
  assert.equal(isPathInsideRoot(root, path.normalize(path.join(root, encodedTraversal!))), false);
});

test('rejects malformed encoded paths without throwing', () => {
  assert.equal(
    decodeRoutePath('/engineering-talks/presentations/%', '/engineering-talks/presentations/'),
    undefined,
  );
});

test('decodes a valid route path', () => {
  assert.equal(
    decodeRoutePath(
      '/engineering-talks/presentations/software-testing/index.html',
      '/engineering-talks/presentations/',
    ),
    'software-testing/index.html',
  );
});
