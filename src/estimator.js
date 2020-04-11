/* eslint-disable linebreak-style */
let numOfDays;
let factor;
const percentage = (num, percent) => ((num / 100) * percent);

const impact = (data) => {
  const avgIncomePopulation = data.region.avgDailyIncomePopulation;
  const avgIncome = data.region.avgDailyIncomeInUSD;

  if (data.periodType === 'days') {
    numOfDays = data.timeToElapse;
    factor = Math.trunc(numOfDays / 3);
  } else if (data.periodType === 'weeks') {
    numOfDays = data.timeToElapse * 7;
    factor = Math.trunc(numOfDays / 3);
  } else if (data.periodType === 'months') {
    numOfDays = data.timeToElapse * 30;
    factor = Math.trunc(numOfDays / 3);
  } else {
    return 'Invalid data type';
  }

  const currentlyInfected = data.reportedCases * 10;
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);

  const severeCasesByRequestedTime = percentage(infectionsByRequestedTime, 15);
  const availableHospitalBeds = percentage(data.totalHospitalBeds, 35);
  const hospitalBedsByRequestedTime = availableHospitalBeds - severeCasesByRequestedTime;

  const casesForICUByRequestedTime = percentage(infectionsByRequestedTime, 5);
  const casesForVentilatorsByRequestedTime = percentage(infectionsByRequestedTime, 2);
  const dollarsInFlight = (infectionsByRequestedTime * avgIncomePopulation * avgIncome) / numOfDays;

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: Math.round(severeCasesByRequestedTime),
    hospitalBedsByRequestedTime: Math.trunc(hospitalBedsByRequestedTime),
    casesForICUByRequestedTime: Math.trunc(casesForICUByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.trunc(casesForVentilatorsByRequestedTime),
    dollarsInFlight: Math.trunc(dollarsInFlight)
  };
};

const severeImpact = (data) => {
  const avgIncomePopulation = data.region.avgDailyIncomePopulation;
  const avgIncome = data.region.avgDailyIncomeInUSD;

  if (data.periodType === 'days') {
    numOfDays = data.timeToElapse;
    factor = Math.trunc(numOfDays / 3);
  } else if (data.periodType === 'weeks') {
    numOfDays = data.timeToElapse * 7;
    factor = Math.trunc(numOfDays / 3);
  } else if (data.periodType === 'months') {
    numOfDays = data.timeToElapse * 30;
    factor = Math.trunc(numOfDays / 3);
  } else {
    return 'Invalid data type';
  }

  const currentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * (2 ** factor);

  const severeCasesByRequestedTime = percentage(infectionsByRequestedTime, 15);
  const availableHospitalBeds = percentage(data.totalHospitalBeds, 35);
  const hospitalBedsByRequestedTime = availableHospitalBeds - severeCasesByRequestedTime;

  const casesForICUByRequestedTime = percentage(infectionsByRequestedTime, 5);
  const casesForVentilatorsByRequestedTime = percentage(infectionsByRequestedTime, 2);
  const dollarsInFlight = (infectionsByRequestedTime * avgIncomePopulation * avgIncome) / numOfDays;

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime: Math.round(severeCasesByRequestedTime),
    hospitalBedsByRequestedTime: Math.trunc(hospitalBedsByRequestedTime),
    casesForICUByRequestedTime: Math.trunc(casesForICUByRequestedTime),
    casesForVentilatorsByRequestedTime: Math.trunc(casesForVentilatorsByRequestedTime),
    dollarsInFlight: Math.trunc(dollarsInFlight)
  };
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: impact(data),
  severeImpact: severeImpact(data)
});

export default covid19ImpactEstimator;
