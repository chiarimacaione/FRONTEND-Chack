import images from './images';

const getRandomImage = () => {
    if (!images || images.length === 0) {
        return "/img-WS/Team Hub.jpg"; 
    }
    const randomIndex = Math.floor(Math.random() * images.length)
    return images[randomIndex];
};

export default getRandomImage;
