const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  },
  scene: { preload, create, update }
};

const game = new Phaser.Game(config);

let cursors;
let shootKey;
let ship;
let bullets;
let lastShot = 0;
const SHOT_COOLDOWN = 180;
const MAX_BULLETS = 50;

function preload() {
  this.load.image('bg_far',  'assets/bg_far.png');
  this.load.image('bg_mid',  'assets/bg_mid.png');
  this.load.image('bg_near', 'assets/bg_near.png');
  this.load.image('ship',    'assets/ship.png');
  this.load.image('bullet',  'assets/bullet.png');
}

function create() {
  this.bgFar  = this.add.tileSprite(config.width/2, config.height/2, config.width, config.height, 'bg_far');
  this.bgMid  = this.add.tileSprite(config.width/2, config.height/2, config.width, config.height, 'bg_mid');
  this.bgNear = this.add.tileSprite(config.width/2, config.height/2, config.width, config.height, 'bg_near');

  ship = this.physics.add.sprite(config.width/2, config.height - 120, 'ship');
  ship.setCollideWorldBounds(true);
  ship.body.setDrag(600, 600);
  ship.body.setMaxVelocity(350, 350);
  ship.setDepth(2);

  bullets = this.physics.add.group({
    classType: Phaser.Physics.Arcade.Image,
    maxSize: MAX_BULLETS,
    runChildUpdate: false
  });

  for (let i = 0; i < MAX_BULLETS; i++) {
    const b = bullets.get(-100, -100, 'bullet');
    if (b) {
      b.setActive(false);
      b.setVisible(false);
      b.body && b.body.enable && (b.body.enable = false);
    }
  }

  cursors = this.input.keyboard.createCursorKeys();
  shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  this.sceneSpeed = 140;

  this.bulletsText = this.add.text(10, 10, '', { font: '16px Arial', fill: '#ffffff' }).setDepth(10);
}

function update(time, delta) {
  const dt = delta / 1000;

  const accel = 900;
  if (cursors.left.isDown) {
    ship.setAccelerationX(-accel);
  } else if (cursors.right.isDown) {
    ship.setAccelerationX(accel);
  } else {
    ship.setAccelerationX(0);
  }
  if (cursors.up.isDown) {
    ship.setAccelerationY(-accel);
  } else if (cursors.down.isDown) {
    ship.setAccelerationY(accel);
  } else {
    ship.setAccelerationY(0);
  }

  const vx = ship.body.velocity.x;
  ship.setAngle(Phaser.Math.Clamp(vx / 6, -15, 15));

  const baseSpeed = this.sceneSpeed * dt;
  this.bgFar.tilePositionX  += baseSpeed * 0.25;
  this.bgMid.tilePositionX  += baseSpeed * 0.55;
  this.bgNear.tilePositionX += baseSpeed * 1.00;

  if ((Phaser.Input.Keyboard.JustDown(shootKey) || (shootKey.isDown && time > lastShot + SHOT_COOLDOWN)) && time > lastShot + SHOT_COOLDOWN) {
    lastShot = time;
    const dir = getShootDirection();
    spawnBullet(this, ship.x, ship.y - 20, dir);
  }

  bullets.children.each(function(b) {
    if (!b.active) return;
    if (b.x < -50 || b.x > config.width + 50 || b.y < -50 || b.y > config.height + 50) {
      deactivateBullet(b);
    }
  }, this);

  const activeCount = bullets.countActive(true);
  this.bulletsText.setText('Balas ativas: ' + activeCount);
}

function getShootDirection() {
  let dx = 0, dy = 0;
  if (cursors.left.isDown) dx -= 1;
  if (cursors.right.isDown) dx += 1;
  if (cursors.up.isDown) dy -= 1;
  if (cursors.down.isDown) dy += 1;

  if (dx === 0 && dy === 0) {
    return { x: 0, y: -1 };
  }

  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

function spawnBullet(scene, x, y, dir) {
  const speed = 520;
  const b = bullets.get(x, y, 'bullet');

  if (!b) {
    return;
  }

  if (!b.body) {
    scene.physics.world.enable(b);
  }

  b.setActive(true);
  b.setVisible(true);
  b.body.enable = true;
  b.setPosition(x, y);
  b.setDepth(1);
  b.body.setAllowGravity(false);
  b.body.setVelocity(dir.x * speed, dir.y * speed);
  b.body.setCollideWorldBounds(false);
}

function deactivateBullet(b) {
  b.body.stop();
  b.body.enable = false;
  b.setActive(false);
  b.setVisible(false);
  b.setPosition(-100, -100);
}
