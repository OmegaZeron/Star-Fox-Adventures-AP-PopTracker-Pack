import { vars, writeToFile } from "./utils.ts"

export default function createItemGrids() {
	let grids = {
		items: {
			type: "itemgrid",
			h_alignment: "left",
			item_size: "48, 36",
			item_margin: 2,
			rows: [
				[vars.Staff.FireBlaster, vars.Tricky.Find,	vars.Inventory.GateKey],
				[vars.Staff.RocketBoost, vars.Inventory.BombPlant, vars.Inventory.EntranceCog],
				[vars.Staff.GroundQuake, vars.Inventory.AlpineSHW, vars.Inventory.SharpClawCogs],
				[vars.Staff.FreezeBlast, vars.Shop.FireFlyLantern, vars.Inventory.DinosaurHorn],
				[vars.Staff.Disguise, vars.Inventory.WhiteGrubTub, vars.Inventory.MoonPassKey],
				["?portal", vars.Shop.RockCandy, ""],
				[vars.Inventory.ScarabBag, vars.Inventory.AlpineDIM, ""]
			]
		},
		planets: {
			type: "itemgrid",
			h_alignment: "left",
			item_size: "48, 36",
			item_margin: 2,
			rows: [
				[vars.Planet.DinoPlanetAccess, vars.Planet.DarkIceAccess]
			]
		},
		item_grid: {
			type: "dock",
			dock: "left",
			content: [
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