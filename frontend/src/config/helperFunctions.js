function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export { getWindowDimensions, capitalise };