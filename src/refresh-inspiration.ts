import { refreshInspirationSignals } from "./inspiration-refresh.ts";

const candidates = await refreshInspirationSignals();
console.log(`  [inspiration] Refreshed ${candidates.length} dynamic candidates`);
