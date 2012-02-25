module('object');

test('functions exists', 3, function() {
  equal(typeof aqua.game, 'function', 'game');
  equal(typeof aqua.entity, 'function', 'entity');
  equal(typeof aqua.component, 'function', 'component');
});

test('component add/destroy events', 10, function() {
  var game, entity, testComponent;

  function TestComponent() {};
  TestComponent.prototype = aqua.extend(
    aqua.component(),
    {
      onadd: function() {
        ok(true, 'onadd');
      },
      ondestroy: function() {
        ok(true, 'ondestroy');
      },
      ongameadd: function() {
        ok(true, 'ongameadd');
      },
      ongamedestroy: function() {
        ok(true, 'ongamedestroy');
      }
    });

  game = aqua.game();
  entity = aqua.entity();
  testComponent = new TestComponent();

  entity.add(testComponent);
  testComponent.destroy();

  game.add(entity);
  entity.add(testComponent);
  entity.destroy();
  game.step();
  testComponent.destroy();

  entity.add(testComponent);
  game.add(entity);
  testComponent.destroy();
  game.step();
});

test('component method calls', 2, function() {
  function TestComponent() {};
  TestComponent.prototype = aqua.extend(
    aqua.component(),
    {
      update: function() {
        ok(true, 'update');
      },
      lateUpdate: function() {
        ok(true, 'lateUpdate');
      }
    });

  var game = aqua.game(),
      entity = aqua.entity(),
      testComponent = new TestComponent();

  entity.add(testComponent);
  game.add(entity);
  game.step();
});
