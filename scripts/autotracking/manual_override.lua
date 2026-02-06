local function CanProvideCodeFunc(self, code)
	return code == self.Name
end

local function ProvidesCodeFunc(self, code)
	if CanProvideCodeFunc(self, code) then
		return 1
	end
	return 0
end
local function SaveManualLocationStorageFunc(self)
	return {
		ManualLocations = self.ItemState.ManualLocations,
		ManualLocationsOrder = self.ItemState.ManualLocationsOrder,
		Target = self.ItemState.Target,
		Name = self.Name,
		Icon = self.Icon
	}
end

local function LoadManualLocationStorageFunc(self, data)
	if data ~= nil and self.Name == data.Name then
		self.ItemState.ManualLocations = data.ManualLocations
		self.ItemState.ManualLocationsOrder = data.ManualLocationsOrder
		self.Icon = ImageReference:FromPackRelativePath(data.Icon)
	end
end

---@param name string
---@return LuaItem
function CreateLuaManualLocationStorage(name)
	local self = ScriptHost:CreateLuaItem()
	self.Name = name
	self.Icon = ImageReference:FromPackRelativePath("/images/labels/chest.png")
	self.ItemState = {
		ManualLocations = {
			["default"] = {}
		},
		ManualLocationsOrder = {}
	}

	self.CanProvideCodeFunc = CanProvideCodeFunc
	self.OnLeftClickFunc = nil -- your_custom_leftclick_function_here
	self.OnRightClickFunc = nil -- your_custom_rightclick_function_here
	self.OnMiddleClickFunc = nil -- your_custom_middleclick_function_here
	self.ProvidesCodeFunc = ProvidesCodeFunc
	self.SaveFunc = SaveManualLocationStorageFunc
	self.LoadFunc = LoadManualLocationStorageFunc
	return self
end