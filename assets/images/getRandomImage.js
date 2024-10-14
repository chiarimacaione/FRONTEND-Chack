import images from './images'

const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length)
    return images[randomIndex]
}

export default getRandomImage
