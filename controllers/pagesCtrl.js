// Index
const home = (req, res) => {
  if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/pantry`);
  } else {
    res.render("index.ejs");
  }
};
// Export

module.exports = { home };
