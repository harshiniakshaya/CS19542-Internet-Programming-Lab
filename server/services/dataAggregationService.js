const Donation = require('../models/Donations.js');
const Recycle = require('../models/Recycle.js');

class DataAggregationService {
  async aggregateData() {
    const years = await Donation.distinct("createdAt").then(dates => {
      return [...new Set(dates.map(date => new Date(date).getFullYear()))]; // Get unique years
    });

    const aggregatedData = { data: [] };

    for (const year of years) {
      const yearData = { year: year, months: [] };

      for (let month = 1; month <= 12; month++) {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0); 

        const totalDonations = await Donation.countDocuments({
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
        });
        const totalActiveDonations = await Donation.countDocuments({
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
          expiryTime: { $gt: new Date() },
        });
        const totalExpiredDonations = totalDonations - totalActiveDonations;
        const totalRecycles = await Recycle.countDocuments({
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
        });
        yearData.months.push({
          month: month,
          totalDonations,
          totalRecycles,
          totalActiveDonations,
          totalExpiredDonations,
        });
      }
      aggregatedData.data.push(yearData);
    }
    return aggregatedData;
  }
}

module.exports = new DataAggregationService();
