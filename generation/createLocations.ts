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
function addLocs(data: Parent[]) {
	if (!data) {
		console.warn("addLocs: data is null")
		return
	}
	if (data.length <= 0) {
		console.warn("addLocs: data is empty")
		return
	}

	locMapping.push(...data)
}

export default function createLocations() {
	locMapping = []
	readFromFile("generation/locations-output.json", (data: LocationRule[]) => {
		// console.log(JSON.stringify(data, null, '\t'))
		addLocs(tth(data))
		addLocs(kp(data))
		addLocs(shw(data))
		addLocs(dim(data))
		addLocs(mmp(data))
		addLocs(lfv(data))
		addLocs(cc(data))
		addLocs(crf(data))

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

function tth(data: LocationRule[]) {
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
					sections: [{id: 1, access_rules: constructRules(ruleDataFromID(data, 1))}],
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
							access_rules: constructRules(ruleDataFromID(data, 200), [luaFunc.CanBuy(10)])
						},
						{
							id: 201,
							name: "Hi-Tech Display Device",
							access_rules: constructRules(ruleDataFromID(data, 201), [luaFunc.CanBuy(20)])
						},
						{
							id: 202,
							name: "Tricky Ball",
							access_rules: constructRules(ruleDataFromID(data, 202), [luaFunc.CanBuy(15)])
						},
						{
							id: 203,
							name: "BafomDad Holder",
							access_rules: constructRules(ruleDataFromID(data, 203), [luaFunc.CanBuy(20)])
						},
						{
							id: 204,
							name: "FireFly Lantern",
							access_rules: constructRules(ruleDataFromID(data, 204), [luaFunc.CanBuy(20)])
						},
						{
							id: 205,
							name: "SnowHorn Artifact",
							access_rules: constructRules(ruleDataFromID(data, 205), [luaFunc.CanBuy(130)])
						},
						{
							id: 210,
							name: "Map Cape Claw",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 210), [luaFunc.CanBuy(5)])
						},
						{
							id: 211,
							name: "Map Ocean Force Point",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 211), [luaFunc.CanBuy(10)])
						},
						{
							id: 212,
							name: "Map Krazoa Palace",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 212), [luaFunc.CanBuy(5)])
						},
						{
							id: 213,
							name: "Map Dragon Rock",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 213), [luaFunc.CanBuy(5)])
						},
						{
							id: 214,
							name: "Map ThornTail Hollow",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 214), [luaFunc.CanBuy(5)])
						},
						{
							id: 215,
							name: "Map Moon Pass",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 215), [luaFunc.CanBuy(5)])
						},
						{
							id: 216,
							name: "Map LightFoot Village",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 216), [luaFunc.CanBuy(5)])
						},
						{
							id: 217,
							name: "Map DarkIce Mines",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 217), [luaFunc.CanBuy(5)])
						},
						{
							id: 218,
							name: "Map CloudRunner Fortress",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 218), [luaFunc.CanBuy(5)])
						},
						{
							id: 219,
							name: "Map Walled City",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 219), [luaFunc.CanBuy(5)])
						},
						{
							id: 220,
							name: "Map SnowHorn Wastes",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 220), [luaFunc.CanBuy(5)])
						},
						{
							id: 221,
							name: "Map Volcano Force Point",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 221), [luaFunc.CanBuy(10)])
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
					sections: [{id: 100, access_rules: constructRules(ruleDataFromID(data, 100))}],
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
						{id: 101, name: "Left", access_rules: constructRules(ruleDataFromID(data, 101))},
						{id: 102, name: "Right", access_rules: constructRules(ruleDataFromID(data, 102))}
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
						{id: 103, name: "Left", access_rules: constructRules(ruleDataFromID(data, 103), [luaFunc.CanExplodeBombPlant])},
						{id: 104, name: "Right", access_rules: constructRules(ruleDataFromID(data, 104), [luaFunc.CanExplodeBombPlant])}
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
						{id: 105, name: "Center", access_rules: constructRules(ruleDataFromID(data, 105), [luaFunc.CanExplodeBombPlant])},
						{id: 106, name: "Left", access_rules: constructRules(ruleDataFromID(data, 106), [luaFunc.CanExplodeBombPlant])},
						{id: 107, name: "Right", access_rules: constructRules(ruleDataFromID(data, 107), [luaFunc.CanExplodeBombPlant])},
						{id: 108, name: "Back", access_rules: constructRules(ruleDataFromID(data, 108), [luaFunc.CanExplodeBombPlant])}
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
						{id: 109, name: "Center", access_rules: constructRules(ruleDataFromID(data, 109), [luaFunc.CanExplodeBombPlant])},
						{id: 110, name: "Right", access_rules: constructRules(ruleDataFromID(data, 110), [luaFunc.CanExplodeBombPlant])},
						{id: 111, name: "Left", access_rules: constructRules(ruleDataFromID(data, 111), [luaFunc.CanExplodeBombPlant])}
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
						{id: 112, name: "Left", access_rules: constructRules(ruleDataFromID(data, 112), [luaFunc.HasBooster])},
						{id: 113, name: "Right", access_rules: constructRules(ruleDataFromID(data, 113), [luaFunc.HasBooster])}
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
					sections: [{id: 30, access_rules: constructRules(ruleDataFromID(data, 30), [and(vars.Staff.FireBlaster, luaFunc.HasBooster)])}],
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
					sections: [{id: 31, access_rules: constructRules(ruleDataFromID(data, 31), [has(vars.Inventory.WhiteGrubTub, 6)])}],
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
					sections: [{id: 304, access_rules: constructRules(ruleDataFromID(data, 304), [vars.Tricky.Find])}],
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
					sections: [{id: 305, access_rules: constructRules(ruleDataFromID(data, 305), [vars.Tricky.Find])}],
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
						{id: 124, name: "Right", access_rules: constructRules(ruleDataFromID(data, 124), [vars.Staff.Staff])},
						{id: 125, name: "Left", access_rules: constructRules(ruleDataFromID(data, 125), [vars.Staff.Staff])}
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
					sections: [{id: 306, access_rules: constructRules(ruleDataFromID(data, 306), [vars.Tricky.Find])}],
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
					sections: [{id: 2, access_rules: constructRules(ruleDataFromID(data, 2), [luaFunc.CanExplodeBombPlant])}],
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
						{id: 128, name: "Left", access_rules: constructRules(ruleDataFromID(data, 128), [luaFunc.HasBooster])},
						{id: 129, name: "Right", access_rules: constructRules(ruleDataFromID(data, 129), [luaFunc.HasBooster])}
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
					sections: [{id: 24, access_rules: constructRules(ruleDataFromID(data, 24))}],
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
					sections: [{id: 25, access_rules: constructRules(ruleDataFromID(data, 25))}],
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
					sections: [{id: 26, access_rules: constructRules(ruleDataFromID(data, 26), [luaFunc.CanExplodeBombPlant])}],
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
					sections: [{id: 27, access_rules: constructRules(ruleDataFromID(data, 27), [luaFunc.HasBooster])}],
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
						{id: 28, name: "5", access_rules: constructRules(ruleDataFromID(data, 28), [and(vars.Staff.FireBlaster, luaFunc.HasBooster)])},
						{id: 29, name: "6", access_rules: constructRules(ruleDataFromID(data, 29), [and(vars.Staff.FireBlaster, luaFunc.HasBooster)])}
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

	let output = JSON.stringify(locs, (k, v) => k == "id" ? undefined : v, '\t')
	output = output.replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")

	writeToFile("locations/thorntail_hollow.jsonc", output)

	return locs
}

function kp(data: LocationRule[]) {
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
					sections: [{id: 319, access_rules: constructRules(ruleDataFromID(data, 319), [luaFunc.CanTraverseDark], true)}] // ool rules
				}
			]
		},
		{
			name: "Krazoa Palace Main",
			access_rules: [and("@Krazoa Palace Entrance/Reach Area/", vars.Staff.FireBlaster, luaFunc.CanTraverseDark)],
			children: [
				{
					name: "Release Spirit 2",
					sections: [{id: 43, access_rules: constructRules(ruleDataFromID(data, 43), [vars.Inventory.KrazoaSpirit2])}]
				}
			]
		},
	]

	let output = JSON.stringify(locs, (k, v) => k == "id" ? undefined : v, '\t')
	output = output.replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")

	writeToFile("locations/krazoa_palace.jsonc", output)

	return locs
}

function shw(data: LocationRule[]) {
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
						{id: 114, name: "Cheat Well Fuel Cell", access_rules: constructRules(ruleDataFromID(data, 114))},
						{id: 115, name: "Race Cave Fuel Cell Front", access_rules: constructRules(ruleDataFromID(data, 115))},
						{id: 116, name: "Race Cave Fuel Cell Back", access_rules: constructRules(ruleDataFromID(data, 116))}
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
					sections: [{id: 20, access_rules: constructRules(ruleDataFromID(data, 20), [vars.Tricky.Find])}],
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
						{id: 21, name: "1", access_rules: constructRules(ruleDataFromID(data, 21), [has(vars.Inventory.AlpineSHW)])},
						{id: 22, name: "2", access_rules: constructRules(ruleDataFromID(data, 22), [has(vars.Inventory.AlpineSHW, 2)])}
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
						{id: 117, name: "Left", access_rules: constructRules(ruleDataFromID(data, 117))},
						{id: 118, name: "Right", access_rules: constructRules(ruleDataFromID(data, 118))}
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
					sections: [{id: 300, access_rules: constructRules(ruleDataFromID(data, 300), [vars.Tricky.Find])}],
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
					sections: [{id: 301, access_rules: constructRules(ruleDataFromID(data, 301), [vars.Tricky.Find])}],
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
					sections: [{id: 302, access_rules: constructRules(ruleDataFromID(data, 302), [vars.Tricky.Find])}],
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
						{id: 119, name: "Left", access_rules: constructRules(ruleDataFromID(data, 119), [vars.Staff.Staff])},
						{id: 120, name: "Right (Also Dig Cave Right)", access_rules: constructRules(ruleDataFromID(data, 120), [vars.Staff.Staff])}
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
						{id: 121, name: "Fuel Cell Left", access_rules: constructRules(ruleDataFromID(data, 121), [vars.Tricky.Find])},
						{
							name: "Fuel Cell Right (Also Water Platform Right)",
							ref: "SnowHorn Wastes Entrance/Water Platform Fuel Cells/Right (Also Dig Cave Right)" // vanilla links these on accident
						},
						{id: 310, name: "BafomDad", access_rules: constructRules(ruleDataFromID(data, 303), [vars.Tricky.Find])}
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
						{id: 122, name: "Left", access_rules: constructRules(ruleDataFromID(data, 122), [and(vars.Staff.FireBlaster, luaFunc.HasBooster)])},
						{id: 123, name: "Right", access_rules: constructRules(ruleDataFromID(data, 123), [and(vars.Staff.FireBlaster, luaFunc.HasBooster)])}
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
					sections: [{id: 303, access_rules: constructRules(ruleDataFromID(data, 303), [vars.Tricky.Find])}],
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
					sections: [{id: 23, access_rules: constructRules(ruleDataFromID(data, 23))}],
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
						{id: 133, name: "Fuel Cell Left", access_rules: constructRules(ruleDataFromID(data, 133), [luaFunc.HasBlaster])},
						{id: 134, name: "Fuel Cell Right", access_rules: constructRules(ruleDataFromID(data, 134), [luaFunc.HasBlaster])},
						{id: 311, name: "BafomDad", access_rules: constructRules(ruleDataFromID(data, 311), [luaFunc.HasBlaster])}
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
					sections: [{id: 135, access_rules: constructRules(ruleDataFromID(data, 135))}],
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
						{id: 136, name: "Center", access_rules: constructRules(ruleDataFromID(data, 136))},
						{id: 137, name: "Right (Use Blaster in Nearby Cave)", access_rules: constructRules(ruleDataFromID(data, 137), [luaFunc.HasBlaster])},
						{id: 138, name: "Left (Use Blaster in Nearby Cave)", access_rules: constructRules(ruleDataFromID(data, 138), [luaFunc.HasBlaster])}
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
					sections: [{id: 307, access_rules: constructRules(ruleDataFromID(data, 307), [vars.Tricky.Find])}],
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

	let output = JSON.stringify(locs, (k, v) => k == "id" ? undefined : v, '\t')
	output = output.replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")

	writeToFile("locations/snowhorn_wastes.jsonc", output)

	return locs
}

function dim(data: LocationRule[]) {
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
					sections: [{id: 32, access_rules: constructRules(ruleDataFromID(data, 32), [vars.Tricky.Find])}], // should be Shackle Key, but not rando'd
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
					sections: [{id: 308, access_rules: constructRules(ruleDataFromID(data, 308), [vars.Tricky.Find])}],
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
						{id: 33, name: "Rescue", access_rules: constructRules(ruleDataFromID(data, 33))},
						{id: 34, name: "Feed", access_rules: constructRules(ruleDataFromID(data, 34), [has(vars.Inventory.AlpineDIM, 2)])}
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
					sections: [{id: 309, access_rules: constructRules(ruleDataFromID(data, 309), [vars.Tricky.Flame], true)}], // apworld hasn't fixed this yet
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
					sections: [{id: 35, access_rules: constructRules(ruleDataFromID(data, 35), [luaFunc.HasBooster])}],
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
					sections: [{id: 36, access_rules: constructRules(ruleDataFromID(data, 36), [luaFunc.HasBooster])}],
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
					sections: [{id: 37, access_rules: constructRules(ruleDataFromID(data, 37), [and(vars.Tricky.Flame, luaFunc.HasBooster)])}],
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
					sections: [{id: 38, access_rules: constructRules(ruleDataFromID(data, 38), [and(vars.Tricky.Flame, has(vars.Inventory.SharpClawCogs, 3), luaFunc.HasBlaster)])}],
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
					sections: [{id: 40, access_rules: constructRules(ruleDataFromID(data, 40), [and(vars.Tricky.Flame, luaFunc.HasBlaster)])}],
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

	let output = JSON.stringify(locs, (k, v) => k == "id" ? undefined : v, '\t')
	output = output.replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")

	writeToFile("locations/darkice_mines.jsonc", output)

	return locs
}

function mmp(data: LocationRule[]) {
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
					sections: [{id: 130, access_rules: constructRules(ruleDataFromID(data, 130))}],
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
					sections: [{id: 131, access_rules: constructRules(ruleDataFromID(data, 131))}],
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
					sections: [{id: 132, access_rules: constructRules(ruleDataFromID(data, 132))}],
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
					sections: [{id: 139, access_rules: constructRules(ruleDataFromID(data, 139), [vars.Staff.Staff])}],
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
					sections: [{id: 4, access_rules: constructRules(ruleDataFromID(data, 4), [vars.Inventory.MoonPassKey])}],
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
					sections: [{id: 315, access_rules: constructRules(ruleDataFromID(data, 315), [luaFunc.CanGrowMoonSeed])}],
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
					sections: [{id: 316, access_rules: constructRules(ruleDataFromID(data, 316), [luaFunc.CanGrowMoonSeed])}],
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
					sections: [{id: 42, access_rules: constructRules(ruleDataFromID(data, 42), [and(vars.Tricky.Flame, vars.Staff.FireBlaster, vars.Staff.FreezeBlast)])}],
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
						{id: 149, name: "Fuel Cell", access_rules: constructRules(ruleDataFromID(data, 149))},
						{id: 317, name: "BafomDad", access_rules: constructRules(ruleDataFromID(data, 317))}
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
						{id: 150, name: "Fuel Cell", access_rules: constructRules(ruleDataFromID(data, 150), [luaFunc.CanGrowMoonSeed])},
						{id: 318, name: "BafomDad", access_rules: constructRules(ruleDataFromID(data, 318), [luaFunc.CanGrowMoonSeed])}
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
					sections: [{id: 151, access_rules: constructRules(ruleDataFromID(data, 151))}],
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
					sections: [{id: 312, access_rules: constructRules(ruleDataFromID(data, 312), [luaFunc.HasBooster])}],
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
				// 		{id: 142, name: "Fuel Cell Left", access_rules: constructRules(ruleDataFromID(data, 142), [and(vars.Staff.Disguise, luaFunc.HasBooster)])},
				// 		{id: 143, name: "Fuel Cell Right", access_rules: constructRules(ruleDataFromID(data, 143), [and(vars.Staff.Disguise, luaFunc.HasBooster)])},
				// 		{id: 313, name: "BafomDad", access_rules: constructRules(ruleDataFromID(data, 313), [and(vars.Staff.Disguise, luaFunc.HasBooster)])}
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
						{id: 140, name: "Left", access_rules: constructRules(ruleDataFromID(data, 140), [and(vars.Staff.FreezeBlast, luaFunc.HasBooster)])},
						{id: 141, name: "Right", access_rules: constructRules(ruleDataFromID(data, 141), [and(vars.Staff.FreezeBlast, luaFunc.HasBooster)])}
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
					sections: [{id: 144, access_rules: constructRules(ruleDataFromID(data, 144))}],
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
						{id: 145, name: "Fuel Cell Left", access_rules: constructRules(ruleDataFromID(data, 145), [luaFunc.CanGrowMoonSeed])},
						{id: 146, name: "Fuel Cell Right", access_rules: constructRules(ruleDataFromID(data, 146), [luaFunc.CanGrowMoonSeed])},
						{id: 314, name: "BafomDad", access_rules: constructRules(ruleDataFromID(data, 314), [luaFunc.CanGrowMoonSeed])},
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
					sections: [{id: 3, access_rules: constructRules(ruleDataFromID(data, 3))}],
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
					sections: [{id: 147, access_rules: constructRules(ruleDataFromID(data, 147))}],
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
					sections: [{id: 148, access_rules: constructRules(ruleDataFromID(data, 148))}],
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
					sections: [{id: 41, access_rules: constructRules(ruleDataFromID(data, 41), [vars.Inventory.FireSpellstone1])}],
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

	let output = JSON.stringify(locs, (k, v) => k == "id" ? undefined : v, '\t')
	output = output.replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")

	writeToFile("locations/moon_mountain_pass.jsonc", output)

	return locs
}

function lfv(data: LocationRule[]) {
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
						{id: 126, name: "Fuel Cell Right", access_rules: constructRules(ruleDataFromID(data, 126), [luaFunc.HasBooster])},
						{id: 127, name: "Fuel Cell Left", access_rules: constructRules(ruleDataFromID(data, 127), [luaFunc.HasBooster])},
						{id: 320, name: "BafomDad", access_rules: constructRules(ruleDataFromID(data, 320), [luaFunc.HasBooster])},
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

	let output = JSON.stringify(locs, (k, v) => k == "id" ? undefined : v, '\t')
	output = output.replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")

	writeToFile("locations/lightfoot_village.jsonc", output)

	return locs
}

function cc(data: LocationRule[]) {
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
					sections: [{id: 152, access_rules: constructRules(ruleDataFromID(data, 152), [`[${vars.Staff.RocketBoost}]`], true)}],
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
					sections: [{id: 153, access_rules: constructRules(ruleDataFromID(data, 153), [`[${vars.Staff.RocketBoost}]`], true)}],
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
					sections: [{id: 154, access_rules: constructRules(ruleDataFromID(data, 154), [`[${vars.Staff.RocketBoost}]`], true)}],
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
							access_rules: constructRules(ruleDataFromID(data, 44), [and(has(vars.Inventory.GoldBar, 4), luaFunc.CanBuy(25)), and(has(vars.Inventory.GoldBar, 4), vars.Staff.RocketBoost)]),
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
							access_rules: constructRules(ruleDataFromID(data, 45), [and(has(vars.Inventory.GoldBar, 4), luaFunc.CanBuy(25)), and(has(vars.Inventory.GoldBar, 4), vars.Staff.RocketBoost)])
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
					sections: [{id: 155, access_rules: constructRules(ruleDataFromID(data, 155))}],
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
					sections: [{id: 156, access_rules: constructRules(ruleDataFromID(data, 156))}],
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
					sections: [{id: 157, access_rules: constructRules(ruleDataFromID(data, 157), [vars.Tricky.Find])}],
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
					sections: [{id: 321, access_rules: constructRules(ruleDataFromID(data, 321), [vars.Tricky.Find])}],
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
					sections: [{id: 322, access_rules: constructRules(ruleDataFromID(data, 322), [vars.Tricky.Find])}],
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
					sections: [{id: 323, access_rules: constructRules(ruleDataFromID(data, 323), [vars.Tricky.Flame])}],
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
					sections: [{id: 324, access_rules: constructRules(ruleDataFromID(data, 324), [vars.Tricky.Find])}],
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
					sections: [{id: 325, access_rules: constructRules(ruleDataFromID(data, 325), [vars.Tricky.Find])}],
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

	let output = JSON.stringify(locs, (k, v) => k == "id" ? undefined : v, '\t')
	output = output.replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")

	writeToFile("locations/cape_claw.jsonc", output)

	return locs
}

function crf(data: LocationRule[]) {
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
					sections: [{id: 46, access_rules: constructRules(ruleDataFromID(data, 46))}],
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
					sections: [{id: 47, access_rules: constructRules(ruleDataFromID(data, 47))}],
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
					sections: [{id: 48, access_rules: constructRules(ruleDataFromID(data, 48), [vars.Staff.Staff])}],
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
					sections: [{id: 49, access_rules: constructRules(ruleDataFromID(data, 49), [vars.Staff.Staff])}],
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
					sections: [{id: 50, access_rules: constructRules(ruleDataFromID(data, 50), [luaFunc.HasIceBlast])}],
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
					sections: [{id: 51, access_rules: constructRules(ruleDataFromID(data, 51), [and(luaFunc.HasIceBlast, vars.Staff.RocketBoost)])}],
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
					sections: [{id: 326, access_rules: constructRules(ruleDataFromID(data, 326))}],
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
					sections: [{id: 327, access_rules: constructRules(ruleDataFromID(data, 327))}],
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
					sections: [{id: 52, access_rules: constructRules(ruleDataFromID(data, 52), [vars.Staff.Disguise])}],
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
					sections: [{id: 328, access_rules: constructRules(ruleDataFromID(data, 328))}],
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
					sections: [{id: 329, access_rules: constructRules(ruleDataFromID(data, 329))}],
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
					sections: [{id: 330, access_rules: constructRules(ruleDataFromID(data, 330), [and(luaFunc.HasBlaster, vars.Staff.RocketBoost, vars.Inventory.CloudRunnerFlute, luaFunc.CanTraverseDark)], true)}],
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
					sections: [{id: 53, access_rules: constructRules(ruleDataFromID(data, 53), [and(luaFunc.HasBlaster, vars.Staff.RocketBoost, vars.Inventory.CloudRunnerFlute, luaFunc.CanTraverseDark)], true)}],
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

	let output = JSON.stringify(locs, (k, v) => k == "id" ? undefined : v, '\t')
	output = output.replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")

	writeToFile("locations/cloudrunner_fortress.jsonc", output)

	return locs
}


// @ts-ignore
if (import.meta.main) {
	createLocations()
}