const dataAggregationService = require('../services/dataAggregationService');

class DataAggregationController {
    async getAggregatedData(req, res) {
      try {
        const aggregatedData = await dataAggregationService.aggregateData();
        res.status(200).json(aggregatedData);
      } catch (error) {
        console.error('Error fetching aggregated data:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
  
  module.exports = new DataAggregationController();
  
