---@param item string
---@param amount string|number?
---@return boolean
function Has(item, amount)
	amount = tonumber(amount) or 1
	local count = Tracker:ProviderCountForCode(item)
	return count >= amount
end

---@param result boolean
---@return accessibilityLevel
function BoolToAccess(result)
	if result then
		return AccessibilityLevel.Normal
	else
		return AccessibilityLevel.None
	end
end

---@param ... boolean|string|function|accessibilityLevel
---@return accessibilityLevel
function All(...)
	local args = { ... }
	local min = AccessibilityLevel.Normal
	for _, access in ipairs(args) do
		if type(access) == "function" then
			access = access()
		elseif type(access) == "string" then
			access = BoolToAccess(Has(access))
		end
		if type(access) == "boolean" then
			access = BoolToAccess(access)
		end

		if access < min then
			if access == AccessibilityLevel.None then
				return AccessibilityLevel.None
			else
				min = access
			end
		end
	end
	return min
end

---@param ... boolean|string|function|accessibilityLevel
---@return accessibilityLevel
function Any(...)
	local args = { ... }
	local max = AccessibilityLevel.None
	for _, access in ipairs(args) do
		if type(access) == "function" then
			access = access()
		elseif type(access) == "string" then
			access = BoolToAccess(Has(access))
		end
		if type(access) == "boolean" then
			access = BoolToAccess(access)
		end

		if access > max then
			if access == AccessibilityLevel.Normal then
				return AccessibilityLevel.Normal
			else
				max = access
			end
		end
	end
	return max
end

function HasBlaster()
	return Has(Staff) and Has(FireBlaster)
end

function HasBooster()
	return Has(Staff) and Has(RocketBoost)
end

function CanExplodeBombPlant()
	return HasBlaster() and Has(BombPlant)
end

function CanGroundQuake()
	return Has(Staff) and Has(GroundQuake)
end

---@param price number|string?
---@return accessibilityLevel
function CanBuy(price)
	price = tonumber(price)
	if price == nil then
		return AccessibilityLevel.None
	end

	return Any(
		All(
			price <= 10,
			Any(
				ScarabBag1, -- for QoL
				AccessibilityLevel.SequenceBreak
			)
		),
		All(
			price <= 50,
			ScarabBag1
		),
		All(
			price <= 100,
			ScarabBag2
		),
		ScarabBag3
	)
end