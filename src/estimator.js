/* eslint-disable linebreak-style */
const impact = require('./impact');
const severeImpact = require('./severeImpact');

const covid19ImpactEstimator = (data) => {
  // console.log(impact);
  // console.log(severeImpact);
  return {
    data,
    impact,
    severeImpact
  };
};

// covid19ImpactEstimator({
//   region: {
//     name: "Africa",
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: "days",
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// });
export default covid19ImpactEstimator;
