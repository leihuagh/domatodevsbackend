'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    var seedArr = []
    let photo1 = {
      AlbumId: 1,
      type: 'Photo',
      imageUrl: 'https://images.pexels.com/photos/683419/pexels-photo-683419.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
    }
    let photo2 = {
      AlbumId: 1,
      type: 'Photo',
      imageUrl: 'https://images.pexels.com/photos/752398/pexels-photo-752398.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
    }
    let photo3 = {
      AlbumId: 1,
      type: 'Photo',
      imageUrl: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1448251825000/photosp/d9727beb-153c-4c22-b059-366e871d4f30/stock-photo-animal-dog-love-cute-pet-colorado-person-dogs-bestfriend-d9727beb-153c-4c22-b059-366e871d4f30.jpg'
    }
    let photo4 = {
      AlbumId: 1,
      type: 'Photo',
      imageUrl: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1460299380000/photosp/645bd5ce-cd44-4d90-9bfe-81e4fb72d261/stock-photo-grass-elephant-grassland-thailand-elephants-grasses-grassy-tall-grass-grasslands-645bd5ce-cd44-4d90-9bfe-81e4fb72d261.jpg'
    }
    let photo5 = {
      AlbumId: 1,
      type: 'Photo',
      imageUrl: 'https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1453771956000/photosp/1134bbb7-857b-4812-af0b-1867d0aa5148/stock-photo-baby-mother-parent-mom-computer-work-motherhood-parenthood-multitasking-1134bbb7-857b-4812-af0b-1867d0aa5148.jpg'
    }
    let photo6 = {
      AlbumId: 1,
      type: 'Photo',
      imageUrl: 'https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
    }
    let photo7 = {
      AlbumId: 2,
      type: 'Photo',
      imageUrl: 'https://www.nationalgeographic.com/content/dam/travel/2017-digital/destination-hubs/01_Japan.jpg'
    }
    let photo8 = {
      AlbumId: 2,
      type: 'Photo',
      imageUrl: 'https://www.seejapan.co.uk/images/default-source/Navigation-images/regions9e6a95af34276b59b272ff0000f5e96d.tmb-c640-390.jpg?sfvrsn=1'
    }
    let photo9 = {
      AlbumId: 2,
      type: 'Photo',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-mTB3vywriHL15kxi94TXuj1EZ_JBpnOVw0eJPlYljdd0CBqU'
    }
    let photo10 = {
      AlbumId: 2,
      type: 'Photo',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqo_KvY12UvsDQG34dIzapJ_0DBV4UlpqEibqZPQKkWdg89HrW'
    }
    let photo11 = {
      AlbumId: 2,
      type: 'Photo',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxtA8hbJqGRR9WuDzr0Kyfb-GD5lNLwpCQ5GfWOu8JT01nadGtrA'
    }
    let photo12 = {
      AlbumId: 2,
      type: 'Photo',
      imageUrl: 'https://www.beautifullytravelled.com/wp-content/uploads/2016/08/Austria-or-Switzerland-Which-country-should-you-visit-for-the-perfect-Alpine-holiday-Austria-2.jpg'
    }
    let video1 = {
      AlbumId: 1,
      type: 'Youtube',
      imageUrl: 'http://img.youtube.com/vi/VPLK-juhDSM/0.jpg',
      youtubeUrl: 'https://www.youtube.com/embed/VPLK-juhDSM'
    }
    let video2 = {
      AlbumId: 1,
      type: 'Youtube',
      imageUrl: 'http://img.youtube.com/vi/zdOVpw1CIs4/0.jpg',
      youtubeUrl: 'https://www.youtube.com/embed/zdOVpw1CIs4'
    }
    let video3 = {
      AlbumId: 1,
      type: 'Youtube',
      imageUrl: 'http://img.youtube.com/vi/-0xdoDzhfwY/0.jpg',
      youtubeUrl: 'https://www.youtube.com/embed/-0xdoDzhfwY'
    }
    let video4 = {
      AlbumId: 2,
      type: 'Youtube',
      imageUrl: 'http://img.youtube.com/vi/f13X2hLYAhk/0.jpg',
      youtubeUrl: 'https://www.youtube.com/embed/f13X2hLYAhk'
    }
    let video5 = {
      AlbumId: 2,
      type: 'Youtube',
      imageUrl: 'http://img.youtube.com/vi/gQaOSggFKQI/0.jpg',
      youtubeUrl: 'https://www.youtube.com/embed/gQaOSggFKQI'
    }
    let video6 = {
      AlbumId: 2,
      type: 'Youtube',
      imageUrl: 'http://img.youtube.com/vi/eKw0a9OUE6I/0.jpg',
      youtubeUrl: 'https://www.youtube.com/embed/eKw0a9OUE6I'
    }
    seedArr = [
      photo1, photo2, photo3, photo4, photo5, photo6,
      photo7, photo8, photo9, photo10, photo11, photo12,
      video1, video2, video3, video4, video5, video6
    ]
    return queryInterface.bulkInsert('Media', seedArr, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Media', null, {})
  }
}
