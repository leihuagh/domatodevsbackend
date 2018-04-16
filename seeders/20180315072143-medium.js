'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    let medium1 = {
      AlbumId: 1,
      type: 'Photo',
      imageUrl: 'https://images.pexels.com/photos/683419/pexels-photo-683419.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
    }
    let medium2 = {
      AlbumId: 1,
      type: 'Photo',
      imageUrl: 'https://images.pexels.com/photos/752398/pexels-photo-752398.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
    }
    let medium3 = {
      AlbumId: 1,
      type: 'Photo',
      imageUrl: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1448251825000/photosp/d9727beb-153c-4c22-b059-366e871d4f30/stock-photo-animal-dog-love-cute-pet-colorado-person-dogs-bestfriend-d9727beb-153c-4c22-b059-366e871d4f30.jpg'
    }
    let medium4 = {
      AlbumId: 2,
      type: 'Photo',
      imageUrl: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1460299380000/photosp/645bd5ce-cd44-4d90-9bfe-81e4fb72d261/stock-photo-grass-elephant-grassland-thailand-elephants-grasses-grassy-tall-grass-grasslands-645bd5ce-cd44-4d90-9bfe-81e4fb72d261.jpg'
    }
    let medium5 = {
      AlbumId: 2,
      type: 'Photo',
      imageUrl: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1453771956000/photosp/1134bbb7-857b-4812-af0b-1867d0aa5148/stock-photo-baby-mother-parent-mom-computer-work-motherhood-parenthood-multitasking-1134bbb7-857b-4812-af0b-1867d0aa5148.jpg'
    }
    let medium6 = {
      AlbumId: 2,
      type: 'Photo',
      imageUrl: 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
    }
    let video1 = {
      AlbumId: 1,
      type: 'Youtube',
      imageUrl: 'http://img.youtube.com/vi/65ks-4I7BBQ/0.jpg',
      youtubeUrl: 'https://www.youtube.com/embed/65ks-4I7BBQ'
    }
    seedArr = [
      video1,
      medium1, medium2, medium3, medium4, medium5, medium6,
      medium1, medium2, medium3, medium4, medium5, medium6,
      medium1, medium2, medium3, medium4, medium5, medium6,
      medium1, medium2, medium3, medium4, medium5, medium6,
      medium1, medium2, medium3, medium4, medium5, medium6,
      medium1, medium2, medium3, medium4, medium5, medium6,
      medium1, medium2, medium3, medium4, medium5, medium6
    ]
    return queryInterface.bulkInsert('Media', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Media', null, {})
  }
}
