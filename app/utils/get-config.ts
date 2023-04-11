import config from 'ember-boilerplate/config/environment';
import fetch from 'fetch';

export let mergedConfig: typeof config;

export async function loadConfig() {
  const injectedConfig = await (await fetch('/config.json')).json();
  mergedConfig = { ...config, ...injectedConfig };
}

export function setConfig(obj: typeof config): void {
  mergedConfig = obj;
}
