import { vars, writeToFile } from "./utils.ts"

export default function createItemGrids() {
	let grids = {
		staff: {
			type: "itemgrid",
			h_alignment: "left",
			item_size: "48, 36",
			item_margin: 2,
			rows: [
				[vars.Staff.FireBlaster, vars.Staff.RocketBoost, vars.Staff.GroundQuake],
				[vars.Staff.FreezeBlast, vars.Staff.Disguise, "?portal"]
			]
		},
		items: {
			type: "itemgrid",
			h_alignment: "left",
			item_size: "48, 36",
			item_margin: 2,
			rows: [
				[vars.Tricky.Tricky, vars.Inventory.BombPlant, vars.Inventory.MoonSeed],
				[vars.Inventory.FireFlyLantern, vars.Inventory.DinosaurHorn, vars.Inventory.CloudRunnerFlute],
				[vars.Inventory.ScarabBag],

				[vars.Inventory.RockCandy, vars.Inventory.AlpineSHW, vars.Inventory.AlpineDIM],
				[vars.Inventory.WhiteGrubTub, vars.Inventory.EntranceCog, vars.Inventory.SharpClawCogs],

				[vars.Inventory.GateKey, vars.Inventory.MoonPassKey, vars.Inventory.PowerKey],
				[vars.Inventory.RedCrystal, vars.Inventory.GreenCrystal, vars.Inventory.BlueCrystal]
			]
		},
		planets: {
			type: "itemgrid",
			h_alignment: "left",
			item_size: "48, 36",
			item_margin: 2,
			rows: [
				[vars.Planet.DinoPlanetAccess, vars.Planet.DarkIceAccess, vars.Planet.CloudRunnerAccess]
			]
		},
		item_grid: {
			type: "dock",
			dock: "left",
			content: [
				{
					type: "group",
					dock: "top",
					header: "Staff Upgrades",
					content: {
						type: "layout",
						key: "staff"
					}
				},
				{
					type: "group",
					dock: "top",
					header: "Items",
					content: {
						type: "layout",
						key: "items"
					}
				},
				{
					type: "group",
					header: "Planet Access",
					content: {
						type: "layout",
						key: "planets"
					}
				}
			]
		},
		settings: {
			type: "itemgrid",
			rows: [
				[vars.Settings.ShopSetting, vars.Settings.PlantShuffle]
			]
		}	
	}

	writeToFile("layouts/item_grids.jsonc", JSON.stringify(grids, null, "\t").replace(/\n?^(?:\t+)?("\??(?:\w+)?",?)$\n?/gm, "$1").replace(/"\t+\]/g, `"]`).replace(/","/g, `", "`))
}

// @ts-ignore
if (import.meta.main) {
	createItemGrids()
}