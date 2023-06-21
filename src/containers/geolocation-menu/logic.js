
const success = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    return { lat, lng };
}

const error = () => {
    return null;
}
export const getGeolocation = () => {
    console.log("getGeolocation");
    return null;
}