let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let defeatedMonsters = new Set();

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterLevelText = document.querySelector("#monsterLevel");
const monsterHealthText = document.querySelector("#monsterHealth");
const weaponText = document.querySelector("#weaponText");
const inventoryText = document.querySelector("#inventoryText");
const questTrain = document.querySelector("#questTrain");
const questGear = document.querySelector("#questGear");
const questDragon = document.querySelector("#questDragon");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "goblin scout",
    level: 5,
    health: 35
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "orc marauder",
    level: 12,
    health: 100
  },
  {
    name: "shadow wraith",
    level: 16,
    health: 180
  },
  {
    name: "dragon",
    level: 24,
    health: 340
  }
];
const DRAGON_INDEX = monsters.length - 1;
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Explore cave", "Climb mountain"],
    "button functions": [goStore, goCave, goMountain],
    text: "You are in the town square. Paths lead to the store, the cave, and the mountain pass."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight goblin scout", "Go to forest"],
    "button functions": [fightSlime, fightGoblin, goForest],
    text: "You enter the cave. Low-level monsters skitter between the rocks."
  },
  {
    name: "forest",
    "button text": ["Fight fanged beast", "Fight orc marauder", "Go to town square"],
    "button functions": [fightBeast, fightOrc, goTown],
    text: "You push into the forest. Stronger enemies patrol the old road."
  },
  {
    name: "mountain",
    "button text": ["Fight shadow wraith", "Fight dragon", "Go to town square"],
    "button functions": [fightWraith, fightDragon, goTown],
    text: "You climb the mountain pass. The air crackles with dangerous magic."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg ],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

function refreshPlayerPanel() {
  weaponText.innerText = weapons[currentWeapon].name;
  inventoryText.innerText = inventory.join(", ");
}

function refreshQuestLog() {
  const clearedCaveAndForest = [0, 1, 2, 3].every((monsterIndex) => defeatedMonsters.has(monsterIndex));

  questTrain.classList.toggle("complete", defeatedMonsters.has(0));
  questGear.classList.toggle("complete", clearedCaveAndForest);
  questDragon.classList.toggle("complete", defeatedMonsters.has(DRAGON_INDEX));
}

function syncHud() {
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  refreshPlayerPanel();
  refreshQuestLog();
}

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = goMountain;
syncHud();

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
  refreshQuestLog();
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function goForest() {
  update(locations[3]);
}

function goMountain() {
  update(locations[4]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    syncHud();
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory.join(", ") + ".";
      syncHud();
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    let soldWeapon = inventory.shift();
    currentWeapon = Math.max(0, currentWeapon - 1);
    text.innerText = "You sold a " + soldWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory.join(", ") + ".";
    syncHud();
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightGoblin() {
  fighting = 1;
  goFight();
}

function fightBeast() {
  fighting = 2;
  goFight();
}

function fightOrc() {
  fighting = 3;
  goFight();
}

function fightWraith() {
  fighting = 4;
  goFight();
}

function fightDragon() {
  fighting = DRAGON_INDEX;
  goFight();
}

function goFight() {
  update(locations[5]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterLevelText.innerText = monsters[fighting].level;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The level " + monsters[fighting].level + " " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  syncHud();
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === DRAGON_INDEX ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
    syncHud();
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  defeatedMonsters.add(fighting);
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  syncHud();
  update(locations[6]);
}

function lose() {
  update(locations[7]);
}

function winGame() {
  defeatedMonsters.add(DRAGON_INDEX);
  syncHud();
  update(locations[8]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  fighting = undefined;
  monsterHealth = undefined;
  inventory = ["stick"];
  defeatedMonsters = new Set();
  syncHud();
  goTown();
}

function easterEgg() {
  update(locations[9]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    syncHud();
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    syncHud();
    if (health <= 0) {
      lose();
    }
  }
}
document.addEventListener('keydown', function(event) {
  switch(event.key) {
    case '1':
      document.getElementById('button1').click();
      break;
    case '2':
      document.getElementById('button2').click();
      break;
    case '3':
      document.getElementById('button3').click();
      break;
    default:
      // Do nothing for other keys
      break;
  }
});
