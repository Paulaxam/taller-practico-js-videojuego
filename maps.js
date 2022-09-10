const emojis = {
    '-':' ',
    'O':'🏕️',
    'X':'🌵',
    'Y':'🌲',
    'Z':'🌳',
    'I':'🏔️',
    'PLAYER':'🚴🏼',
    'BOMB_COLLISION':'🤕',
    'GAME_OVER':'👎',
    'WIN':'😎',
    'HEART':'💜',
    'CUP':'🏆'
};

const maps=[];

maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);

maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
  
  maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);

maps.push (`
XXXXXXX--O
XXXXXXX-XX
XXXXXXX--X
XXXXXXXX-X
XX-------X
XX-XXXXXXX
XX-------X
XXXXXXXX-X
X--------X
I-XXXXXXXX
`)

maps.push (`
---YYYYYYY
-Y----YYYY
-YYYY-YYYY
-YYYY-Y---
OYYYY-Y-Y-
YYYYY-Y-Y-
Y-----Y-Y-
Y-YYYYY-Y-
Y-------YI
YYYYYYYYYY
`)