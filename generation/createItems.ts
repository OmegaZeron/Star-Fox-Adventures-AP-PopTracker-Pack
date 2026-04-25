import { vars, imgPath, writeToFile } from './utils.ts';

class Stage {
	name: string;
	img: string;
	codes: string[];
	imgPath: string;

	constructor(name: string, img: string, codes: string[], imgPath: string = "items") {
		this.name = name;
		this.img = img;
		this.codes = codes;
		this.imgPath = imgPath;
	}
}

function generic(name: string, type: string, img: string, codes: string[]) {
	return {
		name,
		type,
		img: imgPath("items", img),
		codes: codes.join(", ")
	}
}
function progressive(name: string, stageData: Stage[], loop: boolean = false, allow_disabled: boolean = true, inherit_codes: boolean = true, baseCode?: string) {
	let item = {
		name,
		type: "progressive",
		allow_disabled: allow_disabled ? undefined : allow_disabled,
		loop: loop ? loop : undefined,
		stages: [] as any[]
	}
	for (let stage of stageData) {
		let data = {
			name: stage.name,
			img: imgPath(stage.imgPath, stage.img),
			codes: stage.codes.join(", "),
			inherit_codes: inherit_codes ? undefined : inherit_codes
		}
		if (!inherit_codes) {
			data.codes = `${baseCode}, ${data.codes}`
		}
		item.stages.push(data)
	}
	return item;
}
function consumable(name: string, max_quantity: number, codes: string[]) {
	return {
		name,
		type: "consumable",
		img: imgPath("items", codes[0]),
		max_quantity,
		codes: codes.join(", ")
	}
}

const itemData = [
	// staff
	generic("Staff", "static", vars.Staff.Staff, [vars.Staff.Staff]),
	generic("Fire Blaster", "toggle", vars.Staff.FireBlaster, [vars.Staff.FireBlaster]),
	generic("Rocket Boost", "toggle", vars.Staff.RocketBoost, [vars.Staff.RocketBoost]),
	generic("Freeze Blast", "toggle", vars.Staff.FreezeBlast, [vars.Staff.FreezeBlast]),
	progressive("Ground Quake", [
		new Stage("Ground Quake", vars.Staff.GroundQuake, [vars.Staff.GroundQuake]),
		new Stage("Super Quake", vars.Staff.SuperQuake, [vars.Staff.SuperQuake]),
	]),
	generic("SharpClaw Disguise", "toggle", vars.Staff.Disguise, [vars.Staff.Disguise]),
	// tricky
	progressive("Tricky", [
		new Stage("Tricky (Find, Stay)", vars.Tricky.Find, [vars.Tricky.Tricky, vars.Tricky.Find, vars.Tricky.Stay]),
		new Stage("Tricky (Find, Stay, Flame)", vars.Tricky.Flame, [vars.Tricky.Flame])
	]),
	// planet
	generic("Dinosaur Planet Access", "toggle", vars.Planet.DinoPlanetAccess, [vars.Planet.DinoPlanetAccess]),
	generic("DarkIce Mines Access", "toggle", vars.Planet.DarkIceAccess, [vars.Planet.DarkIceAccess]),
	// inventory
	progressive("Scarab Bag", [
		new Stage("Pockets", vars.Inventory.ScarabBag, [vars.Inventory.ScarabBag]),
		new Stage("Small Scarab Bag", vars.Inventory.SmallScarabBag, [vars.Inventory.SmallScarabBag]),
		new Stage("Medium Scarab Bag", vars.Inventory.MediumScarabBag, [vars.Inventory.MediumScarabBag]),
		new Stage("Large Scarab Bag", vars.Inventory.LargeScarabBag, [vars.Inventory.LargeScarabBag]),
	], false),
	generic("Bomb Plant", "static", vars.Inventory.BombPlant, [vars.Inventory.BombPlant]),
	consumable("Alpine Root (SnowHorn Wastes)", 2, [vars.Inventory.AlpineSHW]),
	consumable("Alpine Root (DarkIce Mines)", 2, [vars.Inventory.AlpineDIM]),
	consumable("White GrubTub Fungus", 6, [vars.Inventory.WhiteGrubTub]),
	generic("SharpClaw Prison Key", "toggle", vars.Inventory.GateKey, [vars.Inventory.GateKey]),
	generic("Entrance Bridge Cog", "toggle", vars.Inventory.EntranceCog, [vars.Inventory.EntranceCog]),
	consumable("SharpClaw Fort Bridge Cogs", 3, [vars.Inventory.SharpClawCogs]),
	generic("Dinosaur Horn", "toggle", vars.Inventory.DinosaurHorn, [vars.Inventory.DinosaurHorn]),
	// generic("Silver Key", "toggle", vars.Inventory.SilverKey, [vars.Inventory.SilverKey]),
	generic("Fire Spellstone 1", "toggle", vars.Inventory.FireSpellstone1, [vars.Inventory.FireSpellstone1]),
	generic("Moon Pass Key", "toggle", vars.Inventory.MoonPassKey, [vars.Inventory.MoonPassKey]),
	generic("Moon Seed", "toggle", vars.Inventory.MoonSeed, [vars.Inventory.MoonSeed]),
	// shop
	generic("Rock Candy", "toggle", vars.Shop.RockCandy, [vars.Shop.RockCandy]),
	generic("FireFly Lantern", "toggle", vars.Shop.FireFlyLantern, [vars.Shop.FireFlyLantern]),
	// generic("SnowHorn Artifact", "toggle", vars.Shop.SnowHornArtifact, [vars.Shop.SnowHornArtifact]),
]
const settingData = [
	progressive("Store Setting", [
		new Stage("No Maps in Store", vars.Settings.ShopNoMaps, [vars.Settings.ShopEnabled], "settings"),
		new Stage("Store Enabled", vars.Settings.ShopEnabled, [vars.Settings.ShopEnabled, vars.Settings.ShopMaps], "settings"),
		new Stage("Store Disabled", vars.Settings.ShopDisabled, [vars.Settings.ShopDisabled], "settings"),
	], true, false, false, vars.Settings.ShopSetting),
	progressive("Plant Shuffle", [
		new Stage("Plant Shuffle Enabled", vars.Settings.PlantShuffleOn, [vars.Settings.PlantShuffleOn], "settings"),
		new Stage("Plant Shuffle Disabled", vars.Settings.PlantShuffleOff, [vars.Settings.PlantShuffleOff], "settings"),
	], true, false, false, vars.Settings.PlantShuffle)
]

export default function createItems() {
	writeToFile("items/items.jsonc", JSON.stringify(itemData, null, "\t"))
	writeToFile("items/pack_settings.jsonc", JSON.stringify(settingData, null, "\t"))
}

// @ts-ignore
if (import.meta.main) {
	createItems()
}