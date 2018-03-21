'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    seedArr.push({
      type: 'Photo',
      url: 'https://images.pexels.com/photos/683419/pexels-photo-683419.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
    })
    seedArr.push({
      type: 'Photo',
      url: 'https://images.pexels.com/photos/752398/pexels-photo-752398.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
    })
    seedArr.push({
      type: 'Photo',
      url: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1448251825000/photosp/d9727beb-153c-4c22-b059-366e871d4f30/stock-photo-animal-dog-love-cute-pet-colorado-person-dogs-bestfriend-d9727beb-153c-4c22-b059-366e871d4f30.jpg'
    })
    seedArr.push({
      type: 'Photo',
      url: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1460299380000/photosp/645bd5ce-cd44-4d90-9bfe-81e4fb72d261/stock-photo-grass-elephant-grassland-thailand-elephants-grasses-grassy-tall-grass-grasslands-645bd5ce-cd44-4d90-9bfe-81e4fb72d261.jpg'
    })
    seedArr.push({
      type: 'Photo',
      url: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1453771956000/photosp/1134bbb7-857b-4812-af0b-1867d0aa5148/stock-photo-baby-mother-parent-mom-computer-work-motherhood-parenthood-multitasking-1134bbb7-857b-4812-af0b-1867d0aa5148.jpg'
    })
    seedArr.push({
      type: 'Photo',
      url: 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
    })
    return queryInterface.bulkInsert('Media', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Media', null, {})
  }
}
