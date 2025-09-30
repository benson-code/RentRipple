import { kv } from '@vercel/kv';

export const kvStore = kv;

export async function getViewCount(stationId) {
  try {
    const count = await kvStore.get(`station:${stationId}:views`);
    return count || 0;
  } catch (error) {
    console.error('Failed to get view count:', error);
    return 0;
  }
}

export async function incrementViewCount(stationId) {
  try {
    const newCount = await kvStore.incr(`station:${stationId}:views`);
    return newCount;
  } catch (error) {
    console.error('Failed to increment view count:', error);
    return 0;
  }
}

export async function getRecentViews() {
  try {
    const keys = await kvStore.keys('station:*:views');
    const viewData = [];

    for (const key of keys) {
      const count = await kvStore.get(key);
      const stationId = key.split(':')[1];
      viewData.push({ stationId, views: count });
    }

    return viewData.sort((a, b) => b.views - a.views);
  } catch (error) {
    console.error('Failed to get recent views:', error);
    return [];
  }
}