import { vars, luaFunc, writeToFile, readFromFile, has, and, constructRules, Location, Rule, RuleArgs } from "./utils.ts"

export default function createLocations() {
	readFromFile("generation/locations-output.json", (data: any) => {
		// console.log(JSON.stringify(data, null, '\t'))
		tth(data)
		shw(data)
		dim(data)
		mmp(data)
	})
}

function ruleDataFromID(data: Location[], id: number): Rule | null {
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

function tth(data: Location[]) {
	let locs = [
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
					sections: [{access_rules: constructRules(ruleDataFromID(data, 1))}],
					map_locations: [
						{
							map: "thorntail",
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
							name: "Rock Candy",
							access_rules: constructRules(ruleDataFromID(data, 200), [luaFunc.CanBuy(10)])
						},
						{
							name: "Hi-Tech Display Device",
							access_rules: constructRules(ruleDataFromID(data, 201), [luaFunc.CanBuy(20)])
						},
						{
							name: "Tricky Ball",
							access_rules: constructRules(ruleDataFromID(data, 202), [luaFunc.CanBuy(15)])
						},
						{
							name: "BafomDad Holder",
							access_rules: constructRules(ruleDataFromID(data, 203), [luaFunc.CanBuy(20)])
						},
						{
							name: "FireFly Lantern",
							access_rules: constructRules(ruleDataFromID(data, 204), [luaFunc.CanBuy(20)])
						},
						{
							name: "SnowHorn Artifact",
							access_rules: constructRules(ruleDataFromID(data, 205), [luaFunc.CanBuy(130)])
						},
						{
							name: "Map Cape Claw",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 210), [luaFunc.CanBuy(5)])
						},
						{
							name: "Map Ocean Force Point",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 211), [luaFunc.CanBuy(10)])
						},
						{
							name: "Map Krazoa Palace",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 212), [luaFunc.CanBuy(5)])
						},
						{
							name: "Map Dragon Rock",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 213), [luaFunc.CanBuy(5)])
						},
						{
							name: "Map ThornTail Hollow",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 214), [luaFunc.CanBuy(5)])
						},
						{
							name: "Map Moon Pass",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 215), [luaFunc.CanBuy(5)])
						},
						{
							name: "Map LightFoot Village",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 216), [luaFunc.CanBuy(5)])
						},
						{
							name: "Map DarkIce Mines",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 217), [luaFunc.CanBuy(5)])
						},
						{
							name: "Map CloudRunner Fortress",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 218), [luaFunc.CanBuy(5)])
						},
						{
							name: "Map Walled City",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 219), [luaFunc.CanBuy(5)])
						},
						{
							name: "Map SnowHorn Wastes",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 220), [luaFunc.CanBuy(5)])
						},
						{
							name: "Map Volcano Force Point",
							visibility_rules: [vars.Settings.ShopMaps],
							access_rules: constructRules(ruleDataFromID(data, 221), [luaFunc.CanBuy(10)])
						}
					],
					map_locations: [
						{
							map: "thorntail",
							x: 159,
							y: 274
						}
					]
				},
				{
					name: "Queen Cave Fuel Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 100))}],
					map_locations: [
						{
							map: "thorntail",
							x: 280,
							y: 401
						}
					]
				},
				{
					name: "Pillar Fuel Cells",
					sections: [
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 101))},
						{name: "Right", access_rules: constructRules(ruleDataFromID(data, 102))}
					],
					map_locations: [
						{
							map: "thorntail",
							x: 168,
							y: 369
						}
					]
				},
				{
					name: "Beside WarpStone Fuel Cells",
					sections: [
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 103), [luaFunc.CanExplodeBombPlant])},
						{name: "Right", access_rules: constructRules(ruleDataFromID(data, 104), [luaFunc.CanExplodeBombPlant])}
					],
					map_locations: [
						{
							map: "thorntail",
							x: 144,
							y: 256
						}
					]
				},
				{
					name: "Waterfall Cave Fuel Cells",
					sections: [
						{name: "Center", access_rules: constructRules(ruleDataFromID(data, 105), [luaFunc.CanExplodeBombPlant])},
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 106), [luaFunc.CanExplodeBombPlant])},
						{name: "Right", access_rules: constructRules(ruleDataFromID(data, 107), [luaFunc.CanExplodeBombPlant])},
						{name: "Back", access_rules: constructRules(ruleDataFromID(data, 108), [luaFunc.CanExplodeBombPlant])}
					],
					map_locations: [
						{
							map: "thorntail",
							x: 114,
							y: 276
						}
					]
				},
				{
					name: "South Cave Fuel Cells",
					sections: [
						{name: "Center", access_rules: constructRules(ruleDataFromID(data, 109), [luaFunc.CanExplodeBombPlant])},
						{name: "Right", access_rules: constructRules(ruleDataFromID(data, 110), [luaFunc.CanExplodeBombPlant])},
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 111), [luaFunc.CanExplodeBombPlant])}
					],
					map_locations: [
						{
							map: "thorntail",
							x: 172,
							y: 399
						}
					]
				},
				{
					name: "Above Store Fuel Cells",
					sections: [
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 112), [luaFunc.HasBooster])},
						{name: "Right", access_rules: constructRules(ruleDataFromID(data, 113), [luaFunc.HasBooster])}
					],
					map_locations: [
						{
							map: "thorntail",
							x: 183,
							y: 229
						}
					]
				},
				{
					name: "Magic Upgrade above Store",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 30), [and(vars.Staff.FireBlaster, luaFunc.HasBooster)])}],
					map_locations: [
						{
							map: "thorntail",
							x: 157,
							y: 235
						}
					]
				},
				{
					name: "Feed Queen White GrubTubs",
					access_rules: ["@ThornTail Hollow/Queen Cave Fuel Cell/"],
					sections: [{access_rules: constructRules(ruleDataFromID(data, 31), [has(vars.Inventory.WhiteGrubTub, 6)])}],
					map_locations: [
						{
							map: "thorntail",
							x: 279,
							y: 340
						}
					]
				},
				{
					name: "Dig near Store",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 304), [vars.Tricky.Find])}],
					map_locations: [
						{
							map: "thorntail",
							x: 176,
							y: 296
						}
					]
				},
				{
					name: "Dig near Queen Cave",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 305), [vars.Tricky.Find])}],
					map_locations: [
						{
							map: "thorntail",
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
						{name: "Right", access_rules: constructRules(ruleDataFromID(data, 124), [vars.Staff.Staff])},
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 125), [vars.Staff.Staff])}
					],
					map_locations: [
						{
							map: "thorntail",
							x: 37,
							y: 388
						}
					]
				},
				{
					name: "Dig in Entrance to LightFoot Village",
					access_rules: ["@ThornTail Hollow/LightFoot Village Entrance/"],
					sections: [{access_rules: constructRules(ruleDataFromID(data, 306), [vars.Tricky.Find])}],
					map_locations: [
						{
							map: "thorntail",
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
				// 			map: "thorntail",
				// 			x: 151,
				// 			y: 355
				// 		},
				// 		{
				// 			map: "thorntail",
				// 			x: 237,
				// 			y: 292,
				// 			shape: "diamond"
				// 		},
				// 		{
				// 			map: "thorntail",
				// 			x: 132,
				// 			y: 219,
				// 			shape: "diamond"
				// 		},
				// 		{
				// 			map: "thorntail",
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
							map: "thorntail",
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
					sections: [{access_rules: constructRules(ruleDataFromID(data, 2), [luaFunc.CanExplodeBombPlant])}],
					map_locations: [
						{
							map: "ancient_well",
							x: 105,
							y: 113
						}
					]
				},
				{
					name: "Fuel Cells",
					sections: [
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 128), [luaFunc.HasBooster])},
						{name: "Right", access_rules: constructRules(ruleDataFromID(data, 129), [luaFunc.HasBooster])}
					],
					map_locations: [
						{
							map: "ancient_well",
							x: 9,
							y: 141
						}
					]
				}
			]
		},
		{
			name: "Dark Ancient Well",
			access_rules: [and("@Ancient Well/Reach Area/", luaFunc.HasBooster, vars.Shop.FireFlyLantern, luaFunc.CanExplodeBombPlant)],
			children: [
				{
					name: "White GrubTub 1",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 24))}],
					map_locations: [
						{
							map: "ancient_well",
							x: 19,
							y: 33
						}
					]
				},
				{
					name: "White GrubTub 2",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 25))}],
					map_locations: [
						{
							map: "ancient_well",
							x: 116,
							y: 11
						}
					]
				},
				{
					name: "White GrubTub 3",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 26), [luaFunc.CanExplodeBombPlant])}],
					map_locations: [
						{
							map: "ancient_well",
							x: 12,
							y: 114
						}
					]
				},
				{
					name: "White GrubTub 4",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 27), [luaFunc.HasBooster])}],
					map_locations: [
						{
							map: "ancient_well",
							x: 73,
							y: 36
						}
					]
				},
				{
					name: "White GrubTubs",
					sections: [
						{name: "5", access_rules: constructRules(ruleDataFromID(data, 28), [and(vars.Staff.FireBlaster, luaFunc.HasBooster)])},
						{name: "6", access_rules: constructRules(ruleDataFromID(data, 29), [and(vars.Staff.FireBlaster, luaFunc.HasBooster)])}
					],
					map_locations: [
						{
							map: "ancient_well",
							x: 135,
							y: 122
						}
					]
				}
			]
		}
	]

	let output = JSON.stringify(locs, null, '\t').replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")
	writeToFile("locations/thorntail_hollow.jsonc", output)
}

function shw(data: Location[]) {
	let locs = [
		{
			name: "Ice Mountain",
			access_rules: [and("@ThornTail Hollow/Reach Area/", vars.Shop.RockCandy)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Ice Mountain",
					sections: [
						{name: "Cheat Well Fuel Cell", access_rules: constructRules(ruleDataFromID(data, 114))},
						{name: "Race Cave Fuel Cell Front", access_rules: constructRules(ruleDataFromID(data, 115))},
						{name: "Race Cave Fuel Cell Back", access_rules: constructRules(ruleDataFromID(data, 116))}
					],
					map_locations: [
						{
							map: "snowhorn",
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
					sections: [{access_rules: constructRules(ruleDataFromID(data, 20), [vars.Tricky.Find])}],
					map_locations: [
						{
							map: "snowhorn",
							x: 233,
							y: 144
						}
					]
				},
				{
					name: "Feed Alpine Root",
					sections: [
						{name: "1", access_rules: constructRules(ruleDataFromID(data, 21), [has(vars.Inventory.AlpineSHW)])},
						{name: "2", access_rules: constructRules(ruleDataFromID(data, 22), [has(vars.Inventory.AlpineSHW, 2)])}
					],
					map_locations: [
						{
							map: "snowhorn",
							x: 260,
							y: 149
						}
					]
				},
				{
					name: "Ice Block Fuel Cells", // requires alpine_root_shw:2 when SW isn't open
					sections: [
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 117))},
						{name: "Right", access_rules: constructRules(ruleDataFromID(data, 118))}
					],
					map_locations: [
						{
							map: "snowhorn",
							x: 223,
							y: 138
						}
					]
				},
				{
					name: "Dig Alpine Root near Campfire",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 300), [vars.Tricky.Find])}],
					map_locations: [
						{
							map: "snowhorn",
							x: 218,
							y: 188
						}
					]
				},
				{
					name: "Dig Alpine Root near Fallen Tree",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 301), [vars.Tricky.Find])}],
					map_locations: [
						{
							map: "snowhorn",
							x: 201,
							y: 154
						}
					]
				},
				{
					name: "Dig Egg near Water Spout",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 302), [vars.Tricky.Find])}],
					map_locations: [
						{
							map: "snowhorn",
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
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 119), [vars.Staff.Staff])},
						{name: "Right (Also Dig Cave Right)", access_rules: constructRules(ruleDataFromID(data, 120), [vars.Staff.Staff])}
					],
					map_locations: [
						{
							map: "snowhorn",
							x: 299,
							y: 124
						}
					]
				},
				{
					name: "Dig Cave near Entrance Fuel Cells",
					sections: [
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 121), [vars.Tricky.Find])},
						{
							name: "Right (Also Water Platform Right)",
							ref: "SnowHorn Wastes Entrance/Water Platform Fuel Cells/Right (Also Dig Cave Right)" // vanilla links these on accident
						}
					],
					map_locations: [
						{
							map: "snowhorn",
							x: 349,
							y: 136
						}
					]
				},
				{
					name: "Path to TTH Booster Fuel Cells",
					sections: [
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 122), [and(vars.Staff.FireBlaster, luaFunc.HasBooster)])},
						{name: "Right", access_rules: constructRules(ruleDataFromID(data, 123), [and(vars.Staff.FireBlaster, luaFunc.HasBooster)])}
					],
					map_locations: [
						{
							map: "thorntail",
							x: 224,
							y: 72
						}
					]
				},
				{
					name: "Dig BafomDad near Entrance",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 303), [vars.Tricky.Find])}],
					map_locations: [
						{
							map: "snowhorn",
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
					sections: [{access_rules: constructRules(ruleDataFromID(data, 23))}],
					map_locations: [
						{
							map: "snowhorn",
							x: 376,
							y: 139
						}
					]
				},
				{
					name: "Blast Tree past Gate Fuel Cells",
					sections: [
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 133), [luaFunc.HasBlaster])},
						{name: "Right", access_rules: constructRules(ruleDataFromID(data, 134), [luaFunc.HasBlaster])}
					],
					map_locations: [
						{
							map: "snowhorn",
							x: 364,
							y: 72
						}
					]
				},
				{
					name: "River past Gate Cheat Well Fuel Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 135))}],
					map_locations: [
						{
							map: "snowhorn",
							x: 455,
							y: 145
						}
					]
				},
				{
					name: "River Ledge past Gate Fuel Cells",
					sections: [
						{name: "Center", access_rules: constructRules(ruleDataFromID(data, 136))},
						{name: "Right (Use Blaster in Nearby Cave)", access_rules: constructRules(ruleDataFromID(data, 137), [luaFunc.HasBlaster])},
						{name: "Left (Use Blaster in Nearby Cave)", access_rules: constructRules(ruleDataFromID(data, 138), [luaFunc.HasBlaster])}
					],
					map_locations: [
						{
							map: "snowhorn",
							x: 426,
							y: 90
						}
					]
				},
				{
					name: "Dig in Cave past Gate",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 307), [vars.Tricky.Find])}],
					map_locations: [
						{
							map: "snowhorn",
							x: 410,
							y: 53
						}
					]
				}
			]
		}
	]

	let output = JSON.stringify(locs, null, '\t').replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")
	writeToFile("locations/snowhorn_wastes.jsonc", output)

}

function dim(data: Location[]) {
	let locs = [
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
				// 			map: "darkice",
				// 			x: 35,
				// 			y: 205
				// 		}
				// 	]
				// },
				{
					name: "Release Entrance SnowHorn",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 32), [vars.Tricky.Find])}], // should be Shackle Key, but not rando'd
					map_locations: [
						{
							map: "darkice",
							x: 46,
							y: 204
						}
					]
				},
				{
					name: "Dig Alpine Root in Entrance Hut",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 308), [vars.Tricky.Find])}],
					map_locations: [
						{
							map: "darkice",
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
						{name: "Rescue", access_rules: constructRules(ruleDataFromID(data, 33))},
						{name: "Feed", access_rules: constructRules(ruleDataFromID(data, 34), [has(vars.Inventory.AlpineDIM, 2)])}
					],
					map_locations: [
						{
							map: "darkice",
							x: 35,
							y: 148
						}
					]
				},
				{
					name: "Dig Alpine Root in Boulder Path",
					sections: [{access_rules: /*constructRules(ruleDataFromID(data, 309), */[vars.Tricky.Flame]/*)*/}],
					map_locations: [
						{
							map: "darkice",
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
					sections: [{access_rules: constructRules(ruleDataFromID(data, 35), [luaFunc.HasBooster])}],
					map_locations: [
						{
							map: "darkice",
							x: 95,
							y: 90
						}
					]
				},
				{
					name: "Hut Cog Chest",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 36), [luaFunc.HasBooster])}],
					map_locations: [
						{
							map: "darkice",
							x: 65,
							y: 103
						}
					]
				},
				{
					name: "Ice Cog Chest",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 37), [and(vars.Tricky.Flame, luaFunc.HasBooster)])}],
					map_locations: [
						{
							map: "darkice",
							x: 31,
							y: 60
						}
					]
				},
				{
					name: "Fire Puzzle Reward",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 38), [and(vars.Tricky.Flame, has(vars.Inventory.SharpClawCogs, 3), luaFunc.HasBlaster)])}],
					map_locations: [
						{
							map: "darkice",
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
				// 			map: "darkice",
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
				// 			map: "darkice",
				// 			x: 273,
				// 			y: 40
				// 		}
				// 	]
				// },
				{
					name: "Boss Galdon",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 40), [and(vars.Tricky.Flame, luaFunc.HasBlaster)])}],
					map_locations: [
						{
							map: "darkice",
							x: 283,
							y: 253
						}
					]
				}
			]
		}
	]

	let output = JSON.stringify(locs, null, '\t').replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")
	writeToFile("locations/darkice_mines.jsonc", output)
}

function mmp(data: Location[]) {
	let locs = [
		{
			name: "Moon Mountain Pass",
			access_rules: [and("@ThornTail Hollow/Reach Area/", luaFunc.CanExplodeBombPlant)],
			children: [
				{
					name: "Reach Area",
					sections: [{}]
				},
				{
					name: "Wind Draft Entrance Fuel Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 130))}],
					map_locations: [
						{
							map: "moon",
							x: 66,
							y: 131
						}
					]
				},
				{
					name: "Wind Draft Exit Fuel Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 131))}],
					map_locations: [
						{
							map: "moon",
							x: 66,
							y: 14
						}
					]
				},
				{
					name: "Barrel Hill Fuel Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 132))}],
					map_locations: [
						{
							map: "moon",
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
					sections: [{access_rules: constructRules(ruleDataFromID(data, 139), [vars.Staff.Staff])}],
					map_locations: [
						{
							map: "moon",
							x: 321,
							y: 31
						}
					]
				},
				{
					name: "Ground Quake Upgrade",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 4), [vars.Inventory.MoonPassKey])}],
					map_locations: [
						{
							map: "moon",
							x: 398,
							y: 66
						}
					]
				},
				{
					name: "BafomDad Ledge near Fort",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 315), [luaFunc.CanGrowMoonSeed])}],
					// map_locations: [
					// 	{
					// 		map: "moon",
					// 		x: 215,
					// 		y: 105
					// 	}
					// ]
				},
				{
					name: "BafomDad in Moon Seed Zone",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 316), [luaFunc.CanGrowMoonSeed])}],
					// map_locations: [
					// 	{
					// 		map: "moon",
					// 		x: 215,
					// 		y: 105
					// 	}
					// ]
				},
			]
		},
		{
			name: "Moon Mountain Pass Middle",
			access_rules: [and("@Moon Mountain Pass Past Gate/Reach Area/", luaFunc.CanExplodeBombPlant, luaFunc.CanGrowMoonSeed)],
			children: [
				{
					name: "Test of Combat",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 42), [and(vars.Tricky.Flame, vars.Staff.FireBlaster, vars.Staff.FreezeBlast)])}],
					// map_locations: [
					// 	{
					// 		map: "moon",
					// 		x: 212,
					// 		y: 27
					// 	}
					// ]
				},
				{
					name: "Meteorite Area Fuel Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 149))}],
					// map_locations: [
					// 	{
					// 		map: "moon",
					// 		x: 212,
					// 		y: 27
					// 	}
					// ]
				},
				{
					name: "Cheat Well near Combat Shrine Fuel Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 150), [luaFunc.CanGrowMoonSeed])}],
					map_locations: [
						{
							map: "moon",
							x: 390,
							y: 322
						}
					]
				},
				{
					name: "Beside Combat Shrine Fuel Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 151))}],
					// map_locations: [
					// 	{
					// 		map: "moon",
					// 		x: 390,
					// 		y: 322
					// 	}
					// ]
				},
				{
					name: "Meteorite Area BafomDad",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 317))}],
					// map_locations: [
					// 	{
					// 		map: "moon",
					// 		x: 212,
					// 		y: 27
					// 	}
					// ]
				},
				{
					name: "Cheat Well BafomDad",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 318), [luaFunc.CanGrowMoonSeed])}],
					// map_locations: [
					// 	{
					// 		map: "moon",
					// 		x: 390,
					// 		y: 322
					// 	}
					// ]
				},
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
					name: "Below Bridge Fuel Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 144))}],
					// map_locations: [
					// 	{
					// 		map: "moon",
					// 		x: 181,
					// 		y: 105
					// 	}
					// ]
				},
				{
					name: "BafomDad Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 312), [luaFunc.HasBooster])}]
				},
				// {
				// 	name: "Disguise Alcove",
				// 	sections: [
				// 		{name: "Fuel Cell Left", access_rules: constructRules(ruleDataFromID(data, 142), [and(vars.Staff.Disguise, luaFunc.HasBooster)])},
				// 		{name: "Fuel Cell Right", access_rules: constructRules(ruleDataFromID(data, 143), [and(vars.Staff.Disguise, luaFunc.HasBooster)])},
				// 		{name: "BafomDad", access_rules: constructRules(ruleDataFromID(data, 313), [and(vars.Staff.Disguise, luaFunc.HasBooster)])}
				// 	],
				// 	map_locations: [
				// 		{
				// 			map: "moon",
				// 			x: 181,
				// 			y: 105
				// 		}
				// 	]
				// },
				{
					name: "Freeze Blast Alcove Fuel Cells",
					sections: [
						{name: "Left", access_rules: constructRules(ruleDataFromID(data, 140), [and(vars.Staff.FreezeBlast, luaFunc.HasBooster)])},
						{name: "Right", access_rules: constructRules(ruleDataFromID(data, 141), [and(vars.Staff.FreezeBlast, luaFunc.HasBooster)])}
					],
					map_locations: [
						{
							map: "moon",
							x: 198,
							y: 105
						}
					]
				},
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
						{name: "Fuel Cell Left", access_rules: constructRules(ruleDataFromID(data, 145), [luaFunc.CanGrowMoonSeed])},
						{name: "Fuel Cell Right", access_rules: constructRules(ruleDataFromID(data, 146), [luaFunc.CanGrowMoonSeed])},
						{name: "BafomDad", access_rules: constructRules(ruleDataFromID(data, 314), [luaFunc.CanGrowMoonSeed])},
					],
					// map_locations: [
					// 	{
					// 		map: "volcano",
					// 		x: 211,
					// 		y: 139
					// 	}
					// ]
				},
				{
					name: "Freeze Blast Upgrade",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 3))}],
					map_locations: [
						{
							map: "volcano",
							x: 211,
							y: 139
						}
					]
				},
				{
					name: "Main Room Fuel Cell",
					access_rules: [luaFunc.HasIceBlast], // ?
					sections: [{}],
					// "map_locations": [
					// 	{
					// 		"map": "volcano",
					// 		"x": 114,
					// 		"y": 64
					// 	}
					// ]
				}
			]
		},
		{
			name: "Volcano Force Point Temple Upper Floor",
			access_rules: [and("@Volcano Force Point Temple Entrance/Reach Area/", vars.Staff.FreezeBlast, vars.Tricky.Flame, luaFunc.HasBlaster)],
			children: [
				{
					name: "Upper Floor Fuel Cell",
					sections: [{}],
					map_locations: [
						{
							map: "volcano",
							x: 185,
							y: 51
						}
					]
				}
			]
		},
		{
			name: "Volcano Force Point Temple Warp Room",
			access_rules: [],
			children: [
				{
					name: "Round Room Ledge Fuel Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 147))}],
				},
				{
					name: "Warp Room Fuel Cell",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 148))}]
				},
				{
					name: "Insert Fire SpellStone 1",
					sections: [{access_rules: constructRules(ruleDataFromID(data, 41), [vars.Inventory.FireSpellstone1])}]
				}
			]
		}
	]

	let output = JSON.stringify(locs, null, '\t').replace(/\[\n\s+(".+")\n\s+\]/g, "[$1]").replace(/\{\n\s+(.+)\n\s+\}/g, "{$1}").replace(/\[\n\t+\{\}\n\t+\]/gm, "[{}]")
	writeToFile("locations/moon_mountain_pass.jsonc", output)
}


// @ts-ignore
if (import.meta.main) {
	createLocations()
}