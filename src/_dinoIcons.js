require.context('./icons', false, /\.(png|jpe?g|svg)$/)

// import all dino icons into one object dinos
function importAll(r) {
    let images = {};
     r.keys().forEach((item, index) => { images[index] = r(item); });
    return images
   }

const dinoIcons = importAll(require.context('./icons', false, /\.(png|jpe?g|svg)$/));

export default dinoIcons