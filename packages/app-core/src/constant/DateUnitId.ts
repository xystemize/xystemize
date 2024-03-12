export enum DateUnitId {
  Milliseconds = 1,
  Seconds,
  Minutes,
  Hours,
  Days,
  Weeks,
  Months,
  Years,
  Lifetime,
}

export enum DateUnit {
  Millisecond = 'millisecond',
  Milliseconds = 'milliseconds',
  Second = 'second',
  Seconds = 'seconds',
  Minute = 'minute',
  Minutes = 'minutes',
  Hour = 'hour',
  Hours = 'hours',
  Date = 'date',
  Day = 'day',
  Days = 'days',
  Week = 'week',
  Weeks = 'weeks',
  Month = 'month',
  Months = 'months',
  Year = 'year',
  Years = 'years',
}

export const DateUnitIdToUnit = Object.freeze({
  [DateUnitId.Minutes]: DateUnit.Minutes,
  [DateUnitId.Hours]: DateUnit.Hours,
  [DateUnitId.Days]: DateUnit.Days,
  [DateUnitId.Months]: DateUnit.Months,
  [DateUnitId.Years]: DateUnit.Years,
});
