import { projects } from './data/projects';
import type { Route } from './types';
export function parseRoute(hash: string): Route {
  const [id, mode] = hash.replace(/^#/, '').split('/');
  const index = projects.findIndex(project => project.id === id);
  return { index: Math.max(0, index), mode: id === 'academy' && mode === 'mini' ? 'mini' : 'web' };
}
export function routeHash({ index, mode }: Route) {
  return `#${projects[index].id}${mode === 'mini' ? '/mini' : ''}`;
}
