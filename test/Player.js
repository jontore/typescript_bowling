var Player = require("../lib/player");

describe("Player", function () {
  it('should have a name', function() {
    var player = new Player('my-name');
    expect(player.name).toBe('my-name');
  });
});
