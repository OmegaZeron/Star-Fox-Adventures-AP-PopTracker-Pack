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

function generic(id: number, name: string, type: string, mapCode: string, img: string, codes: string[]) {
	return {
		id,
		name,
		type,
		mapCode,
		img: imgPath("items", img),
		codes: codes.join(", ")
	}
}
function progressive(id: number, name: string, mapCode: string, stageData: Stage[], loop: boolean = false, allow_disabled: boolean = true, inherit_codes: boolean = true) {
	let item = {
		id,
		name,
		mapCode,
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
			data.codes = `${mapCode}, ${data.codes}`
		}
		item.stages.push(data)
	}
	return item;
}
function consumable(id: number, name: string, mapCode: string, max_quantity: number, codes: string[]) {
	return {
		id,
		name,
		type: "consumable",
		mapCode,
		img: imgPath("items", codes[0]),
		max_quantity,
		codes: codes.join(", ")
	}
}

const itemData = [
	// staff
	generic(1, "Staff", "static", vars.Staff.Staff, vars.Staff.Staff, [vars.Staff.Staff]),
	generic(2, "Fire Blaster", "toggle", vars.Staff.FireBlaster, vars.Staff.FireBlaster, [vars.Staff.FireBlaster]),
	generic(3, "Rocket Boost", "toggle", vars.Staff.RocketBoost, vars.Staff.RocketBoost, [vars.Staff.RocketBoost]),
	generic(4, "Freeze Blast", "toggle", vars.Staff.FreezeBlast, vars.Staff.FreezeBlast, [vars.Staff.FreezeBlast]),
	progressive(5, "Ground Quake", vars.Staff.GroundQuake, [
		new Stage("Ground Quake", vars.Staff.GroundQuake, [vars.Staff.GroundQuake]),
		new Stage("Super Quake", vars.Staff.SuperQuake, [vars.Staff.SuperQuake]),
	]),
	generic(6, "SharpClaw Disguise", "toggle", vars.Staff.Disguise, vars.Staff.Disguise, [vars.Staff.Disguise]),
	// tricky
	progressive(10, "Tricky", vars.Tricky.Tricky, [
		new Stage("Tricky (Find, Stay)", vars.Tricky.Find, [vars.Tricky.Tricky, vars.Tricky.Find, vars.Tricky.Stay]),
		new Stage("Tricky (Find, Stay, Flame)", vars.Tricky.Flame, [vars.Tricky.Flame])
	]),
	// planet
	generic(50, "Dinosaur Planet Access", "toggle", vars.Planet.DinoPlanetAccess, vars.Planet.DinoPlanetAccess, [vars.Planet.DinoPlanetAccess]),
	generic(51, "DarkIce Mines Access", "toggle", vars.Planet.DarkIceAccess, vars.Planet.DarkIceAccess, [vars.Planet.DarkIceAccess]),
	generic(52, "CloudRunner Fortress Access", "toggle", vars.Planet.CloudRunnerAccess, vars.Planet.CloudRunnerAccess, [vars.Planet.CloudRunnerAccess]),
	// inventory
	progressive(100, "Scarab Bag", vars.Inventory.ScarabBag, [
		new Stage("Pockets", vars.Inventory.ScarabBag, [vars.Inventory.ScarabBag]),
		new Stage("Small Scarab Bag", vars.Inventory.SmallScarabBag, [vars.Inventory.SmallScarabBag]),
		new Stage("Medium Scarab Bag", vars.Inventory.MediumScarabBag, [vars.Inventory.MediumScarabBag]),
		new Stage("Large Scarab Bag", vars.Inventory.LargeScarabBag, [vars.Inventory.LargeScarabBag]),
	], false),
	generic(101, "Bomb Plant", "toggle", vars.Inventory.BombPlant, vars.Inventory.BombPlant, [vars.Inventory.BombPlant]),
	consumable(102, "Alpine Root (SnowHorn Wastes)", vars.Inventory.AlpineSHW, 2, [vars.Inventory.AlpineSHW]),
	consumable(103, "White GrubTub Fungus", vars.Inventory.WhiteGrubTub, 6, [vars.Inventory.WhiteGrubTub]),
	generic(104, "SharpClaw Prison Key", "toggle", vars.Inventory.GateKey, vars.Inventory.GateKey, [vars.Inventory.GateKey]),
	generic(105, "Entrance Bridge Cog", "toggle", vars.Inventory.EntranceCog, vars.Inventory.EntranceCog, [vars.Inventory.EntranceCog]),
	consumable(106, "Alpine Root (DarkIce Mines)", vars.Inventory.AlpineDIM, 2, [vars.Inventory.AlpineDIM]),
	consumable(107, "SharpClaw Fort Bridge Cogs", vars.Inventory.SharpClawCogs, 3, [vars.Inventory.SharpClawCogs]),
	generic(110, "Dinosaur Horn", "toggle", vars.Inventory.DinosaurHorn, vars.Inventory.DinosaurHorn, [vars.Inventory.DinosaurHorn]),
	// generic(111, "Silver Key", "toggle", vars.Inventory.SilverKey, [vars.Inventory.SilverKey]),
	// generic(112, "Gold Key", "toggle", vars.Inventory.GoldKey, [vars.Inventory.GoldKey]),
	generic(113, "Fire Spellstone 1", "toggle", vars.Inventory.FireSpellstone1, vars.Inventory.FireSpellstone1, [vars.Inventory.FireSpellstone1]),
	generic(114, "Moon Pass Key", "toggle", vars.Inventory.MoonPassKey, vars.Inventory.MoonPassKey, [vars.Inventory.MoonPassKey]),
	generic(115, "Moon Seed", "toggle", vars.Inventory.MoonSeed, vars.Inventory.MoonSeed, [vars.Inventory.MoonSeed]),
	generic(116, "Krazoa Spirit 2", "toggle", vars.Inventory.KrazoaSpirit2, vars.Inventory.KrazoaSpirit2, [vars.Inventory.KrazoaSpirit2]),
	consumable(117, "Gold Bar", vars.Inventory.GoldBar, 4, [vars.Inventory.GoldBar]),
	generic(118, "Power Key", "toggle", vars.Inventory.PowerKey, vars.Inventory.PowerKey, [vars.Inventory.PowerKey]),
	generic(119, "Red Crystal", "toggle", vars.Inventory.RedCrystal, vars.Inventory.RedCrystal, [vars.Inventory.RedCrystal]),
	generic(120, "Green Crystal", "toggle", vars.Inventory.GreenCrystal, vars.Inventory.GreenCrystal, [vars.Inventory.GreenCrystal]),
	generic(121, "Blue Crystal", "toggle", vars.Inventory.BlueCrystal, vars.Inventory.BlueCrystal, [vars.Inventory.BlueCrystal]),
	generic(122, "CloudRunner Flute", "toggle", vars.Inventory.CloudRunnerFlute, vars.Inventory.CloudRunnerFlute, [vars.Inventory.CloudRunnerFlute]),
	// shop
	generic(200, "Rock Candy", "toggle", vars.Inventory.RockCandy, vars.Inventory.RockCandy, [vars.Inventory.RockCandy]),
	// generic(201, "Hi-Tech Display Device", "toggle", vars.Inventory.HiTechDisplay, [vars.Inventory.HiTechDisplay]),
	generic(204, "FireFly Lantern", "toggle", vars.Inventory.FireFlyLantern, vars.Inventory.FireFlyLantern, [vars.Inventory.FireFlyLantern]),
	// generic(205, "SnowHorn Artifact", "toggle", vars.Inventory.SnowHornArtifact, [vars.Inventory.SnowHornArtifact]),
]
const settingData = [
	progressive(-1, "Store Setting", vars.Settings.ShopSetting, [
		new Stage("No Maps in Store", vars.Settings.ShopNoMaps, [vars.Settings.ShopEnabled], "settings"),
		new Stage("Store Enabled", vars.Settings.ShopEnabled, [vars.Settings.ShopEnabled, vars.Settings.ShopMaps], "settings"),
		new Stage("Store Disabled", vars.Settings.ShopDisabled, [vars.Settings.ShopDisabled], "settings"),
	], true, false, false),
	progressive(-1, "Plant Shuffle", vars.Settings.PlantShuffle, [
		new Stage("Plant Shuffle Enabled", vars.Settings.PlantShuffleOn, [vars.Settings.PlantShuffleOn], "settings"),
		new Stage("Plant Shuffle Disabled", vars.Settings.PlantShuffleOff, [vars.Settings.PlantShuffleOff], "settings"),
	], true, false, false)
]

export default function createItems() {
	itemData.sort((a, b) => a.id - b.id)
	let output = "ITEM_MAPPING = {\n"
	for (let item of itemData) {
		output += `\t[${item.id}] = {"${item.mapCode}", "${item.type}"},\n`
	}
	output += "}"
	writeToFile("items/items.jsonc", JSON.stringify(itemData, (k, v) => k == "id" || k == "mapCode" ? undefined : v, '\t'))
	writeToFile("scripts/autotracking/item_mapping.lua", output)
	writeToFile("items/pack_settings.jsonc", JSON.stringify(settingData, (k, v) => k == "id" || k == "mapCode" ? undefined : v, '\t'))
}

// @ts-ignore
if (import.meta.main) {
	createItems()
}