
export const stringifyCoords = (coords) => {
    if(coords)
        return `${coords.lat},${coords.lon}`
    else
        return "";
}