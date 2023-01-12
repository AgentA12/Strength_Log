function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatDate(date) {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

/**
 * Gets the 1RM for given lift and formats into string
 * @param {Number} weight
 * @param {Number} repetitions
 * @returns String
 */

function getOneRepMax(weight, repetitions) {
  const oneRepMax = weight / [1.0278 - 0.0278 * repetitions];

  return `${Math.round(oneRepMax * 10) / 10} Lbs`;
}

export {formatDate, getOneRepMax, capitalizeFirstLetter}
