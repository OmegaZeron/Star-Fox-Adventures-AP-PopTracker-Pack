function Has(item, amount)
	if (amount == nil) then
		amount = 1
	end
	local count = Tracker:ProviderCountForCode(item)
	amount = tonumber(amount)
	return amount and count >= amount
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

---@param price number|string?
---@return boolean
function CanBuy(price)
	price = tonumber(price)
	if price == nil then
		return false
	end

	if price <= 10 then
		return true
	elseif price <= 50 then
		return Has(ScarabBag)
	elseif price <= 100 then
		return Has(ScarabBag2)
	end
	return Has(ScarabBag3)
end