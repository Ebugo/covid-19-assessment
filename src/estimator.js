/* eslint-disable linebreak-style */
let numOfDays;
let factor;
const percentage = (num, percent) => ((num / 100) * percent);
const resultDiv = document.getElementById('result');

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

const onViewEstimate = () => {
  resultDiv.innerHTML = `
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  `;
  const result = covid19ImpactEstimator();

  resultDiv.innerHTML = `
    <div class="list-group-item clearfix">
      <strong class="list-group-item-heading">Impact Data - </strong><br><br>
      <p>Currently Infected = ${ result.impact.currentlyInfected }</p>
      <p>Infections By Requested Time = ${ result.impact.infectionsByRequestedTime }</p>
      <p>Severe Cases By Requested Time = ${ result.impact.severeCasesByRequestedTime }</p>
      <p>Hospital Beds By Requested Time = ${ result.impact.hospitalBedsByRequestedTime }</p>
      <p>Cases For ICU By Requested Time = ${ result.impact.casesForICUByRequestedTime }</p>
      <p>Cases For Ventilators By Requested Time = ${ result.impact.casesForVentilatorsByRequestedTime }</p>
      <p>Dollars In Flight = ${ result.impact.dollarsInFlight }</p>
    </div>
    <div class="list-group-item clearfix">
      <strong class="list-group-item-heading">Severe Data - </strong><br><br>
      <p>Currently Infected = ${ result.severeImpact.currentlyInfected }</p>
      <p>Infections By Requested Time = ${ result.severeImpact.infectionsByRequestedTime }</p>
      <p>Severe Cases By Requested Time = ${ result.severeImpact.severeCasesByRequestedTime }</p>
      <p>Hospital Beds By Requested Time = ${ result.severeImpact.hospitalBedsByRequestedTime }</p>
      <p>Cases For ICU By Requested Time = ${ result.severeImpact.casesForICUByRequestedTime }</p>
      <p>Cases For Ventilators By Requested Time = ${ result.severeImpact.casesForVentilatorsByRequestedTime }</p>
      <p>Dollars In Flight = ${ result.severeImpact.dollarsInFlight }</p>
    </div>
  `
}

const onReset = () => {
  resultDiv.innerHTML = `
    <span>No estimate yet.</span>
  `
}

export default covid19ImpactEstimator;
