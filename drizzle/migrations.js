// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_absent_rattler.sql';
import m0001 from './0001_flashy_menace.sql';
import m0002 from './0002_mushy_chameleon.sql';
import m0003 from './0003_far_dragon_man.sql';
import m0004 from './0004_flat_energizer.sql';
import m0005 from './0005_salty_loki.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004,
m0005
    }
  }
  