'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    // seeding posts for 10 blogs
    for (var i = 1; i <= 10; i++) {
      seedArr.push({
        BlogId: i,
        loadSequence: 2,
        textContent: '{"blocks":[{"key":"dhq60","text":"Visiting India had been my goal since a long time ago. Everyone had been discouraging me to go to India based on their impression that it’s especially unsafe for female travellers. I mean, I know so many female travellers who visit India alone. I would not say India is 100% safe, but then again which part of this world is guaranteed to be safe? Nothing should stop you from exploring places as long as you plan well and know what you are doing. It would be best if you have someone to travel with you should you be concerned about traveling alone.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4ep2t","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1l0pu","text":"I first heard about Ladakh two years ago from my good friend KW. We agreed to make it happen this year. Unfortunately, just a month before the trip, KW had to stand us up because of his work schedule. Eventually it became a duo trip of just me and ST, which was a new experience! Haha.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8r73d","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8e8l1","text":"We had only 9 days and the highlight of the trip was Ladakh. We didn’t think it was possible to include Jaipur and Taj Mahal in our initial plan due to our short travel period, but because I insisted (HAHA), it took me almost a week to come out with the following itinerary, which then unexpectedly gave us an extra day at the end (read on to find out how we earned the extra day).","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        title: 'Seeded Post Title',
        currency: 'SGD',
        cost: 100,
        bookingService: 'www.marinabaysands.sg',
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        loadSequence: 4,
        textContent: '{"blocks":[{"key":"dhq60","text":"Visiting India had been my goal since a long time ago. Everyone had been discouraging me to go to India based on their impression that it’s especially unsafe for female travellers. I mean, I know so many female travellers who visit India alone. I would not say India is 100% safe, but then again which part of this world is guaranteed to be safe? Nothing should stop you from exploring places as long as you plan well and know what you are doing. It would be best if you have someone to travel with you should you be concerned about traveling alone.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4ep2t","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1l0pu","text":"I first heard about Ladakh two years ago from my good friend KW. We agreed to make it happen this year. Unfortunately, just a month before the trip, KW had to stand us up because of his work schedule. Eventually it became a duo trip of just me and ST, which was a new experience! Haha.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8r73d","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8e8l1","text":"We had only 9 days and the highlight of the trip was Ladakh. We didn’t think it was possible to include Jaipur and Taj Mahal in our initial plan due to our short travel period, but because I insisted (HAHA), it took me almost a week to come out with the following itinerary, which then unexpectedly gave us an extra day at the end (read on to find out how we earned the extra day).","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        title: 'Another Post title',
        eventType: 'Sight-seeing',
        bucketCategory: 'Activity',
        startDay: 1,
        currency: 'USD',
        cost: 80.50,
        bookingService: 'www.airbnb.com.sg',
        LocationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      seedArr.push({
        BlogId: i,
        loadSequence: 5,
        textContent: '{"blocks":[{"key":"dhq60","text":"Visiting India had been my goal since a long time ago. Everyone had been discouraging me to go to India based on their impression that it’s especially unsafe for female travellers. I mean, I know so many female travellers who visit India alone. I would not say India is 100% safe, but then again which part of this world is guaranteed to be safe? Nothing should stop you from exploring places as long as you plan well and know what you are doing. It would be best if you have someone to travel with you should you be concerned about traveling alone.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4ep2t","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1l0pu","text":"I first heard about Ladakh two years ago from my good friend KW. We agreed to make it happen this year. Unfortunately, just a month before the trip, KW had to stand us up because of his work schedule. Eventually it became a duo trip of just me and ST, which was a new experience! Haha.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8r73d","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8e8l1","text":"We had only 9 days and the highlight of the trip was Ladakh. We didn’t think it was possible to include Jaipur and Taj Mahal in our initial plan due to our short travel period, but because I insisted (HAHA), it took me almost a week to come out with the following itinerary, which then unexpectedly gave us an extra day at the end (read on to find out how we earned the extra day).","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        title: 'Yet another post title',
        eventType: 'Hiking',
        bucketCategory: 'Location',
        startDay: 1,
        LocationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Posts', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Posts', null, {})
  }
}
