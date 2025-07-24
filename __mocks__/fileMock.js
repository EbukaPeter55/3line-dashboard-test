const path = require('path');

module.exports = {
    process(src, filename, config, options) {
        // Extract the base filename (e.g., 'menu-2.png' or 'brand-logo.png')
        const basename = path.basename(filename);
        // Construct a unique mock string based on the filename
        const mockPath = `/${basename}-mock`;
        // Jest expects a string representing the transformed code.
        // Here, we export the mockPath as a string.
        return `module.exports = '${mockPath}';`;
    },
    // Jest needs a getCacheKey method for transformers
    getCacheKey(src, filename, configString, options) {
        return 'fileMock'; // Simple cache key, sufficient for this purpose
    },
};
