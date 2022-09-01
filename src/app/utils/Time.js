import React from "react";
import strftime from "./strftime";

const defaultFormat = "%B %e, %Y, %l:%M %p";
const defaultDateFormat = "%B %e, %Y";

export const formatDate = (time, format = defaultDateFormat) => {
  const now = new Date();
  const then = new Date(time);

  if (now.getFullYear() === then.getFullYear()) {
    return strftime(time, format.replace("%Y, ", ""));
  }

  return strftime(time, format);
};

const formatTime = (time, format, keepYear = false) => {
  const now = new Date();
  const then = new Date(time);

  if (now.getFullYear() === then.getFullYear() && !keepYear) {
    return strftime(time, format.replace("%Y, ", ""));
  }

  return strftime(time, format);
};

const formatYearsUnitDiff = (years, months) => {
  const suffix = Math.abs(years) !== 1 ? "s" : "";
  const monthsCurrentYear = months - years * 12;
  const monthSuffix = monthsCurrentYear !== 1 ? "s" : "";

  if (years < 0) {
    return `in ${years * -1} year${suffix}`;
  }
  const monthsLabel = monthsCurrentYear > 0 ? `${monthsCurrentYear} month${monthSuffix}` : "";

  return `${years} year${suffix}${
    monthsCurrentYear > 0 ? `, ${monthsLabel}` : ""
  }`;
};

const formatUnitDiff = (number, unit) => {
  const suffix = Math.abs(number) !== 1 ? "s" : "";

  if (number < 0) {
    return `in ${number * -1} ${unit}${suffix}`;
  }
  return `${number} ${unit}${suffix} ago`;
};

const formatTimeDiff = (time, format) => {
  if (!time) {
    return null;
  }

  const seconds = (+new Date() - +new Date(time)) / 1000;
  if (seconds >= 0 && seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);
  if (Math.abs(minutes) < 60) {
    return formatUnitDiff(minutes, "minute");
  }

  const hours = Math.floor(minutes / 60);
  if (Math.abs(hours) < 24) {
    return formatUnitDiff(hours, "hour");
  }

  return formatTime(time, format);
};

export const getTimeDiff = time => {
  if (!time) {
    return null;
  }

  const seconds = (+new Date() - +new Date(time)) / 1000;
  if (seconds >= 0 && seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);
  if (Math.abs(minutes) < 60) {
    return formatUnitDiff(minutes, "minute");
  }

  const hours = Math.floor(minutes / 60);
  if (Math.abs(hours) < 24) {
    return formatUnitDiff(hours, "hour");
  }

  const days = Math.floor(hours / 24);
  if (Math.abs(hours) < 30) {
    return formatUnitDiff(days, "day");
  }

  const months = Math.floor(days / 30);
  if (Math.abs(months) < 12) {
    return formatUnitDiff(months, "month");
  }

  const years = Math.floor(months / 12);
  return formatYearsUnitDiff(years, months);
};

export const DateFormat = ({ time, format = defaultDateFormat }) => (
  <>{formatDate(time, format)}</>
);

export const Time = ({ time, format = defaultFormat, keepYear = false }) => (
  <>{formatTime(time, format, keepYear)}</>
);

export const TimeDiff = ({ time, format = defaultFormat }) => (
  <>{formatTimeDiff(time, format)}</>
);

export const TimeDiffYears = ({ time }) => <>{getTimeDiff(time)}</>;
