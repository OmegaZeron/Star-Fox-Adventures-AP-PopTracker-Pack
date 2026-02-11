require("scripts.utils")
require("scripts.variable_definitions")
require("scripts.logic.logic")
require("scripts.locations")
require("scripts.autotracking")

Tracker:AddItems("items/items.jsonc")
Tracker:AddItems("items/pack_settings.jsonc")
Tracker:AddMaps("maps/maps.jsonc")

Tracker:AddLayouts("layouts/item_grids.jsonc")
Tracker:AddLayouts("layouts/tracker_layouts.jsonc")

require("scripts.autotracking.manual_override")
CreateLuaManualLocationStorage(ManualStorageCode)
ScriptHost:AddOnLocationSectionChangedHandler("manual location handler", ManualLocationHandler)