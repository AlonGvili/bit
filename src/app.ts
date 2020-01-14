import 'reflect-metadata';
import * as BPromise from 'bluebird';
import { Harmony } from './harmony';
import HooksManager from './hooks';
import { BitCliExt } from './cli';

process.env.MEMFS_DONT_WARN = 'true'; // suppress fs experimental warnings from memfs

// removing this, default to longStackTraces also when env is `development`, which impacts the
// performance dramatically. (see http://bluebirdjs.com/docs/api/promise.longstacktraces.html)
BPromise.config({
  longStackTraces: true
});

// loudRejection();
HooksManager.init();

// const defaultExtensions: ExtensionProvider<any, any>[] = [
//   Paper
// ];

Harmony.load(BitCliExt)
  .run()
  .then(() => {})
  .catch(err => {
    console.error(err, err.stack);
  });

// BitCli.load(Harmony.load(PaperExt))
//   .then(async () => {
//     // if (capsuleOrchestrator) await capsuleOrchestrator.buildPools();
//   })
//   .catch(err => console.error('loud rejected:', err));
