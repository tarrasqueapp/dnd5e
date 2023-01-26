// Placeholder interface definitions
export type CreatureSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan';
export type DndStat = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

// TODO: I'd think this is a built-in type to the SDK but maybe not!
// Targeting something seems like it should be system independent
// so this is included for completeness at the moment
export type TarrasqueTargetingRange = 'MELEE' | 'RANGED' | 'AOE_CIRCLE' | 'AOE_CONE' | 'AOE_RECTANGLE' | 'AOE_LINE';
export interface TarrasqueTargetingData {
  id: string;
  type: TarrasqueTargetingRange;
  targets?: number;
  range?: number;
  rangeFar?: number;
  radius?: number;
  width?: number;
  height?: number;
}

// subcomponents have an id attached, not sure if this is necessary but including it for now!
export interface Dnd5eHp {
  id: string;
  current: number;
  maximum: number;
  temporary: number;
  temporaryMaximum?: number;
  formula: string;
}

export interface Dnd5eDamage {
  id: string;
  formula: string;
  type: string;
}

export interface Dnd5eArmorClass {
  id: string;
  value: number;
  description: string;
  adjustment: number;
}

export interface Dnd5eStat {
  id: string;
  stat: DndStat;
  // name and short name aren't needed for a plugin, the plugin knows we only have 6 stats
  score: number;
  modifier: number;
  save: number;
  scoreAdjustment: number;
  modifierAdjustment: number;
}

export interface Dnd5eSkill {
  id: string;
  name: string; // could enumerate the skills
  shortName: string;
  advantage: boolean;
  // used to indicate proficiency levels (half, full, expertise)
  profMultiplier: number;
  adjustment: number;
}

export interface Dnd5eMovement {
  id: string;
  name: string; // there's a standard set of movement but hey people like to get weird with it
  speed: number;
}

export interface Dnd5eSenses {
  id: string;
  // these are actually fixed, could see an argument for letting people add their own
  darkvision: number;
  blindsight: number;
  tremorsense: number;
  truesight: number;
}

// might want a type string attached to all of these?
export interface Dnd5eBaseAction {
  id: string;
  name: string;
  description: string;
  damage: Dnd5eDamage;
  attackModifier?: string;
  saveDc?: string;
  targeting: TarrasqueTargetingData;
}

export type Dnd5eAction = Dnd5eBaseAction & {
  ready: boolean;
  recharge?: string;
  useCount: number;
  useLimit: number;
  bonusAction: boolean;
};

export type Dnd5eTrait = Dnd5eBaseAction & {
  useCount: number;
  useLimit: number;
}

export type Dnd5eLegendaryAction = Dnd5eBaseAction & {
  mythic: boolean
  actionCost: number
}

export interface Dnd5eSpell {
  id: string
  name: string
  description: string
  level: number
  classes: string[]
  damage: Dnd5eDamage
  targeting: TarrasqueTargetingData
}

export interface Dnd5eSlotSpellcasting {
  id: string
  spellsKnown: Dnd5eSpell[] // maybe change to spell id array to avoid data dup
  // these should both be an array of length 9
  slots: number[]
  slotsUsed: number[]
}

export interface Dnd5eInnateSpellList {
  id: string
  spells: Dnd5eSpell[]
  count: number
  used: number
  rate: string
}

export interface Dnd5eNpc {
  id: string;
  hp: Dnd5eHp;
  ac: Dnd5eArmorClass;
  size: CreatureSize;
  alignment: string;
  challenge: string;
  proficiency: number;
  stats: Dnd5eStat[]; // this could arguably be an object with the stat keys since you have to have the stats
  skills: Dnd5eSkill[];
  movement: Dnd5eMovement[];
  senses: Dnd5eSenses;
  actions: Dnd5eAction[];
  traits: Dnd5eTrait[];
  legendaryActionCount: number;
  legendaryActionsUsed: number;
  legendaryActions: Dnd5eLegendaryAction[];
  mythicActions: Dnd5eLegendaryAction[];
  reactions: Dnd5eBaseAction[];
  lairActions: Dnd5eAction[];
  // spellcasting zone
  spellAbilityMod: string
  spellAttackMod: string
  spellDc: string
  spellSlots?: Dnd5eSlotSpellcasting
  spellInnate?: Dnd5eInnateSpellList[]
  reactionUsed: boolean
}
