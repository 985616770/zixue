const presets = [
    [
        '@babel/env',
        {
            targets: {
                edge: '10',
                firefox: '18',
                chrome: '20',
                safari: '6'
            },
            useBuiltIns: 'usage'
        }
    ]
];

module.exports = { presets };
