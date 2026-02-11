-- items
Staff = "staff"
FireBlaster = "fire_blaster"
RocketBoost = "rocket_boost"
IceBlaster = "ice_blast"
GroundQuake = "ground_quake"
SuperGroundQuake = "super_quake"
SharpClawDisguise = "disguise"
Tricky = "tricky"
TrickyFlame = "flame"
ScarabBag = "scarab_bag"
ScarabBag2 = "scarab_bag_2"
ScarabBag3 = "scarab_bag_3"
BombPlant = "bomb_plant"
AlpineRoot = "alpine_root"
WhiteGrubTubFungus = "grubtub"
SharpClawPrisonKey = "gate_key"
RockCandy = "rock_candy"
FireFlyLantern = "lantern"
SnowhornArtifact = "snowhorn_artifact"

-- helpers
ManualStorageCode = "manual_location_storage"

-- autotab
MapIDToTab = {
	[0x07] = {"ThornTail Hollow"},
	[0x43] = {"ThornTail Hollow"}, -- connector from snowhorn wastes
	[0x17] = {"SnowHorn Wastes"}, -- ice mountain
	[0x38] = {"SnowHorn Wastes"}, -- snowy path
	[0x0a] = {"SnowHorn Wastes"},
	[0x0e] = {"LightFoot Village"},
	[0x45] = {"Moon Mountain Pass"}, -- connector from thorntail hollow
	[0x12] = {"Moon Mountain Pass"},
	[0x13] = {"DarkIce Mines"},
}

PriorityToHighlight = {
	[0] = Highlight.Unspecified,
	[10] = Highlight.NoPriority,
	[20] = Highlight.Avoid,
	[30] = Highlight.Priority,
	[40] = Highlight.None -- found
}