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
		LightGems: "lightGems",
		RedCrystal: "crystalRed",
		GreenCrystal: "crystalGreen",
		BlueCrystal: "crystalBlue",
		CloudRunnerFlute: "cloudRunnerFlute",
	},
	Settings: {
		ShopSetting: "shopSetting",
		ShopEnabled: "shopEnabled",
		ShopMaps: "shopMaps",
		ShopNoMaps: "shopNoMaps",
		ShopDisabled: "shopDisabled",
		PlantShuffle: "plantShuffle",
		PlantShuffleOn: "plantShuffleOn",
		PlantShuffleOff: "plantShuffleOff",
		DarkRoomLogic: "darkRoomLogic",
		LightFootEntrance: "lightFootEntrance",
		LightFootQuests: "lightFootQuests",
		InfiniteConsumables: "infiniteConsumables",
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
