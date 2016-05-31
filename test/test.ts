import test = require('blue-tape');
import riot = require('riot');

test('riot exists', (t) => {
  t.plan(1);
  t.notEqual(riot, undefined);
});
