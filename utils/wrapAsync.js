// module.exports = (asyncFunction) => {
//     return function (req, res, next) {
//         asyncFunction(req, res, next).catch(next);
//     };
// };

module.exports = (asyncFunction) => {
    return function (req, res, next) {
        const result = asyncFunction(req, res, next);

        // Check if result is a promise
        if (result && result.catch) {
            result.catch(next);
        }
    };
};
