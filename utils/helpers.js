module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  eq: (a, b) => {
    console.log(`${a}, ${b}`)
    return a === b;
  }
};
