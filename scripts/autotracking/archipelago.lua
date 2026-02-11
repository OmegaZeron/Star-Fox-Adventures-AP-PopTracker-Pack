require("scripts.autotracking.item_mapping")
require("scripts.autotracking.location_mapping")

local CurIndex = -1
local SlotData = {}

local AllLocations = {}
local IsManualClick = true
local DEFAULT_SEED <const> = "default"
local RoomSeed = DEFAULT_SEED
local HintsID = nil

function PreOnClear()
	PlayerID = Archipelago.PlayerNumber or -1
	TeamNumber = Archipelago.TeamNumber or 0

	if Archipelago.PlayerNumber > -1 then
		if #AllLocations > 0 then
			AllLocations = {}
		end
		for _, value in pairs(Archipelago.MissingLocations) do
			table.insert(AllLocations, #AllLocations + 1, value)
		end

		for _, value in pairs(Archipelago.CheckedLocations) do
			table.insert(AllLocations, #AllLocations + 1, value)
		end
	end

	local manualStorageItem = Tracker:FindObjectForCode(ManualStorageCode)
	if manualStorageItem then
		manualStorageItem = manualStorageItem.ItemState
	end
	local seedBase = Archipelago.Seed .. "_" .. Archipelago.TeamNumber .. "_" .. Archipelago.PlayerNumber
	if manualStorageItem and (RoomSeed == DEFAULT_SEED or RoomSeed ~= seedBase) then
		RoomSeed = seedBase
		if #manualStorageItem.ManualLocations > 10 then
			manualStorageItem.ManualLocations[manualStorageItem.ManualLocationsOrder[1]] = nil
			table.remove(manualStorageItem.ManualLocationsOrder, 1)
		end
		if manualStorageItem.ManualLocations[RoomSeed] == nil then
			manualStorageItem.ManualLocations[RoomSeed] = {}
			table.insert(manualStorageItem.ManualLocationsOrder, RoomSeed)
		end
	end
end

function OnClear(slotData)
	-- print("called OnClear, slot_data:", dump(slot_data))
	SlotData = slotData

	print(dump(Archipelago.MissingLocations), dump(Archipelago.CheckedLocations))

	IsManualClick = false
	if Tracker:FindObjectForCode(ManualStorageCode) == nil then
		CreateLuaManualLocationStorage(ManualStorageCode)
	end
	local manualStorageItem = Tracker:FindObjectForCode(ManualStorageCode).ItemState

	PreOnClear()

	CurIndex = -1

	-- reset locations
	for _, locArray in pairs(LOCATION_MAPPING) do
		for _, location in pairs(locArray) do
			local obj = Tracker:FindObjectForCode(location)
			if obj then
				if location:sub(1, 1) == "@" then
					---@cast obj LocationSection
					if manualStorageItem and manualStorageItem.ManualLocations[RoomSeed] and manualStorageItem.ManualLocations[RoomSeed][obj.FullID] then
						obj.AvailableChestCount = manualStorageItem.ManualLocations[RoomSeed][obj.FullID]
					else
						obj.AvailableChestCount = obj.ChestCount
					end
				else
					---@cast obj JsonItem
					obj.Active = false
				end
			end
		end
	end

	-- reset items
	for _, itemData in pairs(ITEM_MAPPING) do
		if itemData[1] and itemData[2] then
			local obj = Tracker:FindObjectForCode(itemData[1])
			if obj then
				if itemData[2] == "toggle" then
					obj.Active = false
				elseif itemData[2] == "progressive" then
					obj.CurrentStage = 0
				elseif itemData[2] == "consumable" then
					obj.AcquiredCount = 0
				else
					print(string.format("onClear: unknown item type %s for code %s", itemData[2], itemData[1]))
				end
			else
				print(string.format("onClear: could not find object for code %s", itemData[1]))
			end
		end
	end

	if Archipelago.PlayerNumber > -1 then
		HintsID = "_read_hints_"..TeamNumber.."_"..PlayerID

		Archipelago:SetNotify({HintsID})
		Archipelago:Get({HintsID})
	end

	-- TODO slot data here

	IsManualClick = true
end

-- called when an item gets collected
function OnItem(index, item_id, item_name, player_number)
	-- print(string.format("called onItem: %s, %s, %s, %s, %s", index, item_id, item_name, player_number, CUR_INDEX))
	if not AUTOTRACKER_ENABLE_ITEM_TRACKING then
		return
	end
	if index <= CurIndex then
		return
	end

	CurIndex = index;
	local itemData = ITEM_MAPPING[item_id]
	if not itemData then
		-- print("onItem: could not find item mapping for id", item_id)
		return
	end
	-- print(string.format("onItem: code: %s, type %s", itemData[1], itemData[2]))
	if not itemData[1] then
		return
	end

	local item = Tracker:FindObjectForCode(itemData[1])
	if item then
		if itemData[2] == "toggle" then
			item.Active = true
		elseif itemData[2] == "progressive" then
			local inc = 1
			if (itemData[3]) then
				inc = itemData[3]
			end
			item.CurrentStage = item.CurrentStage + inc
		elseif itemData[2] == "consumable" then
			local mult = 1
			if (itemData[3]) then
				mult = itemData[3]
			end
			item.AcquiredCount = item.AcquiredCount + (item.Increment * mult)
		else
			print(string.format("onItem: unknown item type %s for code %s", itemData[2], itemData[1]))
		end
	else
		print("onItem: could not find object for code %s", itemData[1])
	end
end

-- called when a location gets cleared
function OnLocation(location_id, location_name)
	IsManualClick = false

	local location_array = LOCATION_MAPPING[location_id]
	if not location_array or not location_array[1] then
		print(string.format("onLocation: could not find location mapping for id %s", location_id))
		return
	end

	for _, location in pairs(location_array) do
		local obj = Tracker:FindObjectForCode(location)
		-- print(location, obj)
		if obj then
			if location:sub(1, 1) == "@" then
				obj.AvailableChestCount = obj.AvailableChestCount - 1
			else
				obj.Active = true
			end
			UpdateHints(location_id, Highlight.None)
		else
			print(string.format("onLocation: could not find object for code %s", location))
		end
	end

	IsManualClick = true
end

function OnNotify(key, value, old_value)
	-- print(string.format("called onNotify: %s, %s, %s", key, dump(value), old_value))
	if value == nil or value == old_value then
		return
	end

	if key == HintsID then
		for _, hint in ipairs(value) do
			if not hint.found and hint.finding_player == Archipelago.PlayerNumber then
				UpdateHints(hint.location, PriorityToHighlight[hint.status])
			else
				UpdateHints(hint.location, Highlight.None)
			end
		end
	end
end

function OnNotifyLaunch(key, value)
	-- print("called onNotifyLaunch: %s, %s", key, dump(value))
	OnNotify(key, value)
end

-- called when a location is hinted or the status of a hint is changed
---@param locationID number
---@param status highlight
function UpdateHints(locationID, status)
	local locations = LOCATION_MAPPING[locationID]
	-- print("Hint", dump(locations), status)
	for _, location in ipairs(locations) do
		local section = Tracker:FindObjectForCode(location)
		if section then
			---@cast section LocationSection
			section.Highlight = status
		else
			print(string.format("No object found for code: %s", location))
		end
	end
end

---@param location LocationSection
function ManualLocationHandler(location)
	if IsManualClick then
		local manualStorageItem = Tracker:FindObjectForCode(ManualStorageCode)
		if not manualStorageItem then
			return
		end
		manualStorageItem = manualStorageItem.ItemState
		if not manualStorageItem then
			return
		end
		if Archipelago.PlayerNumber == -1 and RoomSeed ~= DEFAULT_SEED then
			-- seed is from previous connection
			RoomSeed = DEFAULT_SEED
			manualStorageItem.ManualLocations[RoomSeed] = {}
		end
		local fullID = location.FullID
		if not manualStorageItem.ManualLocations[RoomSeed] then
			manualStorageItem.ManualLocations[RoomSeed] = {}
		end
		if location.AvailableChestCount < location.ChestCount then
			-- add to list
			manualStorageItem.ManualLocations[RoomSeed][fullID] = location.AvailableChestCount
			location.Highlight = Highlight.None
		else
			-- remove from list of set back to max chestcount
			manualStorageItem.ManualLocations[RoomSeed][fullID] = nil
			-- re-grab hints since it was cleared earlier
			Archipelago:Get({HintsID})
		end
	end
end

Archipelago:AddClearHandler("clear handler", OnClear)
if AUTOTRACKER_ENABLE_ITEM_TRACKING then
	Archipelago:AddItemHandler("item handler", OnItem)
end
if AUTOTRACKER_ENABLE_LOCATION_TRACKING then
	Archipelago:AddLocationHandler("location handler", OnLocation)
end
Archipelago:AddSetReplyHandler("notify handler", OnNotify)
Archipelago:AddRetrievedHandler("notify launch handler", OnNotifyLaunch)
