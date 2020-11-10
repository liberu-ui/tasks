import storeImporter from '@enso-ui/ui/src/modules/importers/storeImporter.js';

export const modules = storeImporter(require.context('./internal', false, /.*\.js$/));

export const state = {
    gigi: 4,
};
