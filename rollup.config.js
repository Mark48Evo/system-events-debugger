import babel from 'rollup-plugin-babel';

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'bin/systemEventsDebugger.js',
        format: 'cjs',
        sourcemap: false,
        banner: '#!/usr/bin/env node',
      },
    ],
    external: [
      '@mark48evo/rabbitmq-pubsub',
      'amqplib',
      'chalk',
      'util',
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        envName: 'rollup',
      }),
    ],
  },
];
