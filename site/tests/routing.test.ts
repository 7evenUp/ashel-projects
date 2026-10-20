import { test, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { parseRoute, routeHash } from '../../src/routing';
import { compositions } from '../../src/data/compositions';
import { favicons } from '../../src/data/favicons';
import { projects } from '../../src/data/projects';
import { personalProjects } from '../../src/data/profile';

test('Every chapter and Academy mini can be opened directly',()=>{
  projects.forEach((project,index)=>expect(parseRoute(`#${project.id}`)).toEqual({page:'project',index,mode:'web'}));
  expect(parseRoute('#academy/mini')).toEqual({page:'project',index:6,mode:'mini'});
  expect(routeHash({page:'project',index:6,mode:'mini'})).toBe('#academy/mini');
  expect(parseRoute('#nutsfarm/mini')).toEqual({page:'project',index:5,mode:'web'});
});

test('The book opens on the introductory spread, including unknown addresses',()=>{
  for(const hash of ['', '#', '#intro', '#missing', '#personal/missing']) expect(parseRoute(hash)).toEqual({page:'intro'});
  expect(routeHash({page:'intro'})).toBe('#intro');
});

test('Personal chapters use their own direct addresses without changing work links',()=>{
  personalProjects.forEach((project,index)=>{
    const route={page:'personal' as const,index};
    expect(routeHash(route)).toBe(`#personal/${project.id}`);
    expect(parseRoute(routeHash(route))).toEqual(route);
  });
  expect(parseRoute('#crypton-id')).toEqual({page:'project',index:0,mode:'web'});
});
test('All eight views have local icons and distinct readable compositions',()=>{
  expect(Object.keys(compositions)).toHaveLength(8);
  expect(new Set(Object.values(compositions).map(c=>JSON.stringify(c))).size).toBe(8);
  for(const [id,c] of Object.entries(compositions)) {
    expect(existsSync(new URL('../../public/'+favicons[id],import.meta.url))).toBe(true);
    for(const angle of [c.about,c.contribution,c.cases])expect(Math.abs(angle)).toBeLessThanOrEqual(2);
  }
});
