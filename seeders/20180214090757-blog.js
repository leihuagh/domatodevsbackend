'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    // making 10 seeded blogs for display in landing page
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        UserId: `auth0|5ab1dce98bd5067ff5786507`,
        title: `Seeded Blog ${i}`,
        published: true,
        views: 0,
        shares: 0,
        days: 3,
        textContent: 'Visiting India had been my goal since a long time ago. Everyone had been discouraging me to go to India based on their impression that it\'s especially unsafe for female travellers. I mean, I know so many female travellers who visit India alone. I would not say India is 100% safe, but then again which part of this world is guaranteed to be safe? Nothing should stop you from exploring places as long as you plan well and know what you are doing. It would be best if you have someone to travel with you should you be concerned about traveling alone.\n\nI first heard about Ladakh two years ago from my good friend KW. We agreed to make it happen this year. Unfortunately, just a month before the trip, KW had to stand us up because of his work schedule. Eventually it became a duo trip of just me and ST, which was a new experience! Haha.\n\nWe had only 9 days and the highlight of the trip was Ladakh. We didn\'t think it was possible to include Jaipur and Taj Mahal in our initial plan due to our short travel period, but because I insisted (HAHA), it took me almost a week to come out with the following itinerary, which then unexpectedly gave us an extra day at the end (read on to find out how we earned the extra day).',
        createdAt: new Date(),
        publishDate: new Date(2018, 3, i + 1) // (i + 1)th april. 2nd to 11th april
        // ItineraryId: 1
      })
    }
    return queryInterface.bulkInsert('Blogs', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Blogs', null, {})
  }
}
