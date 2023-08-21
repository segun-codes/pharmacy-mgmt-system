
// quick utility function to support basic operation
const isEmpty = (obj) => {
    try {
        return Object.keys(obj).length === 0;
    } catch(err) {
        console.log('Error occurred: Unable to confirm empty or not');
        return true;
    }
};


module.exports = {
    isEmpty
};
