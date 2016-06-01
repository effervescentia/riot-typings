import test = require('blue-tape');
import riot = require('riot');

test('riot exists', (t) => {
  t.plan(2);
  t.notEqual(riot, undefined);
  let emitter: riot.Observable = riot.observable('');

  t.notEqual(emitter, undefined);
});
