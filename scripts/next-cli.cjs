// Avoid global telemetry config writes (including Windows cross-drive EXDEV).
// Nothing is changed outside this process or the project.
process.env.NEXT_TELEMETRY_DISABLED ??= '1';
require('next/dist/bin/next');
