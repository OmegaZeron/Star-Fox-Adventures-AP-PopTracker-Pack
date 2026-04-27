// @ts-ignore
import fs from 'fs'

export function imgPath(base: string, name: string) {
	return `images/${base}/${name}.png`
}

export function writeToFile(file: string, content: string) {
	fs.writeFile(file, content, (err: any) => {
		if (err) {
			console.error(`Error writing to file ${file}: ${err}`)
			return
		}
		console.log(`Successfully wrote to file ${file}`)
	})
}
export function readFromFile(file: string, callback: { (data: any): void; (arg0: null): void }) {
	fs.readFile(file, "utf8", (err: any, data: string) => {
		if (err) {
			console.error(err)
			callback(null)
			return
		}
		callback(JSON.parse(data))
	})
}

export function has(item: string, count: number = 1) {
	return `${item}${(count > 1 ? `:${count}` : '')}`
}

export function and(...args: (string | string[])[]) {
	return args.flat().join(", ")
}

export const vars = Object.freeze({
	Staff: {
		Staff: "staff",
		FireBlaster: "fireBlaster",
		RocketBoost: "rocketBoost",
		FreezeBlast: "freezeBlast",
		GroundQuake: "groundQuake",
		SuperQuake: "superQuake",
		Disguise: "disguise",
		// PortalOpener: "portalOpener"
	},
	Tricky: {
		Tricky: "tricky",
		Find: "find",
		Stay: "stay",
		Flame: "flame"
	},
	Planet: {
		DinoPlanetAccess: "dinoPlanetAccess",
		DarkIceAccess: "darkIceAccess",
		// CloudRunnerFortAccess: "cloudRunnerFortAccess",
		// WalledCityAccess: "walledCityAccess",
		// DragonRockAccess: "dragonRockAccess"
	},
	Inventory: {
		ScarabBag: "scarabPockets",
		SmallScarabBag: "scarabSmall",
		MediumScarabBag: "scarabMedium",
		LargeScarabBag: "scarabLarge",
		BombPlant: "bombPlant",
		AlpineSHW: "alpineSHW",
		AlpineDIM: "alpineDIM",
		WhiteGrubTub: "whiteGrubTub",
		GateKey: "gateKey",
		EntranceCog: "entranceCog",
		SharpClawCogs: "sharpClawCogs",
		DinosaurHorn: "dinosaurHorn",
		// SilverKey: "silverKey"
		FireSpellstone1: "fireSpellstone1",
		MoonPassKey: "moonPassKey",
		MoonSeed: "moonSeed",
		KrazoaSpirit2: "krazoa2",
		RockCandy: "rockCandy",
		FireFlyLantern: "fireFlyLantern",
		// SnowHornArtifact: "snowHornArtifact",
		HiTechDisplay: "hiTechDisplay"
	},
	Settings: {
		ShopSetting: "shopSetting",
		ShopEnabled: "shopEnabled",
		ShopMaps: "shopMaps",
		ShopNoMaps: "shopNoMaps",
		ShopDisabled: "shopDisabled",
		PlantShuffle: "plantShuffle",
		PlantShuffleOn: "plantShuffleOn",
		PlantShuffleOff: "plantShuffleOff"
	}
})
// currently equal to above, might consolidate if it stays in parity
export const varDefinitions = Object.freeze({
	Staff: vars.Staff,
	Tricky: vars.Tricky,
	Planet: vars.Planet,
	Inventory: vars.Inventory,
	Settings: vars.Settings
})

export const luaFunc = Object.freeze({
	CanBuy: (amt: number) => `^$CanBuy|${amt}`,
	CanExplodeBombPlant: `^$CanExplodeBombPlant`,
	CanGrowMoonSeed: `^$CanGrowMoonSeed`,
	HasBlaster: "$HasBlaster",
	HasBooster: "$HasBooster",
	HasGroundQuake: "$HasGroundQuake",
	HasIceBlast: "$HasIceBlast"
})

// rule builder
export class RuleArgs {
	item_names?: string[];
	price?: number;
	count?: number;
	item_name?: string;
	item_counts?: any;
}
export class Rule {
	args?: RuleArgs;
	children?: Rule[];
	rule!: string;
}
export class LocationRule {
	id!: number;
	name!: string;
	rules!: Rule
}

function Has(args: RuleArgs) {
	if (!itemDict[args.item_name!]) {
		throw new Error(`Has: item ${args.item_name} not defined`)
	}
	let itemName = itemDict[args.item_name!].item
	let itemCount = args.count!
	if (itemDict[args.item_name!].type == "progressive") {
		itemName = itemDict[args.item_name!].stages![args.count! - 1]
		itemCount = 1
	}
	return has(itemName, itemCount)
}
function HasAll(args: RuleArgs) {
	return and(...args.item_names!.map(name => {
		if (!itemDict[name]) {
			throw new Error(`HasAll: Item ${name} not defined`)
		}
		return itemDict[name].item
	}))
}
function HasAllCounts(args: RuleArgs) {
	return and(Object.entries(args.item_counts).map((itemData, _) => {
		if (!itemDict[itemData[0]]) {
			throw new Error(`HasAllCounts: item ${itemData[0]} not defined`)
		}
		let itemName = itemDict[itemData[0]].item
		let itemCount = itemData[1] as number
		if (itemDict[itemData[0]].type == "progressive") {
			itemName = itemDict[itemData[0]].stages![itemData[1] as number - 1]
			itemCount = 1
		}
		return has(itemName, itemCount)
	}))
}
function And(rules: Rule[]): any[] {
	let final = []
	for (let rule of rules) {
		final.push(...constructRules(rule)!)
	}
	return final.join(", ").split(", ")
}
function CanBuy(args: RuleArgs) {
	return luaFunc.CanBuy(args.price!)
}
function CanExplodeBombPlant() {
	return luaFunc.CanExplodeBombPlant
}
function CanGrowMoonSeed() {
	return luaFunc.CanGrowMoonSeed
}

export function constructRules(loc: Rule | null, fallback?: string[]): string[] | undefined {
	if (!loc) {
		return fallback || undefined
	}
	if (loc.rule == "True_") {
		return undefined
	}

	let arr = []
	if (loc.rule == "And") {
		arr.push(...And(loc.children!))
	}
	else {
		arr.push(...ruleDict[loc.rule](loc.args).split(", "))
	}
	return [[...new Set(arr)].join(", ")]
}

export const ruleDict = Object.freeze({
	"Has": Has,
	"HasAll": HasAll,
	"HasAllCounts": HasAllCounts,
	"CanBuy": CanBuy,
	"CanExplodeBombPlant": CanExplodeBombPlant,
	"CanGrowMoonSeed": CanGrowMoonSeed
} as Record<string, Function>)
export const itemDict = Object.freeze({
	"Staff": {item: vars.Staff.Staff, type: "toggle"},
	"Fire Blaster": {item: vars.Staff.FireBlaster, type: "toggle"},
	"Staff Booster": {item: vars.Staff.RocketBoost, type: "toggle"},
	"Ground Quake": {item: vars.Staff.GroundQuake, type: "progressive", stages: [vars.Staff.GroundQuake, vars.Staff.SuperQuake]},
	"Freeze Blast": {item: vars.Staff.FreezeBlast, type: "toggle"},
	"SharpClaw Disguise": {item: vars.Staff.Disguise, type: "toggle"},
	"Tricky (Progressive)": {item: vars.Tricky.Tricky, type: "progressive", stages: [vars.Tricky.Tricky, vars.Tricky.Flame]},
	"Bomb Plant": {item: vars.Inventory.BombPlant, type: "toggle"},
	"White GrubTub": {item: vars.Inventory.WhiteGrubTub, type: "consumable"},
	"Entrance Bridge Cog": {item: vars.Inventory.EntranceCog, type: "toggle"},
	"SHW Alpine Root": {item: vars.Inventory.AlpineSHW, type: "consumable"},
	"DIM Alpine Root": {item: vars.Inventory.AlpineDIM, type: "consumable"},
	"SharpClaw Fort Bridge Cogs": {item: vars.Inventory.SharpClawCogs, type: "consumable"},
	"Fire SpellStone 1": {item: vars.Inventory.FireSpellstone1, type: "toggle"},
	"Moon Seed": {item: vars.Inventory.MoonSeed, type: "toggle"},
	"Moon Pass Key": {item: vars.Inventory.MoonPassKey, type: "toggle"},
} as Record<string, {item: string, type: string, stages?: string[]}>)