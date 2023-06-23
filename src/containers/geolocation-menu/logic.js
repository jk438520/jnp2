const geolocationAPI = navigator.geolocation;

let userCoordinates = new Promise((resolve, reject) => {
    geolocationAPI.getCurrentPosition((position) => {
        resolve(position.coords);
    }, (error) => {
        reject(error);
    });
});



export async function getUserCoordinates(){
    userCoordinates = await userCoordinates;
    return {lat: userCoordinates.latitude, lon: userCoordinates.longitude};
}