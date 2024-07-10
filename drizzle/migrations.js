// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_fuzzy_pet_avengers.sql';
import m0001 from './0001_flaky_masque.sql';
import m0002 from './0002_abandoned_miracleman.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002
    }
  }
  