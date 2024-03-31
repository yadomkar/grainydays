function formatReleaseDate(dateString) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  return year.toString();
}

module.exports = { formatReleaseDate };
