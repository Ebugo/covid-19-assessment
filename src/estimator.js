/* eslint-disable linebreak-style */
const impact = require('./impact');
const severeImpact = require('./severeImpact');

const covid19ImpactEstimator = (data) => ({
  data,
  impact,
  severeImpact
});

export default covid19ImpactEstimator;
