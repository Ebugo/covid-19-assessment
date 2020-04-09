/* eslint-disable linebreak-style */

const impact = (data) => {
  const percentage = (num, percent) => Math.round((num / 100) * percent);
  const avgIncomePopulation = data.region.avgDailyIncomePopulation;
  const avgIncome = data.region.avgDailyIncomeInUSD;
  let numOfDays;
  let factor;

  if (data.periodType === 'days') {
    numOfDays = data.timeToElapse;
    factor = Math.round(numOfDays / 3);
  } else if (data.periodType === 'weeks') {
    numOfDays = data.timeToElapse * 7;
    factor = Math.round(numOfDays / 3);
  } else if (data.periodType === 'months') {
    numOfDays = data.timeToElapse * 28;
    factor = Math.round(numOfDays / 3);
  } else {
    return 'Invalid data type';
  }

  const currentlyInfected = data.reportedCases * 10;
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);

  const severeCasesByRequestedTime = percentage(currentlyInfected, 15);
  const availableHospitalBeds = percentage(data.totalHospitalBeds, 35);
  const hospitalBedsByRequestedTime = availableHospitalBeds - severeCasesByRequestedTime;

  const casesForICUByRequestedTime = percentage(infectionsByRequestedTime, 5);
  const casesForVentilatorsByRequestedTime = percentage(infectionsByRequestedTime, 2);
  const dollarsInFlight = (infectionsByRequestedTime * avgIncomePopulation) * avgIncome * numOfDays;

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    availableHospitalBeds,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const severeImpact = (data) => {
  const percentage = (num, percent) => Math.round((num / 100) * percent);
  const avgIncomePopulation = data.region.avgDailyIncomePopulation;
  const avgIncome = data.region.avgDailyIncomeInUSD;
  let numOfDays;
  let factor;

  if (data.periodType === 'days') {
    numOfDays = data.timeToElapse;
    factor = Math.round(numOfDays / 3);
  } else if (data.periodType === 'weeks') {
    numOfDays = data.timeToElapse * 7;
    factor = Math.round(numOfDays / 3);
  } else if (data.periodType === 'months') {
    numOfDays = data.timeToElapse * 28;
    factor = Math.round(numOfDays / 3);
  } else {
    return 'Invalid data type';
  }

  const currentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);

  const severeCasesByRequestedTime = percentage(currentlyInfected, 15);
  const availableHospitalBeds = percentage(data.totalHospitalBeds, 35);
  const hospitalBedsByRequestedTime = availableHospitalBeds - severeCasesByRequestedTime;

  const casesForICUByRequestedTime = percentage(infectionsByRequestedTime, 5);
  const casesForVentilatorsByRequestedTime = percentage(infectionsByRequestedTime, 2);
  const dollarsInFlight = (infectionsByRequestedTime * avgIncomePopulation) * avgIncome * numOfDays;

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    availableHospitalBeds,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: impact(data),
  severeImpact: severeImpact(data)
});

export default covid19ImpactEstimator;
