ManualStorageCode = "manual_location_storage"

SlotDataKeyMapping = {
	["shop_locations"] = ShopSetting,
	["plant_shuffle"] = PlantShuffle,
}
SlotDataMapping = {
	["shop_locations"] = {
		["no_map"] = 0,
		["all"] = 1,
		["nothing"] = 2,
	},
	["plant_shuffle"] = {
		[0] = 0,
		[1] = 1
	}
}

-- autotab
local saur = "Sauria"
local tth = "ThornTail Hollow"
local well = "Ancient Well"
local shw = "SnowHorn Wastes"
local dim = "DarkIce Mines"
local mmp = "Moon Mountain Pass"
local vfp = "Volcano Force Point Temple"
local lfv = "LightFoot Village"
local cc = "Cape Claw"
local crf = "CloudRunner Fortress"
local dr = "Dragon Rock"
local wc = "Walled City"
MapIDToTab = {
	-- [0x0b] = {"Krazoa Palace"},
	[0x07] = {saur, tth},
	[0x08] = {saur, well},
	[0x43] = {saur, tth}, -- connector from snowhorn wastes
	[0x17] = {saur, shw}, -- ice mountain
	[0x38] = {saur, shw}, -- snowy path
	[0x0a] = {saur, shw},
	[0x0e] = {saur, lfv},
	[0x45] = {saur, mmp}, -- connector from thorntail hollow
	[0x12] = {saur, mmp},
	[0x13] = {dim}, -- top
	[0x1b] = {dim}, -- dungeon
	[0x1c] = {dim}, -- galdon
	[0x04] = {saur, vfp},
	[0x0C] = {crf},
}

PriorityToHighlight = {
	[0] = Highlight.Unspecified,
	[10] = Highlight.NoPriority,
	[20] = Highlight.Avoid,
	[30] = Highlight.Priority,
	[40] = Highlight.None -- found
}