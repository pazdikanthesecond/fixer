import { CharacterGenerator } from "../../character/character-generator";
import { WorldGenerator } from "./world-generator";
import { EventGenerator } from "../../event/event-generator";

export class Generator {
  rng: () => number;

  character: CharacterGenerator;
  world: WorldGenerator;
  event: EventGenerator;

  constructor(rng: () => number) {
    this.rng = rng;
    this.character = new CharacterGenerator(rng);
    this.world = new WorldGenerator(rng);
    this.event = new EventGenerator(rng);
  }
}
