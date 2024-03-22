import { Tree } from '@nx/devkit';

import { appendFileAtTheBottom } from '../../../utility';

export const appendGitIgnore = async ({ tree }: { tree: Tree }) => {
  const entries = [
    '# Firebase',
    'firebase-debug.log',
    '.firebase',
    'firestore-debug.log',
    'ui-debug.log',
    'pubsub-debug.log',

    '## backend',
    '.env.production',

    '## web',
    'apps/web/.env.local',

    '## marketing',
    'apps/marketing/.env.local',

    '## ios',
    '**/ios/tmp.xcconfig',

    '## project',
    '.nx',
    '.nx/cache',
  ];

  appendFileAtTheBottom({ tree, filePath: '.gitignore', entries });
};
