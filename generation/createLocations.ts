import { vars, luaFunc, writeToFile, readFromFile, has, and, constructRules, LocationRule, Rule } from "./utils.ts"

class Parent {
	name!: string;
	access_rules!: string[];
	visibility_rules?: string[];
	children!: Location[];
}
class Location {
	name!: string;
	access_rules?: string[];
	visibility_rules?: string[];
	sections!: Section[];
	map_locations?: MapLocations[];
}
class Section {
	id?: number;
	name?: string;
	access_rules?: string[];
	visibility_rules?: string[];
	ref?: string;

	fallback?: string[];
	preferFallback?: boolean
}
class MapLocations {
	map!: string;
	x!: number;
	y!: number;
	restrict_visibility_rules?: string[]
}

let locMapping: Parent[]

function createLocMapping() {
	let sections: {id: number, path: string}[] = []
	for (let parent of locMapping) {
		for (let location of parent.children) {
			for (let section of location.sections) {
				if (section.id) {
					sections.push({id: section.id, path: `\t[${section.id}] = {"@${parent.name}/${location.name}/${(section.name ? section.name : "")}"},\n`})
				}
			}
		}
	}

	sections.sort((a, b) => a.id - b.id)
	
	let output = "LOCATION_MAPPING = {\n"
	for (let section of sections) {
		output += section.path
	}
	output += "}"

	writeToFile("scripts/autotracking/location_mapping.lua", output)
}
function addLocs(parents: Parent[], rules: LocationRule[], path: string) {
	if (!parents) {
		console.warn("addLocs: data is null")
		return
	}
	if (parents.length <= 0) {
		console.warn("addLocs: data is empty")
		return
	}

	for (let parent of parents) {
		for (let child of parent.children) {
			for (let section of child.sections) {
				if (!section.id) {
					continue
				}
				
				section.access_rules = constructRules(ruleDataFromID(rules, section.id), section.fallback, section.preferFallback)
			}
		}
	}

	outputFile(path, parents)

	locMapping.push(...parents)
}

export default function createLocations() {
	locMapping = []
	readFromFile("generation/locations-output.json", (rules: LocationRule[]) => {
		// console.log(JSON.stringify(data, null, '\t'))
		addLocs(tth(), rules, "thorntail_hollow.jsonc")
		addLocs(kp(), rules, "krazoa_palace.jsonc")
		addLocs(shw(), rules, "snowhorn_wastes.jsonc")
		addLocs(dim(), rules, "darkice_mines.jsonc")
		addLocs(mmp(), rules, "moon_mountain_pass.jsonc")
		addLocs(lfv(), rules, "lightfoot_village.jsonc")
		addLocs(cc(), rules, "cape_claw.jsonc")
		addLocs(crf(), rules, "cloudrunner_fortress.jsonc")

		createLocMapping()
	})
}

function ruleDataFromID(data: LocationRule[], id: number): Rule | null {
	if (!data) {
		return null
	}
	let loc = data.find((loc: any) => loc.id === id)
	if (!loc) {
		console.warn(`getLocFromID: Location ID ${id} does not exist`)
		return null
	}
	return loc.rules
}

function replacer(key: string, value: any) {
	return ["id", "fallback", "preferFallback"].includes(key) ? undefined : value
}
function outputFile(path: string, locs: Parent[]) {
	let output = JSON.stringify(locs, replacer, '\t')
	output = output.replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")

	writeToFile(`locations/${path}`, output)
}

function tth() {
	let locs: Parent[] = [
		{
			name: "ThornTail Hollow",
			access_rules: [vars.Planet.DinoPlanetAccess],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Fire Blaster Upgrade",
					sections: [{id: 1}],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 229,
							y: 173
						}
					]
				},
				{
					name: "ThornTail Store",
					visibility_rules: [vars.Settings.ShopEnabled],
					sections: [
						{
							id: 200,
							name: "Rock Candy",
							fallback: [luaFunc.CanBuy(10)]
						},
						{
							id: 201,
							name: "Hi-Tech Display Device",
							fallback: [luaFunc.CanBuy(20)]
						},
						{
							id: 202,
							name: "Tricky Ball",
							fallback: [luaFunc.CanBuy(15)]
						},
						{
							id: 203,
							name: "BafomDad Holder",
							fallback: [luaFunc.CanBuy(20)]
						},
						{
							id: 204,
							name: "FireFly Lantern",
							fallback: [luaFunc.CanBuy(20)]
						},
						{
							id: 205,
							name: "SnowHorn Artifact",
							fallback: [luaFunc.CanBuy(130)]
						},
						{
							id: 210,
							name: "Map Cape Claw",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(5)]
						},
						{
							id: 211,
							name: "Map Ocean Force Point",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(10)]
						},
						{
							id: 212,
							name: "Map Krazoa Palace",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(5)]
						},
						{
							id: 213,
							name: "Map Dragon Rock",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(5)]
						},
						{
							id: 214,
							name: "Map ThornTail Hollow",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(5)]
						},
						{
							id: 215,
							name: "Map Moon Pass",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(5)]
						},
						{
							id: 216,
							name: "Map LightFoot Village",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(5)]
						},
						{
							id: 217,
							name: "Map DarkIce Mines",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(5)]
						},
						{
							id: 218,
							name: "Map CloudRunner Fortress",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(5)]
						},
						{
							id: 219,
							name: "Map Walled City",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(5)]
						},
						{
							id: 220,
							name: "Map SnowHorn Wastes",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(5)]
						},
						{
							id: 221,
							name: "Map Volcano Force Point",
							visibility_rules: [vars.Settings.ShopMaps],
							fallback: [luaFunc.CanBuy(10)]
						}
					],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 159,
							y: 274
						}
					]
				},
				{
					name: "Queen Cave Fuel Cell",
					sections: [{id: 100}],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 280,
							y: 401
						}
					]
				},
				{
					name: "Pillar Fuel Cells",
					sections: [
						{id: 101, name: "Left"},
						{id: 102, name: "Right"}
					],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 168,
							y: 369
						}
					]
				},
				{
					name: "Beside WarpStone Fuel Cells",
					sections: [
						{id: 103, name: "Left", fallback: [luaFunc.CanExplodeBombPlant]},
						{id: 104, name: "Right", fallback: [luaFunc.CanExplodeBombPlant]}
					],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 144,
							y: 256
						}
					]
				},
				{
					name: "Waterfall Cave Fuel Cells",
					sections: [
						{id: 105, name: "Center", fallback: [luaFunc.CanExplodeBombPlant]},
						{id: 106, name: "Left", fallback: [luaFunc.CanExplodeBombPlant]},
						{id: 107, name: "Right", fallback: [luaFunc.CanExplodeBombPlant]},
						{id: 108, name: "Back", fallback: [luaFunc.CanExplodeBombPlant]}
					],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 114,
							y: 276
						}
					]
				},
				{
					name: "South Cave Fuel Cells",
					sections: [
						{id: 109, name: "Center", fallback: [luaFunc.CanExplodeBombPlant]},
						{id: 110, name: "Right", fallback: [luaFunc.CanExplodeBombPlant]},
						{id: 111, name: "Left", fallback: [luaFunc.CanExplodeBombPlant]}
					],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 172,
							y: 399
						}
					]
				},
				{
					name: "Above Store Fuel Cells",
					sections: [
						{id: 112, name: "Left", fallback: [luaFunc.HasBooster]},
						{id: 113, name: "Right", fallback: [luaFunc.HasBooster]}
					],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 183,
							y: 229
						}
					]
				},
				{
					name: "Magic Upgrade above Store",
					sections: [{id: 30, fallback: [and(vars.Staff.FireBlaster, luaFunc.HasBooster)]}],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 157,
							y: 235
						}
					]
				},
				{
					name: "Feed Queen White GrubTubs",
					access_rules: ["@ThornTail Hollow/Queen Cave Fuel Cell/"],
					sections: [{id: 31, fallback: [has(vars.Inventory.WhiteGrubTub, 6)]}],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 279,
							y: 340
						}
					]
				},
				{
					name: "Dig BafomDad near Store",
					sections: [{id: 304, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 176,
							y: 296
						}
					]
				},
				{
					name: "Dig BafomDad near Queen Cave",
					sections: [{id: 305, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 237,
							y: 364
						}
					]
				},
				{
					name: "LightFoot Village Entrance",
					access_rules: [and("@ThornTail Hollow/Reach Area/", vars.Staff.Staff)],
					sections: [{}]
				},
				{
					name: "Entrance to LightFoot Village Fuel Cells",
					sections: [
						{id: 124, name: "Right", fallback: [vars.Staff.Staff]},
						{id: 125, name: "Left", fallback: [vars.Staff.Staff]}
					],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 37,
							y: 388
						}
					]
				},
				{
					name: "Dig BafomDad in Entrance to LightFoot Village",
					access_rules: ["@ThornTail Hollow/LightFoot Village Entrance/"],
					sections: [{id: 306, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 22,
							y: 379
						}
					]
				},
				// {
				// 	name: "Light the Torches",
				// 	access_rules: [vars.Tricky.Flame],
				// 	sections: [{}], // fire weed? spellstone?
				// 	map_locations: [
				// 		{
				// 			map: vars.Maps.TTH,
				// 			x: 151,
				// 			y: 355
				// 		},
				// 		{
				// 			map: vars.Maps.TTH,
				// 			x: 237,
				// 			y: 292,
				// 			shape: "diamond"
				// 		},
				// 		{
				// 			map: vars.Maps.TTH,
				// 			x: 132,
				// 			y: 219,
				// 			shape: "diamond"
				// 		},
				// 		{
				// 			map: vars.Maps.TTH,
				// 			x: 17,
				// 			y: 392,
				// 			shape: "diamond"
				// 		}
				// 	]
				// },
				{
					name: "Ancient Well",
					sections: [
						{
							name: "Staff Booster Upgrade",
							ref: "Ancient Well/Staff Booster Upgrade/"
						},
						{
							name: "Fuel Cell Left",
							ref: "Ancient Well/Fuel Cells/Left"
						},
						{
							name: "Fuel Cell Right",
							ref: "Ancient Well/Fuel Cells/Right"
						},
						{
							name: "White GrubTub 1",
							ref: "Dark Ancient Well/White GrubTub 1/"
						},
						{
							name: "White GrubTub 2",
							ref: "Dark Ancient Well/White GrubTub 2/"
						},
						{
							name: "White GrubTub 3",
							ref: "Dark Ancient Well/White GrubTub 3/"
						},
						{
							name: "White GrubTub 4",
							ref: "Dark Ancient Well/White GrubTub 4/"
						},
						{
							name: "White GrubTub 5",
							ref: "Dark Ancient Well/White GrubTubs/5"
						},
						{
							name: "White GrubTub 6",
							ref: "Dark Ancient Well/White GrubTubs/6"
						}
					],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 221,
							y: 233
						}
					]
				}
			]
		},
		{
			name: "Ancient Well",
			access_rules: [and("@ThornTail Hollow/Reach Area/", vars.Tricky.Find)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Staff Booster Upgrade",
					sections: [{id: 2, fallback: [luaFunc.CanExplodeBombPlant]}],
					map_locations: [
						{
							map: vars.Maps.Well,
							x: 105,
							y: 113
						}
					]
				},
				{
					name: "Fuel Cells",
					sections: [
						{id: 128, name: "Left", fallback: [luaFunc.HasBooster]},
						{id: 129, name: "Right", fallback: [luaFunc.HasBooster]}
					],
					map_locations: [
						{
							map: vars.Maps.Well,
							x: 9,
							y: 141
						}
					]
				}
			]
		},
		{
			name: "Dark Ancient Well",
			access_rules: [and("@Ancient Well/Reach Area/", luaFunc.HasBooster, vars.Inventory.FireFlyLantern, luaFunc.CanExplodeBombPlant)],
			children: [
				{
					name: "White GrubTub 1",
					sections: [{id: 24}],
					map_locations: [
						{
							map: vars.Maps.Well,
							x: 19,
							y: 33
						}
					]
				},
				{
					name: "White GrubTub 2",
					sections: [{id: 25}],
					map_locations: [
						{
							map: vars.Maps.Well,
							x: 116,
							y: 11
						}
					]
				},
				{
					name: "White GrubTub 3",
					sections: [{id: 26, fallback: [luaFunc.CanExplodeBombPlant]}],
					map_locations: [
						{
							map: vars.Maps.Well,
							x: 12,
							y: 114
						}
					]
				},
				{
					name: "White GrubTub 4",
					sections: [{id: 27, fallback: [luaFunc.HasBooster]}],
					map_locations: [
						{
							map: vars.Maps.Well,
							x: 73,
							y: 36
						}
					]
				},
				{
					name: "White GrubTubs",
					sections: [
						{id: 28, name: "5", fallback: [and(vars.Staff.FireBlaster, luaFunc.HasBooster)]},
						{id: 29, name: "6", fallback: [and(vars.Staff.FireBlaster, luaFunc.HasBooster)]}
					],
					map_locations: [
						{
							map: vars.Maps.Well,
							x: 135,
							y: 122
						}
					]
				}
			]
		}
	]

	return locs
}

function kp() {
	let locs: Parent[] = [
		{
			name: "Krazoa Palace Entrance",
			access_rules: [and("@ThornTail Hollow/Reach Area/", vars.Inventory.RockCandy, vars.Inventory.KrazoaSpirit2)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Dark Room BafomDad",
					sections: [{id: 319, fallback: [luaFunc.CanTraverseDark], preferFallback: true}] // ool rules
				}
			]
		},
		{
			name: "Krazoa Palace Main",
			access_rules: [and("@Krazoa Palace Entrance/Reach Area/", vars.Staff.FireBlaster, luaFunc.CanTraverseDark)],
			children: [
				{
					name: "Release Spirit 2",
					sections: [{id: 43, fallback: [vars.Inventory.KrazoaSpirit2]}]
				}
			]
		},
	]

	return locs
}

function shw() {
	let locs: Parent[] = [
		{
			name: "Ice Mountain",
			access_rules: [and("@ThornTail Hollow/Reach Area/", vars.Inventory.RockCandy)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Ice Mountain",
					sections: [
						{id: 114, name: "Cheat Well Fuel Cell"},
						{id: 115, name: "Race Cave Fuel Cell Front"},
						{id: 116, name: "Race Cave Fuel Cell Back"}
					],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 4,
							y: 100
						}
					]
				}
			]
		},
		{
			name: "SnowHorn Wastes Water Spout",
			access_rules: [and("@Ice Mountain/Reach Area/", vars.Tricky.Tricky)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Magic Upgrade",
					sections: [{id: 20, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 233,
							y: 144
						}
					]
				},
				{
					name: "Feed Alpine Root",
					sections: [
						{id: 21, name: "1", fallback: [has(vars.Inventory.AlpineSHW)]},
						{id: 22, name: "2", fallback: [has(vars.Inventory.AlpineSHW, 2)]}
					],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 260,
							y: 149
						}
					]
				},
				{
					name: "Ice Block Fuel Cells", // requires alpine_root_shw:2 when SW isn't open
					sections: [
						{id: 117, name: "Left"},
						{id: 118, name: "Right"}
					],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 223,
							y: 138
						}
					]
				},
				{
					name: "Dig Alpine Root near Campfire",
					sections: [{id: 300, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 218,
							y: 188
						}
					]
				},
				{
					name: "Dig Alpine Root near Fallen Tree",
					sections: [{id: 301, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 201,
							y: 154
						}
					]
				},
				{
					name: "Dig Egg near Water Spout",
					sections: [{id: 302, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 238,
							y: 187
						}
					]
				}
			]
		},
		{
			name: "SnowHorn Wastes Entrance",
			access_rules: ["@SnowHorn Wastes Water Spout/Reach Area/"], // requires alpine_root_shw:2 when SW isn't open
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Water Platform Fuel Cells",
					sections: [
						{id: 119, name: "Left", fallback: [vars.Staff.Staff]},
						{id: 120, name: "Right (Also Dig Cave Right)", fallback: [vars.Staff.Staff]}
					],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 299,
							y: 124
						}
					]
				},
				{
					name: "Dig Cave near Entrance",
					sections: [
						{id: 121, name: "Fuel Cell Left", fallback: [vars.Tricky.Find]},
						{
							name: "Fuel Cell Right (Also Water Platform Right)",
							ref: "SnowHorn Wastes Entrance/Water Platform Fuel Cells/Right (Also Dig Cave Right)" // vanilla links these on accident
						},
						{id: 310, name: "BafomDad", fallback: [vars.Tricky.Find]}
					],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 349,
							y: 136
						}
					]
				},
				{
					name: "Path to TTH Booster Fuel Cells",
					sections: [
						{id: 122, name: "Left", fallback: [and(vars.Staff.FireBlaster, luaFunc.HasBooster)]},
						{id: 123, name: "Right", fallback: [and(vars.Staff.FireBlaster, luaFunc.HasBooster)]}
					],
					map_locations: [
						{
							map: vars.Maps.TTH,
							x: 224,
							y: 72
						}
					]
				},
				{
					name: "Dig BafomDad near Entrance",
					sections: [{id: 303, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 326,
							y: 184
						}
					]
				}
			]
		},
		{
			name: "SnowHorn Wastes Behind Gate",
			access_rules: [and("@SnowHorn Wastes Entrance/Reach Area/", `[${vars.Inventory.GateKey}]`)], // shield hover
			children: [
				{
					name: "Rescue GateKeeper",
					sections: [{id: 23}],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 376,
							y: 139
						}
					]
				},
				{
					name: "Blast Tree past Gate",
					sections: [
						{id: 133, name: "Fuel Cell Left", fallback: [luaFunc.HasBlaster]},
						{id: 134, name: "Fuel Cell Right", fallback: [luaFunc.HasBlaster]},
						{id: 311, name: "BafomDad", fallback: [luaFunc.HasBlaster]}
					],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 364,
							y: 72
						}
					]
				},
				{
					name: "River past Gate Cheat Well Fuel Cell",
					sections: [{id: 135}],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 455,
							y: 145
						}
					]
				},
				{
					name: "River Ledge past Gate Fuel Cells",
					sections: [
						{id: 136, name: "Center"},
						{id: 137, name: "Right (Use Blaster in Nearby Cave)", fallback: [luaFunc.HasBlaster]},
						{id: 138, name: "Left (Use Blaster in Nearby Cave)", fallback: [luaFunc.HasBlaster]}
					],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 426,
							y: 90
						}
					]
				},
				{
					name: "Dig in Cave past Gate",
					sections: [{id: 307, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.SHW,
							x: 410,
							y: 53
						}
					]
				}
			]
		}
	]

	return locs
}

function dim() {
	let locs: Parent[] = [
		{
			name: "DarkIce Mines Entrance",
			access_rules: [vars.Planet.DarkIceAccess],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				// {
				// 	name: "Shackle Key",
				// 	access_rules: ["staff, tricky"],
				// 	sections: [{}],
				// 	map_locations: [
				// 		{
				// 			map: vars.Maps.DIM,
				// 			x: 35,
				// 			y: 205
				// 		}
				// 	]
				// },
				{
					name: "Release Entrance SnowHorn",
					sections: [{id: 32, fallback: [vars.Tricky.Find]}], // should be Shackle Key, but not rando'd
					map_locations: [
						{
							map: vars.Maps.DIM,
							x: 46,
							y: 204
						}
					]
				},
				{
					name: "Dig Alpine Root in Entrance Hut",
					sections: [{id: 308, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.DIM,
							x: 89,
							y: 220
						}
					]
				}	
			]
		},
		{
			name: "DarkIce Mines Past First Bridge",
			access_rules: [and("@DarkIce Mines Entrance/Reach Area/", vars.Inventory.EntranceCog)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Injured SnowHorn",
					sections: [
						{id: 33, name: "Rescue"},
						{id: 34, name: "Feed", fallback: [has(vars.Inventory.AlpineDIM, 2)]}
					],
					map_locations: [
						{
							map: vars.Maps.DIM,
							x: 35,
							y: 148
						}
					]
				},
				{
					name: "Dig Alpine Root in Boulder Path",
					sections: [{id: 309, fallback: [vars.Tricky.Flame], preferFallback: true}], // apworld hasn't fixed this yet
					map_locations: [
						{
							map: vars.Maps.DIM,
							x: 79,
							y: 113
						}
					]
				}
			]
		},
		{
			name: "DarkIce Mines Past Gate",
			access_rules: [and("@DarkIce Mines Past First Bridge/Reach Area/", has(vars.Inventory.AlpineDIM, 2), vars.Tricky.Flame)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Enemy Gate Cog Chest",
					sections: [{id: 35, fallback: [luaFunc.HasBooster]}],
					map_locations: [
						{
							map: vars.Maps.DIM,
							x: 95,
							y: 90
						}
					]
				},
				{
					name: "Hut Cog Chest",
					sections: [{id: 36, fallback: [luaFunc.HasBooster]}],
					map_locations: [
						{
							map: vars.Maps.DIM,
							x: 65,
							y: 103
						}
					]
				},
				{
					name: "Ice Cog Chest",
					sections: [{id: 37, fallback: [and(vars.Tricky.Flame, luaFunc.HasBooster)]}],
					map_locations: [
						{
							map: vars.Maps.DIM,
							x: 31,
							y: 60
						}
					]
				},
				{
					name: "Fire Puzzle Reward",
					sections: [{id: 38, fallback: [and(vars.Tricky.Flame, has(vars.Inventory.SharpClawCogs, 3), luaFunc.HasBlaster)]}],
					map_locations: [
						{
							map: vars.Maps.DIM,
							x: 8,
							y: 109
						}
					]
				}
			]
		},
		{
			name: "DarkIce Mines Dungeon",
			access_rules: [and("@DarkIce Mines Past Gate/Reach Area/", vars.Inventory.DinosaurHorn, luaFunc.HasBooster)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				// {
				// 	name: "Fire Wall Chest",
				// 	sections: [{access_rules: ["$HasBlaster"]}],
				// 	map_locations: [
				// 		{
				// 			map: vars.Maps.DIM,
				// 			x: 289,
				// 			y: 186
				// 		}
				// 	]
				// },
				// {
				// 	name: "Ice Wall Chest",
				// 	access_rules: ["flame, @DarkIce Mines Dungeon/Fire Wall Chest/"],
				// 	sections: [{}],
				// 	map_locations: [
				// 		{
				// 			map: vars.Maps.DIM,
				// 			x: 273,
				// 			y: 40
				// 		}
				// 	]
				// },
				{
					name: "Boss Galdon",
					sections: [{id: 40, fallback: [and(vars.Tricky.Flame, luaFunc.HasBlaster)]}],
					map_locations: [
						{
							map: vars.Maps.DIM,
							x: 283,
							y: 253
						}
					]
				}
			]
		}
	]

	return locs
}

function mmp() {
	let locs: Parent[] = [
		{
			name: "Moon Mountain Pass",
			access_rules: [and("@ThornTail Hollow/Reach Area/", luaFunc.CanExplodeBombPlant)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Wind Draft North Fuel Cell",
					sections: [{id: 130}],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 66,
							y: 14
						}
					]
				},
				{
					name: "Wind Draft South Fuel Cell",
					sections: [{id: 131}],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 66,
							y: 131
						}
					]
				},
				{
					name: "Barrel Hill Fuel Cell",
					sections: [{id: 132}],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 217,
							y: 27
						}
					]
				}
			]
		},
		{
			name: "Moon Mountain Pass Past Gate",
			access_rules: [and("@Moon Mountain Pass/Reach Area/", vars.Inventory.MoonPassKey)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Behind Fort Fuel Cell",
					sections: [{id: 139, fallback: [vars.Staff.Staff]}],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 321,
							y: 31
						}
					]
				},
				{
					name: "Ground Quake Upgrade",
					sections: [{id: 4, fallback: [vars.Inventory.MoonPassKey]}],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 398,
							y: 66
						}
					]
				},
				{
					name: "BafomDad Ledge near Fort",
					sections: [{id: 315, fallback: [luaFunc.CanGrowMoonSeed]}],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 338,
							y: 39
						}
					]
				},
				{
					name: "BafomDad in Moon Seed Zone",
					sections: [{id: 316, fallback: [luaFunc.CanGrowMoonSeed]}],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 351,
							y: 106
						}
					]
				},
			]
		},
		{
			name: "Moon Mountain Pass Middle",
			access_rules: [and("@Moon Mountain Pass Past Gate/Reach Area/", luaFunc.CanExplodeBombPlant, luaFunc.CanGrowMoonSeed)],
			children: [
				{
					name: "Test of Combat",
					sections: [{id: 42, fallback: [and(vars.Tricky.Flame, vars.Staff.FireBlaster, vars.Staff.FreezeBlast)]}],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 357,
							y: 361
						}
					]
				},
				{
					name: "Meteorite Area",
					sections: [
						{id: 149, name: "Fuel Cell"},
						{id: 317, name: "BafomDad"}
					],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 399,
							y: 203
						}
					]
				},
				{
					name: "Cheat Well near Combat Shrine",
					sections: [
						{id: 150, name: "Fuel Cell", fallback: [luaFunc.CanGrowMoonSeed]},
						{id: 318, name: "BafomDad", fallback: [luaFunc.CanGrowMoonSeed]}
					],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 390,
							y: 322
						}
					]
				},
				{
					name: "Beside Combat Shrine Fuel Cell",
					sections: [{id: 151}],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 343,
							y: 341
						}
					]
				}
			]
		},
		{
			name: "Volcano Force Point Temple Entrance",
			access_rules: ["@Moon Mountain Pass Past Gate/Reach Area/"],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "BafomDad Cell",
					sections: [{id: 312, fallback: [luaFunc.HasBooster]}],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 214,
							y: 105
						}
					]
				},
				// {
				// 	name: "Disguise Alcove",
				// 	sections: [
				// 		{id: 142, name: "Fuel Cell Left", fallback: [and(vars.Staff.Disguise, luaFunc.HasBooster)]},
				// 		{id: 143, name: "Fuel Cell Right", fallback: [and(vars.Staff.Disguise, luaFunc.HasBooster)]},
				// 		{id: 313, name: "BafomDad", fallback: [and(vars.Staff.Disguise, luaFunc.HasBooster)]}
				// 	],
				// 	map_locations: [
				// 		{
				// 			map: vars.Maps.MMP,
				// 			x: 181,
				// 			y: 105
				// 		}
				// 	]
				// },
				{
					name: "Freeze Blast Alcove Fuel Cells",
					sections: [
						{id: 140, name: "Left", fallback: [and(vars.Staff.FreezeBlast, luaFunc.HasBooster)]},
						{id: 141, name: "Right", fallback: [and(vars.Staff.FreezeBlast, luaFunc.HasBooster)]}
					],
					map_locations: [
						{
							map: vars.Maps.MMP,
							x: 198,
							y: 105
						}
					]
				},
				{
					name: "Below Bridge Fuel Cell",
					sections: [{id: 144}],
					map_locations: [
						{
							map: vars.Maps.VFP,
							x: 52,
							y: 140
						}
					]
				}
			]
		},
		{
			name: "Volcano Force Point Temple",
			access_rules: [and("@Volcano Force Point Temple Entrance/Reach Area/", vars.Inventory.FireSpellstone1)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Cheat Well",
					sections: [
						{id: 145, name: "Fuel Cell Left", fallback: [luaFunc.CanGrowMoonSeed]},
						{id: 146, name: "Fuel Cell Right", fallback: [luaFunc.CanGrowMoonSeed]},
						{id: 314, name: "BafomDad", fallback: [luaFunc.CanGrowMoonSeed]},
					],
					map_locations: [
						{
							map: vars.Maps.VFP,
							x: 98,
							y: 92
						}
					]
				},
				{
					name: "Freeze Blast Upgrade",
					sections: [{id: 3}],
					map_locations: [
						{
							map: vars.Maps.VFP,
							x: 211,
							y: 139
						}
					]
				}
			]
		},
		{
			name: "Volcano Force Point Temple Warp Room",
			access_rules: [and("@Volcano Force Point Temple Entrance/Reach Area/", vars.Staff.FreezeBlast, vars.Tricky.Flame, luaFunc.HasBlaster)],
			children: [
				{
					name: "Round Room Ledge Fuel Cell",
					sections: [{id: 147}],
					map_locations: [
						{
							map: vars.Maps.VFP,
							x: 185,
							y: 51
						}
					]
				},
				{
					name: "Warp Room Fuel Cell",
					sections: [{id: 148}],
					map_locations: [
						{
							map: vars.Maps.VFP,
							x: 175,
							y: 51
						}
					]
				},
				{
					name: "Insert Fire SpellStone 1",
					sections: [{id: 41, fallback: [vars.Inventory.FireSpellstone1]}],
					map_locations: [
						{
							map: vars.Maps.VFP,
							x: 200,
							y: 80
						}
					]
				}
			]
		}
	]

	return locs
}

function lfv() {
	let locs: Parent[] = [
		{
			name: "LightFoot Village",
			access_rules: [and("@ThornTail Hollow/Reach Area/", vars.Staff.Staff)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Entrance Booster Ledge",
					sections: [
						{id: 126, name: "Fuel Cell Right", fallback: [luaFunc.HasBooster]},
						{id: 127, name: "Fuel Cell Left", fallback: [luaFunc.HasBooster]},
						{id: 320, name: "BafomDad", fallback: [luaFunc.HasBooster]},
					],
					map_locations: [
						{
							map: vars.Maps.LFV,
							x: 166,
							y: 207
						}
					]
				}
			]
		}
	]

	return locs
}

function cc() {
	let locs: Parent[] = [
		{
			name: "Cape Claw Transition Area",
			access_rules: [and("@LightFoot Village/Reach Area/", luaFunc.CanBuy(60))],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Transition Bottom Platform Fuel Cell",
					sections: [{id: 152, fallback: [`[${vars.Staff.RocketBoost}]`], preferFallback: true}], // OoL rules
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 249,
							y: 207
						}
					]
				},
				{
					name: "Transition Bottom Waterfall Fuel Cell",
					sections: [{id: 153, fallback: [`[${vars.Staff.RocketBoost}]`], preferFallback: true}], // OoL rules
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 226,
							y: 182
						}
					]
				},
				{
					name: "Transition Bottom Weeds Fuel Cell",
					sections: [{id: 154, fallback: [`[${vars.Staff.RocketBoost}]`], preferFallback: true}], // OoL rules
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 252,
							y: 181
						}
					]
				},
			]
		},
		{
			name: "Cape Claw Open Area",
			access_rules: ["@Cape Claw Transition Area/Reach Area/"],
			children: [
				{
					name: "Give HighTop Gold Bars",
					sections: [
						{
							id: 44,
							fallback: [and(has(vars.Inventory.GoldBar, 4), luaFunc.CanBuy(25)), and(has(vars.Inventory.GoldBar, 4), vars.Staff.RocketBoost)],
						}
					],
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 100,
							y: 78
						}
					]
				},
				{
					name: "Rescue CloudRunner",
					sections: [
						{
							id: 45,
							fallback: [and(has(vars.Inventory.GoldBar, 4), luaFunc.CanBuy(25)), and(has(vars.Inventory.GoldBar, 4), vars.Staff.RocketBoost)]
						}
					],
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 8,
							y: 190
						}
					]
				},
				{
					name: "Drop from Bridge Fuel Cell",
					sections: [{id: 155}],
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 133,
							y: 239
						}
					]
				},
				{
					name: "Drop from Deck Fuel Cell",
					sections: [{id: 156}],
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 119,
							y: 137
						}
					]
				},
				{
					name: "Dig in Back Cave Fuel Cell",
					sections: [{id: 157, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 22,
							y: 123
						}
					]
				},
				{
					name: "Dig BafomDad middle of Water",
					sections: [{id: 321, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 81,
							y: 134
						}
					]
				},
				{
					name: "Dig Gold Bar near HighTop",
					sections: [{id: 322, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 186,
							y: 18
						}
					]
				},
				{
					name: "Dig Gold Bar behind Bramble",
					sections: [{id: 323, fallback: [vars.Tricky.Flame]}],
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 26,
							y: 32
						}
					]
				},
				{
					name: "Dig Gold Bar before Bramble",
					sections: [{id: 324, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 29,
							y: 81
						}
					]
				},
				{
					name: "Dig Gold Bar near CloudRunner Cell",
					sections: [{id: 325, fallback: [vars.Tricky.Find]}],
					map_locations: [
						{
							map: vars.Maps.CC,
							x: 27,
							y: 162
						}
					]
				}
			]
		}
	]

	return locs
}

function crf() {
	let locs: Parent[] = [
		{
			name: "CloudRunner Fortress Landing",
			access_rules: [vars.Planet.CloudRunnerAccess],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Entrance Platform Race",
					sections: [{id: 46}],
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 111,
							y: 97
						}
					]
				}
			]
		},
		{
			name: "CloudRunner Fortress Main",
			access_rules: [and("@CloudRunner Fortress Landing/Reach Area/", vars.Staff.FireBlaster)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Explode Prison Ceiling",
					sections: [{id: 47}],
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 173,
							y: 28
						}
					]
				},
				{
					name: "Rescue Gradabug",
					sections: [{id: 48, fallback: [vars.Staff.Staff]}],
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 202,
							y: 18
						}
					]
				},
				{
					name: "Red Crystal Chest",
					sections: [{id: 49, fallback: [vars.Staff.Staff]}],
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 204,
							y: 45
						}
					]
				},
				{
					name: "Green Crystal Chest",
					sections: [{id: 50, fallback: [luaFunc.HasIceBlast]}],
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 213,
							y: 45
						}
					]
				},
				{
					name: "Blue Crystal Chest",
					sections: [{id: 51, fallback: [and(luaFunc.HasIceBlast, vars.Staff.RocketBoost)]}],
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 219,
							y: 143
						}
					]
				},
				{
					name: "Cage BafomDad",
					sections: [{id: 326}],
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 191,
							y: 18
						}
					]
				},
				{
					name: "Cell BafomDad",
					sections: [{id: 327}],
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 219,
							y: 35
						}
					]
				},
			]
		},
		{
			name: "CloudRunner Fortress Powered",
			access_rules: [and("@CloudRunner Fortress Main/Reach Area/", vars.Inventory.PowerKey, vars.Inventory.RedCrystal, vars.Inventory.GreenCrystal, vars.Inventory.BlueCrystal, vars.Staff.Disguise)],
			children: [
				{
					name: "Rescue Queen CloudRunner",
					sections: [{id: 52, fallback: [vars.Staff.Disguise]}],
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 242,
							y: 97
						}
					]
				},
				{
					name: "BafomDad on Back Crates",
					sections: [{id: 328}],
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 302,
							y: 85
						}
					]
				},
				{
					name: "BafomDad near Boss Door",
					sections: [{id: 329}],
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 288,
							y: 140
						}
					]
				},
				{
					name: "BafomDad in Dark Room",
					sections: [{id: 330, fallback: [and(luaFunc.HasBlaster, vars.Staff.RocketBoost, vars.Inventory.CloudRunnerFlute, luaFunc.CanTraverseDark)], preferFallback: true}], // OoL rules
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 267,
							y: 88
						}
					]
				},
				{
					name: "Defeat Boss SharpClaw Race",
					sections: [{id: 53, fallback: [and(luaFunc.HasBlaster, vars.Staff.RocketBoost, vars.Inventory.CloudRunnerFlute, luaFunc.CanTraverseDark)], preferFallback: true}], // OoL rules
					map_locations: [
						{
							map: vars.Maps.CRF,
							x: 244,
							y: 57
						}
					]
				},
			]
		},
	]

	return locs
}

// @ts-ignore
if (import.meta.main) {
	createLocations()
}