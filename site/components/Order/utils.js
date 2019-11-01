export const mergeMeta = function(meta) {
    return Object.keys(meta).reduce((acc, key) => {
        const value = meta[key];
        Object.assign(acc, value);
        return acc;
    }, {});
};