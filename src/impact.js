/* eslint-disable linebreak-style */
const percentage = (num, percent) => Math.round((num / 100) * percent);

const impact = (data) => {
  const avgIncomePopulation = data.avgDailyIncomePopulation;
  const avgIncome = data.avgDailyIncomeInUSD;

  if (data.periodType == 'days') {
    const factor = Math.round(data.timeToElapse / 3);
  } else if (data.periodType == 'weeks') {
    const factor = Math.round((data.timeToElapse * 7)/ 3);
  } else if (data.periodType == 'months') {
    const factor = Math.round((data.timeToElapse * 28) / 3);
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
  const dollarsInFlight = (infectionsByRequestedTime * avgIncomePopulation) * avgIncome * 30;

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

export default impact;
