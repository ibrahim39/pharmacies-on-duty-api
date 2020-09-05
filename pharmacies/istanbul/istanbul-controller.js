const { redisKeyPrefixIstanbul } = require('../../config')
const { APIError, redis } = require('../../utils')

/**
 * Returns the pharmacies on duty data for provided district in Istanbul as JSON.
 * @param		{string} district district name
 * @returns	{Object}
 */
const getPharmacies = async (district) => {
	// Fetches the pharmacies on duty data for provided district from redis.
	const data = await redis.get(redisKeyPrefixIstanbul + district)
	const pharmacies = JSON.parse(data)

	if (!data) {
		return
	}

	if (!pharmacies.length) {
		throw new APIError(
			500,
			`Couldn't get the pharmacies on duty for ${district}.`
		)
	}

	if (!pharmacies[0].name) {
		throw new APIError(
			500,
			`Couldn't get the pharmacies data for Istanbul. Which means that the scraper couldn't scrape the data from html.`,
			false
		)
	}

	return pharmacies
}

module.exports = getPharmacies
