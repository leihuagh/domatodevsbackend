'use strict'
// const casual = require('casual')

var location1 = {
  CountryId: 200,
  verified: true,
  placeId: 'ChIJ483Qk9YX2jERA0VOQV7d1tY',
  name: 'Singapore Changi Airport',
  address: 'Airport Boulevard, Singapore',
  telephone: '+65 6595 6868',
  latitude: 1.3644202,
  longitude: 103.9915308,
  utcOffset: 480,
  openingHours: JSON.stringify([{open: {day: 0, time: '0000'}}]),
  openingHoursText: JSON.stringify([
    'Monday: Open 24 hours',
    'Tuesday: Open 24 hours',
    'Wednesday: Open 24 hours',
    'Thursday: Open 24 hours',
    'Friday: Open 24 hours',
    'Saturday: Open 24 hours',
    'Sunday: Open 24 hours'
  ]),
  imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipNnHWWvYGWLjprsAVgRY2d-MONTg_dDzvQTgcOG=w200-k'
}
var location2 = {
  CountryId: 135,
  verified: true,
  placeId: 'ChIJERKi1IC_zTERC_q1Z7t4J5g',
  name: 'Kuala Lumpur International Airport',
  address: '64000 Sepang, Selangor, Malaysia',
  telephone: '+60 3 2000-8776',
  latitude: 2.7350439,
  longitude: 101.7010435,
  utcOffset: 480,
  openingHours: JSON.stringify([{open: {day: 0, time: '0000'}}]),
  openingHoursText: JSON.stringify([
    'Monday: Open 24 hours',
    'Tuesday: Open 24 hours',
    'Wednesday: Open 24 hours',
    'Thursday: Open 24 hours',
    'Friday: Open 24 hours',
    'Saturday: Open 24 hours',
    'Sunday: Open 24 hours'
  ]),
  imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipO6HVtRN8bFWhUmCnJ5-RN2zBYukiGuWmyC2Enk=w200-k'
}
var location3 = {
  CountryId: 119,
  verified: true,
  placeId: 'ChIJWfpeOoOaezUR1L5cy5agS40',
  name: 'Incheon International Airport',
  address: '272 Gonghang-ro, Jung-gu, Incheon, South Korea',
  telephone: '(+82) 1577-2600',
  latitude: 37.4601908,
  longitude: 126.44069569999999,
  utcOffset: 540,
  openingHours: null,
  openingHoursText: null,
  imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipMtGRXJbYKJlmF8A0Pbh1YbCj-NuhYBZ0ynoM_I=w200-k'
}
var location4 = {
  CountryId: 119,
  verified: true,
  placeId: 'ChIJK_gSweWifDURQr02_87Rayw',
  name: 'Lotte City Hotel Myeongdong',
  address: '362 Samil-daero, Myeong-dong, Jung-gu, Seoul, South Korea',
  telephone: '(+82) 2-6112-1000',
  latitude: 37.5669163,
  longitude: 126.98797850000005,
  utcOffset: 540,
  openingHours: null,
  openingHoursText: null,
  imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipNzZakD1Nc4KldwdnqW3Dtvwxwoh39fXvxZ9up4=w200-k'
}
var location5 = {
  CountryId: 119,
  verified: true,
  placeId: 'ChIJ1w5MZ-WifDUR4eOq20PjdpM',
  name: 'MyeongDong Croquette 32G',
  address: '83 Myeongdong-gil, Jeodong 1(il)-ga, Jung-gu, Seoul, South Korea',
  telephone: '(+82) 2-777-7376',
  latitude: 37.5644811,
  longitude: 126.98669480000001,
  utcOffset: 540,
  openingHours: JSON.stringify([
    {open: {day: 0, time: '0900'}, close: {day: 0, time: '1200'}},
    {open: {day: 2, time: '0900'}, close: {day: 2, time: '1200'}},
    {open: {day: 3, time: '0900'}, close: {day: 3, time: '1200'}},
    {open: {day: 4, time: '0900'}, close: {day: 4, time: '1200'}},
    {open: {day: 5, time: '0900'}, close: {day: 5, time: '1200'}},
    {open: {day: 6, time: '0900'}, close: {day: 6, time: '1200'}}
  ]),
  openingHoursText: JSON.stringify([
    'Monday: Closed',
    'Tuesday: 9:00 am – 12:00 pm',
    'Wednesday: 9:00 am – 12:00 pm',
    'Thursday: 9:00 am – 12:00 pm',
    'Friday: 9:00 am – 12:00 pm',
    'Saturday: 9:00 am – 12:00 pm',
    'Sunday: 9:00 am – 12:00 pm'
  ]),
  imageUrl: null
}
var location6 = {
  CountryId: 119,
  verified: true,
  placeId: 'ChIJqxQ_G_GifDURDI7jheBrQzs',
  name: 'Myeong-dong',
  address: 'Myeong-dong, Jung-gu, Seoul, South Korea',
  telephone: null,
  latitude: 37.55997999999999,
  longitude: 126.98582959999999,
  utcOffset: 540,
  openingHours: null,
  openingHoursText: null,
  imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipOU-XrQBXA8-Zj7H2oa5_air8zwF2WJ0YBBKrlK=w200-k'
}
var location7 = {
  CountryId: 119,
  verified: true,
  placeId: 'ChIJ61qvjvCifDURsgRneJ9Fsg0',
  name: 'Myeongdong Underground Shopping Area',
  address: 'South Korea, Seoul, Jung-gu, Chungmuro 2(i)-ga, 65-9 -ga',
  telephone: null,
  latitude: 37.561131,
  longitude: 126.98535830000003,
  utcOffset: 540,
  openingHours: JSON.stringify([
    {open: {day: 0, time: '1000'}, close: {day: 0, time: '2300'}},
    {open: {day: 1, time: '1000'}, close: {day: 1, time: '2300'}},
    {open: {day: 2, time: '1000'}, close: {day: 2, time: '2300'}},
    {open: {day: 3, time: '1000'}, close: {day: 3, time: '2300'}},
    {open: {day: 4, time: '1000'}, close: {day: 4, time: '2300'}},
    {open: {day: 5, time: '1000'}, close: {day: 5, time: '2300'}},
    {open: {day: 6, time: '1000'}, close: {day: 6, time: '2300'}}
  ]),
  openingHoursText: JSON.stringify([
    'Monday: 10:00 am – 11:00 pm',
    'Tuesday: 10:00 am – 11:00 pm',
    'Wednesday: 10:00 am – 11:00 pm',
    'Thursday: 10:00 am – 11:00 pm',
    'Friday: 10:00 am – 11:00 pm',
    'Saturday: 10:00 am – 11:00 pm',
    'Sunday: 10:00 am – 11:00 pm'
  ]),
  imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipMuF82Qmq9Z201EIcXx6SVYi0Z_sO_Vxs1Q_J37=w200-k'
}
var location8 = {
  CountryId: 119,
  verified: true,
  placeId: 'ChIJ1Y4f-PGifDURo2AFC7eDnCY',
  name: 'Lotteria',
  address: '81 Namdaemun-ro, Euljiro 1(il)-ga, Jung-gu, Seoul, South Korea',
  telephone: '(+82) 2-756-7858',
  latitude: 37.56514620000001,
  longitude: 126.98171920000004,
  utcOffset: 540,
  openingHours: JSON.stringify([
    {open: {day: 0, time: '0800'}, close: {day: 0, time: '2100'}},
    {open: {day: 1, time: '0800'}, close: {day: 1, time: '2100'}},
    {open: {day: 2, time: '0800'}, close: {day: 2, time: '2100'}},
    {open: {day: 3, time: '0800'}, close: {day: 3, time: '2100'}},
    {open: {day: 4, time: '0800'}, close: {day: 4, time: '2100'}},
    {open: {day: 5, time: '0800'}, close: {day: 5, time: '2100'}},
    {open: {day: 6, time: '0800'}, close: {day: 6, time: '2100'}}
  ]),
  openingHoursText: JSON.stringify([
    'Monday: 8:00 am – 9:00 pm',
    'Tuesday: 8:00 am – 9:00 pm',
    'Wednesday: 8:00 am – 9:00 pm',
    'Thursday: 8:00 am – 9:00 pm',
    'Friday: 8:00 am – 9:00 pm',
    'Saturday: 8:00 am – 9:00 pm',
    'Sunday: 8:00 am – 9:00 pm'
  ]),
  imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipPTWEl81aanh8TyQte73giYSeUOFzN3a3HCr4Yd=w200-k'
}
var location9 = {
  CountryId: 119,
  verified: true,
  placeId: 'ChIJp67IMGeifDURYdGoC7xacH0',
  name: 'Seoul Station',
  address: '378 Cheongpa-ro, Dongja-dong, Yongsan-gu, 서울특별시 South Korea',
  telephone: null,
  latitude: 37.553577,
  longitude: 126.97386800000004,
  utcOffset: 540,
  openingHours: null,
  openingHoursText: null,
  imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipMKFrNdgVY0Nd0_xIu9qH5qCHqCENbPjvUlXxjP=w200-k'
}
var location10 = {
  CountryId: 119,
  verified: true,
  placeId: 'ChIJVZuLL33paDUR9rDfjolmUXI',
  name: 'Busan Station',
  address: 'Jungang-daero, Choryang 3(sam)-dong, Dong-gu, 부산광역시 South Korea',
  telephone: '(+82) 1544-7788',
  latitude: 35.114512,
  longitude: 129.039356,
  utcOffset: 540,
  openingHours: null,
  openingHoursText: null,
  imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipOcqRTzEwfYCEa5FF6cScoWaK6J53ZHmVdDJUJ0=w200-k'
}

var seedArr = [location1, location2, location3, location4, location5, location6, location7, location8, location9, location10]

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Locations', seedArr, {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Locations', null, {})
  }
}
