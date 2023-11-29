const env = {
  collectDebugLogs: process.env.EXPO_PUBLIC_COLLECT_DEBUG_LOGS === 'true',
  preventDatabaseAccesses: process.env.EXPO_PUBLIC_PREVENT_DATABASE_ACCESSES === 'true',
};

export default env;
