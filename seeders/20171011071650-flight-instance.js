'use strict'
const casual = require('casual')

/*
for (var i = 1; i <= 50; i++) {
  seedArr.push({
    FlightBookingId: i,
    flightNumber: 1234,
    airlineCode: 'JS',
    airlineName: 'Seeded Airline - Air Koryo',
    departureIATA: 'SIN',
    arrivalIATA: 'ICN',
    departureAirport: 'Changi International Airport',
    arrivalAirport: 'Incheon International Airport',
    departureCityCountry: 'Singapore, Singapore',
    arrivalCityCountry: 'Seoul, South Korea',
    DepartureLocationId: 6,
    ArrivalLocationId: 7,
    departureTerminal: `${Math.floor(Math.random() * 4) + 1}`,
    arrivalTerminal: `${Math.floor(Math.random() * 4) + 1}`,
    startDay: 1,
    endDay: 2,
    startLoadSequence: 4,
    endLoadSequence: 1,
    startTime: 79200, // 10pm flight overnight
    endTime: 21600, // 6am arrival
    durationMins: 480,
    departureNotes: casual.sentences(3),
    arrivalNotes: casual.sentences(3),
    firstFlight: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    FlightBookingId: i,
    flightNumber: 5678,
    airlineCode: 'JS',
    airlineName: 'Seeded Airline - Air Korea',
    departureIATA: 'ICN',
    arrivalIATA: 'SIN',
    departureAirport: 'Incheon International Airport',
    arrivalAirport: 'Changi International Airport',
    departureCityCountry: 'Seoul, South Korea',
    arrivalCityCountry: 'Singapore, Singapore',
    DepartureLocationId: 8,
    ArrivalLocationId: 9,
    departureTerminal: '2',
    arrivalTerminal: '4',
    startDay: 6,
    endDay: 6,
    startLoadSequence: 2,
    endLoadSequence: 3,
    startTime: 50400,
    endTime: 72600,
    durationMins: 370,
    departureNotes: casual.sentences(3),
    arrivalNotes: casual.sentences(3),
    firstFlight: false,
    createdAt: new Date(),
    updatedAt: new Date()
  })
*/
module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i ++) {
      seedArr.push({
        FlightBookingId: i,
        flightNumber: 'AK706',
        airlineCode: 'JS',
        airlineName: 'Air Koryo',
        departureIATA: 'SIN',
        arrivalIATA: 'KUL',
        departureAirport: 'Singapore Changi Airport',
        arrivalAirport: 'Kuala Lumpur International Airport',
        departureCityCountry: 'Singapore, Singapore',
        arrivalCityCountry: 'Kuala Lumpur, Malaysia',
        DepartureLocationId: 1,
        ArrivalLocationId: 2,
        departureTerminal: '2',
        arrivalTerminal: '1',
        startDay: 1,
        endDay: 1,
        startLoadSequence: 1,
        endLoadSequence: 2,
        startTime: 22800,
        endTime: 30600,
        durationMins: 120,
        departureNotes: casual.sentences(3),
        arrivalNotes: casual.sentences(3),
        firstFlight: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        FlightBookingId: i,
        flightNumber: 'D7508',
        airlineCode: 'JS',
        airlineName: 'Air Koryo',
        departureIATA: 'KUL',
        arrivalIATA: 'ICN',
        departureAirport: 'Kuala Lumpur International Airport',
        arrivalAirport: 'Incheon International Airport',
        departureCityCountry: 'Kuala Lumpur, Malaysia',
        arrivalCityCountry: 'Seoul, Korea',
        DepartureLocationId: 2,
        ArrivalLocationId: 3,
        departureTerminal: '1',
        arrivalTerminal: '5',
        startDay: 1,
        endDay: 1,
        startLoadSequence: 3,
        endLoadSequence: 4,
        startTime: 34200,
        endTime: 63000,
        durationMins: 390, // 6.5 hrs
        departureNotes: casual.sentences(3),
        arrivalNotes: casual.sentences(3),
        firstFlight: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('FlightInstances', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('FlightInstances', null, {})
  }
}
