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
export function readFromFile(file: string, callback: {(data: any): void}) {
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
		CloudRunnerAccess: "cloudRunnerAccess",
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
		HiTechDisplay: "hiTechDisplay",
		GoldBar: "goldBar",
		PowerKey: "powerKey",
		RedCrystal: "crystalRed",
		GreenCrystal: "crystalGreen",
		BlueCrystal: "crystalBlue",
		CloudRunnerFlute: "cloudRunnerFlute"
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
	},
	Maps: {
		TTH: "thorntail",
		Krazoa: "krazoa",
		Well: "ancient_well",
		SHW: "snowhorn",
		LFV: "lightfoot",
		MMP: "moon",
		DIM: "darkice",
		VFP: "volcano",
		CC: "capeclaw",
		CRF: "cloudrunner",
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
	HasIceBlast: "$HasIceBlast",
	CanTraverseDark: "^$CanTraverseDark"
})

// rule builder
class ItemMapData {
	item!: string;
	type!: string;
	stages?: string[];
}
export class RuleArgs {
	item_names?: string[];
	price?: number;
	count?: number;
	item_name?: string;
	item_counts?: Record<string, number>;
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
	let item = itemDict[args.item_name!]
	let itemName = item.item
	let itemCount = args.count!
	if (item.type == "progressive") {
		itemName = item.stages![args.count! - 1]
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
	return and(Object.entries(args.item_counts!).map(itemData => {
		if (!itemDict[itemData[0]]) {
			throw new Error(`HasAllCounts: item ${itemData[0]} not defined`)
		}
		let item = itemDict[itemData[0]]
		let itemName = item.item
		let itemCount = itemData[1]
		if (item.type == "progressive") {
			// find the correct name for the wanted stage
			itemName = item.stages![itemCount - 1]
			itemCount = 1
		}
		return has(itemName, itemCount)
	}))
}

let RulesArr: string[][] = []
function consumeRule(ruleData: Rule, evalOnly: boolean = false): string|null {
	if (ruleData.rule == "And") {
		// run multiple rules and combine their requirements into one string
		let output = []
		for (let rule of ruleData.children!) {
			
			let req = consumeRule(rule, evalOnly)
			// if eval only, return the new requirement(s)
			if (req) {
				output.push(req)
			}
		}
		if (evalOnly) {
			return output.join(", ")
		}
	}
	else if (ruleData.rule == "Or") {
		// run multiple rules and add their requirements to separate strings
		let sets: string[][][] = []
		let children = ruleData.children!
		// create deep copy of RulesArr for each child of "Or" rule
		for (let _ of children) {
			sets.push([])
			for (let rule of RulesArr) {
				sets[sets.length - 1].push([...rule])
			}
		}
		for (let i = 0; i < children.length; i++) {
			let req = consumeRule(children[i], true)!
			// apply each requirement to a unique set of rules
			for (let set of sets[i]) {
				set.push(req)
			}
		}
		// remove extra array and replace RulesArr
		RulesArr = sets.flat()
	}
	else {
		// individual rules
		let req = ruleDict[ruleData.rule](ruleData.args)
		if (evalOnly) {
			// return the requirement instead of directly applying to the rulles
			// used for "Or" rules to apply to only one rule array instead of all
			return req
		}
		for (let ruleset of RulesArr) {
			// add requirement to each rule array
			ruleset.push(req)
		}
	}
	return null
}
export function constructRules(loc: Rule | null, fallback?: string[], preferFallback?: boolean): string[] | undefined {
	if (!loc || preferFallback) {
		return fallback || undefined
	}
	if (loc.rule == "True_") {
		return undefined
	}

	RulesArr = [[]]
	// create rules
	consumeRule(loc)

	let output: string[] = []
	// remove any duplicate rules, and create final strings
	for (let rule of RulesArr) {
		output.push([...new Set(rule)].join(", "))
	}

	return output
}

export const ruleDict: Record<string, Function> = Object.freeze({
	// key is from exported rule builder data
	"Has": Has,
	"HasAll": HasAll,
	"HasAllCounts": HasAllCounts,
	"CanBuy": (args: RuleArgs) => luaFunc.CanBuy(args.price!),
	"CanExplodeBombPlant": () => luaFunc.CanExplodeBombPlant,
	"CanGrowMoonSeed": () => luaFunc.CanGrowMoonSeed
})
export const itemDict: Record<string, ItemMapData> = Object.freeze({
	// key is from exported rule builder data
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
	"Krazoa Spirit 2": {item: vars.Inventory.KrazoaSpirit2, type: "toggle"},
	"Gold Bars": {item: vars.Inventory.GoldBar, type: "consumable"}
})