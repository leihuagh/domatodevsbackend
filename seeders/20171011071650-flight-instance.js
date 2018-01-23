'use strict'
const casual = require('casual')
const faker = require('faker')

module.exports = {
  up: function (queryInterface, Sequelize) {
    var seedArr = []
    for (var i = 1; i <= 50; i++) {
      seedArr.push({
        FlightBookingId: i,
        flightNumber: 1234,
        airlineCode: 'JS',
        airlineName: 'Seeded Airline - Air Koryo',
        departureIATA: 'SIN',
        arrivalIATA: 'ICN',
        departureCityCountry: 'Singapore, Singapore',
        arrivalCityCountry: 'Seoul, South Korea',
        DepartureLocationId: i,
        ArrivalLocationId: Math.floor(Math.random() * 50) + 1,
        departureTerminal: `Terminal ${Math.floor(Math.random() * 4) + 1}`,
        arrivalTerminal: `Terminal ${Math.floor(Math.random() * 4) + 1}`,
        departureGate: `Gate ${Math.floor(Math.random() * 10) + 1}`,
        arrivalGate: `Gate ${Math.floor(Math.random() * 10) + 1}`,
        startDay: 1,
        endDay: 2,
        startLoadSequence: 4,
        endLoadSequence: 1,
        startTime:  79200, // 10pm flight overnight
        endTime: 21600, // 6am arrival
        durationMins: 480,
        notes: casual.sentences(3),
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
        departureCityCountry: 'Seoul, South Korea',
        arrivalCityCountry: 'Singapore, Singapore',
        DepartureLocationId: Math.floor(Math.random() * 50) + 1,
        ArrivalLocationId: i,
        departureTerminal: 'Terminal 2',
        arrivalTerminal: 'Terminal 4',
        departureGate: 'Gate 11',
        arrivalGate: 'Gate 13',
        startDay: 6,
        endDay: 6,
        startLoadSequence: 2,
        endLoadSequence: 3,
        startTime: 50400,
        endTime: 72600,
        durationMins: 370,
        notes: 'Flying back from incheon to changi',
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
