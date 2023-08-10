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

module.exports = { getDaysArray };
