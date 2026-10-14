import type { Composition, ThemeStyle } from '../types';

// Stable chapter compositions. Coordinates are small offsets within the illustration area.
export const compositions: Record<string, Composition> = {
  'crypton-id': {about:-1,contribution:.8,cases:-.8,tape:-4,contributionTape:-8,artifact:-7,x:0,y:0,starX:0,starY:0,arrow:-6,annotation:-4},
  'x-program': {about:1.3,contribution:-1.1,cases:1.5,tape:6,contributionTape:4,artifact:5,x:-16,y:3,starX:14,starY:18,arrow:8,annotation:3},
  'in-prime': {about:-1.6,contribution:1.4,cases:.6,tape:-9,contributionTape:7,artifact:-4,x:15,y:-3,starX:-18,starY:8,arrow:-12,annotation:-2},
  'web3-xms': {about:.7,contribution:-1.7,cases:-1.2,tape:3,contributionTape:-5,artifact:7,x:-9,y:4,starX:12,starY:-9,arrow:4,annotation:5},
  nutcracker: {about:-.5,contribution:1.8,cases:-1.6,tape:-6,contributionTape:10,artifact:-9,x:10,y:0,starX:-12,starY:15,arrow:-9,annotation:-5},
  nutsfarm: {about:1.8,contribution:-.6,cases:.9,tape:8,contributionTape:-10,artifact:3,x:-12,y:-2,starX:17,starY:4,arrow:11,annotation:2},
  academy: {about:-1.2,contribution:1.1,cases:1.7,tape:-3,contributionTape:5,artifact:-5,x:8,y:2,starX:-14,starY:-8,arrow:-3,annotation:-3},
  'academy-mini': {about:.9,contribution:-1.4,cases:-.4,tape:10,contributionTape:-3,artifact:8,x:-5,y:4,starX:9,starY:12,arrow:6,annotation:4},
};
export function compositionStyle(id: string, color: string, pale: string): ThemeStyle {
  const c = compositions[id];
  return {
    '--accent':color,'--pale':pale,'--about-angle':`${c.about}deg`,
    '--contribution-angle':`${c.contribution}deg`,'--cases-angle':`${c.cases}deg`,
    '--tape-angle':`${c.tape}deg`,'--contribution-tape':`${c.contributionTape}deg`,
    '--artifact-angle':`${c.artifact}deg`,'--art-x':`${c.x}px`,'--art-y':`${c.y}px`,
    '--star-x':`${c.starX}px`,'--star-y':`${c.starY}px`,
    '--arrow-angle':`${c.arrow}deg`,'--annotation-angle':`${c.annotation}deg`,
  };
}
