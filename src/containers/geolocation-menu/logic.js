const geolocationAPI = navigator.geolocation;

let userCoordinates = new Promise((resolve, reject) => {
    geolocationAPI.getCurrentPosition((position) => {
        console.log("position: ", position.coords);
        resolve(position.coords);
    }, (error) => {
        reject(error);
    });
});



export async function getUserCoordinates(){
    userCoordinates = await userCoordinates;
    console.log("in getUserCoordinates", {lat: userCoordinates.latitude, lon: userCoordinates.longitude})
    return {lat: userCoordinates.latitude, lon: userCoordinates.longitude};
}