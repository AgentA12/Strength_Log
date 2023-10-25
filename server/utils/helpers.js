function getDaysArray(start, end, range) {
  for (
    var a = [], d = new Date(start);
    d <= new Date(end);
    d.setDate(d.getDate() + range)
  ) {
    a.push(new Date(d));
  }
  return a;
}

const getOneRepMax = (weight, repetitions) =>
  Math.round(Math.round((weight / [1.0278 - 0.0278 * repetitions]) * 10) / 10)

module.exports = { getDaysArray, getOneRepMax };
