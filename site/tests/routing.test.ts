import { test, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { parseRoute, routeHash } from '../../src/routing';
import { compositions } from '../../src/data/compositions';
import { favicons } from '../../src/data/favicons';
import { projects } from '../../src/data/projects';

test('Every chapter and Academy mini can be opened directly',()=>{
  projects.forEach((project,index)=>expect(parseRoute(`#${project.id}`)).toEqual({index,mode:'web'}));
  expect(parseRoute('#academy/mini')).toEqual({index:6,mode:'mini'});
  expect(routeHash({index:6,mode:'mini'})).toBe('#academy/mini');
  expect(parseRoute('#missing')).toEqual({index:0,mode:'web'});
  expect(parseRoute('#nutsfarm/mini')).toEqual({index:5,mode:'web'});
});
test('All eight views have local icons and distinct readable compositions',()=>{
  expect(Object.keys(compositions)).toHaveLength(8);
  expect(new Set(Object.values(compositions).map(c=>JSON.stringify(c))).size).toBe(8);
  for(const [id,c] of Object.entries(compositions)) {
    expect(existsSync(new URL('../../public/'+favicons[id],import.meta.url))).toBe(true);
    for(const angle of [c.about,c.contribution,c.cases])expect(Math.abs(angle)).toBeLessThanOrEqual(2);
  }
});
