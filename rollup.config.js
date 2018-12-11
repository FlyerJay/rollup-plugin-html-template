import babel from 'rollup-plugin-babel'

const env = process.env.NODE_ENV || 'cjs'

export default {
    input: 'src/index.js',
    output: {
        file: `dist/rollup-plugin-html.${env}.js`,
        sourcemap: true,
        format: env
    },
    plugins: [
        babel()
    ]
}