-- staff
Staff = "staff"
FireBlaster = "fire_blaster"
RocketBoost = "rocket_boost"
IceBlaster = "ice_blast"
GroundQuake = "ground_quake"
SuperGroundQuake = "super_quake"
SharpClawDisguise = "disguise"
-- tricky
Tricky = "tricky"
TrickyFlame = "flame"
-- playet
DinosaurPlanet = "dinosaur_planet"
DarkIceMines = "darkice_mines"
CloudRunnerFortress = "cloudrunner_fortress"
WalledCity = "walled_city"
DragonRock = "dragon_rock"
-- inventory
ScarabBag = "scarab_bag"
ScarabBag2 = "scarab_bag_2"
ScarabBag3 = "scarab_bag_3"
BombPlant = "bomb_plant"
AlpineRootSHW = "alpine_root_shw"
WhiteGrubTubFungus = "grubtub"
SharpClawPrisonKey = "gate_key"
Cog1 = "cog1"
AlpineRootDIM = "alpine_root_dim"
Cog2 = "cog2"
DinosaurHorn = "dinosaur_horn"
SilverKey = "silver_key"
-- shop
RockCandy = "rock_candy"
FireFlyLantern = "lantern"
-- SnowhornArtifact = "snowhorn_artifact"

-- helpers
ManualStorageCode = "manual_location_storage"

SlotDataMapping = {
	["shop_locations"] = {
		["no_map"] = 0,
		["all"] = 1,
		["nothing"] = 2,
	}
}

-- autotab
MapIDToTab = {
	-- [0x0b] = {"Krazoa Palace"},
	[0x07] = {"ThornTail Hollow"},
	[0x08] = {"Ancient Well"},
	[0x43] = {"ThornTail Hollow"}, -- connector from snowhorn wastes
	[0x17] = {"SnowHorn Wastes"}, -- ice mountain
	[0x38] = {"SnowHorn Wastes"}, -- snowy path
	[0x0a] = {"SnowHorn Wastes"},
	[0x0e] = {"LightFoot Village"},
	[0x45] = {"Moon Mountain Pass"}, -- connector from thorntail hollow
	[0x12] = {"Moon Mountain Pass"},
	[0x13] = {"DarkIce Mines"}, -- top
	[0x1b] = {"DarkIce Mines"}, -- dungeon
	[0x1c] = {"DarkIce Mines"}, -- galdon
	-- [0x04] = {"Volcano Force Point Temple"},
}

PriorityToHighlight = {
	[0] = Highlight.Unspecified,
	[10] = Highlight.NoPriority,
	[20] = Highlight.Avoid,
	[30] = Highlight.Priority,
	[40] = Highlight.None -- found
}