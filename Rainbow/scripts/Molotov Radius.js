var _0x1822=['inferno_expire','AddSliderInt','RegisterCallback','\x20\x20\x20$$$\x20MADE\x20BY\x20DARKLUNY\x20$$$','smokegrenade_detonate','length','GetInt','entityid','Draw','splice','Molotov\x20radius\x20color','GetFloat','JAVASCRIPT','round_start','WorldToScreen','GetValue','position','cos','clearData','AddCheckbox','molotovExpire','Script\x20items','Smoke\x20radius\x20color','Smoke\x20line\x20color','push','Enable\x20molotov\x20radius','smokeStart','GetColor','Line','AddColorPicker','inferno_startburn','Misc','smokeExpire','Enable\x20smoke\x20radius','entity'];(function(_0x12b85e,_0x2c4bb0){var _0x18221a=function(_0x33ca10){while(--_0x33ca10){_0x12b85e['push'](_0x12b85e['shift']());}};_0x18221a(++_0x2c4bb0);}(_0x1822,0x1ef));var _0x33ca=function(_0x12b85e,_0x2c4bb0){_0x12b85e=_0x12b85e-0xf9;var _0x18221a=_0x1822[_0x12b85e];return _0x18221a;};var _0x1a8785=_0x33ca;function draw_circle_3d(_0x52f437,_0xb0782c,_0x45c1ed,_0x438242,_0x985376,_0x1542d4,_0x2b9f97,_0x20052e){var _0x111702=_0x33ca,_0x4ab0b0=0x8,_0x56feff,_0x58bc78;_0x985376=_0x985376<0x169&&_0x985376||0x168,_0x985376=_0x985376>-0x1&&_0x985376||0x0,_0x1542d4=_0x1542d4+0x1;for(rot=_0x1542d4;rot<_0x985376+_0x1542d4+0x1;rot+=_0x1542d4*_0x4ab0b0){rot_r=rot*(Math['PI']/0xb4),(line_x=_0x438242*Math[_0x111702(0x105)](rot_r)+_0x52f437,line_y=_0x438242*Math['sin'](rot_r)+_0xb0782c);var _0x4dc08c=Render[_0x111702(0x102)]([line_x,line_y,_0x45c1ed]),_0x3f0f06=Render[_0x111702(0x102)]([_0x52f437,_0xb0782c,_0x45c1ed]);_0x3f0f06[0x0]!=null&&_0x4dc08c[0x0]!=null&&_0x56feff!=null&&(Render['Polygon']([[_0x4dc08c[0x0],_0x4dc08c[0x1]],[_0x56feff,_0x58bc78],[_0x3f0f06[0x0],_0x3f0f06[0x1]]],_0x20052e),Render[_0x111702(0x110)](_0x4dc08c[0x0],_0x4dc08c[0x1],_0x56feff,_0x58bc78,_0x2b9f97)),_0x56feff=_0x4dc08c[0x0],_0x58bc78=_0x4dc08c[0x1];}}var _0x5edc=[_0x1a8785(0x11a),'AddLabel'];(function(_0xe169af,_0xc83372){var _0x1609d1=function(_0x320833){var _0xc4fd5b=_0x33ca;while(--_0x320833){_0xe169af[_0xc4fd5b(0x10c)](_0xe169af['shift']());}};_0x1609d1(++_0xc83372);}(_0x5edc,0x188));var _0x4820=function(_0x5162b5,_0xf5f845){_0x5162b5=_0x5162b5-0x199;var _0x491254=_0x5edc[_0x5162b5];return _0x491254;},_0x406c32=_0x4820,_0x4247=[_0x406c32(0x199)],_0x6556=[_0x4247[0x0]];UI[_0x406c32(0x19a)](_0x6556[0x0]),UI[_0x1a8785(0x107)](_0x1a8785(0x10d)),UI[_0x1a8785(0x111)]('Molotov\x20line\x20color'),UI[_0x1a8785(0x111)](_0x1a8785(0xfe)),UI[_0x1a8785(0x118)]('',0x0,0x0),UI[_0x1a8785(0x107)]('Enable\x20smoke\x20radius'),UI[_0x1a8785(0x111)](_0x1a8785(0x10b)),UI[_0x1a8785(0x111)](_0x1a8785(0x10a));var molotov=[];const molotovStart=function(){var _0x186769=_0x1a8785;entity=Event[_0x186769(0xfa)](_0x186769(0xfb)),x=Event[_0x186769(0xff)]('x'),y=Event[_0x186769(0xff)]('y'),z=Event['GetFloat']('z'),molotov[_0x186769(0x10c)]({'entity':entity,'position':[x,y,z]});},molotovExpire=function(){var _0x4e826c=_0x1a8785;for(var _0x105476=0x0;_0x105476<molotov[_0x4e826c(0xf9)];_0x105476++){molotov[_0x105476][_0x4e826c(0x116)]==Event[_0x4e826c(0xfa)](_0x4e826c(0xfb))&&molotov[_0x4e826c(0xfd)](_0x105476,0x1);}},molotovDraw=function(){var _0xb1eaac=_0x1a8785;if(!UI[_0xb1eaac(0x103)](_0xb1eaac(0x113),_0xb1eaac(0x100),_0xb1eaac(0x109),_0xb1eaac(0x10d)))return;for(var _0x4c5da4=0x0;_0x4c5da4<molotov[_0xb1eaac(0xf9)];_0x4c5da4++){vecOrigin=molotov[_0x4c5da4][_0xb1eaac(0x104)];const _0x1e564d=UI[_0xb1eaac(0x10f)](_0xb1eaac(0x113),_0xb1eaac(0x100),_0xb1eaac(0x109),'Molotov\x20line\x20color'),_0x58fed8=UI[_0xb1eaac(0x10f)](_0xb1eaac(0x113),_0xb1eaac(0x100),_0xb1eaac(0x109),_0xb1eaac(0xfe));draw_circle_3d(vecOrigin[0x0],vecOrigin[0x1],vecOrigin[0x2],0xa0,0x168,0x0,[_0x1e564d[0x0],_0x1e564d[0x1],_0x1e564d[0x2],_0x1e564d[0x3]],[_0x58fed8[0x0],_0x58fed8[0x1],_0x58fed8[0x2],_0x58fed8[0x3]]);}};var smoke=[];const smokeStart=function(){var _0x5c36e4=_0x1a8785;entity=Event[_0x5c36e4(0xfa)](_0x5c36e4(0xfb)),x=Event[_0x5c36e4(0xff)]('x'),y=Event[_0x5c36e4(0xff)]('y'),z=Event['GetFloat']('z'),smoke[_0x5c36e4(0x10c)]({'entity':entity,'position':[x,y,z]});},smokeExpire=function(){var _0x427231=_0x1a8785;for(var _0x20ddfc=0x0;_0x20ddfc<smoke['length'];_0x20ddfc++){smoke[_0x20ddfc]['entity']==Event[_0x427231(0xfa)](_0x427231(0xfb))&&smoke[_0x427231(0xfd)](_0x20ddfc,0x1);}},smokeDraw=function(){var _0x5e7e75=_0x1a8785;if(!UI[_0x5e7e75(0x103)](_0x5e7e75(0x113),_0x5e7e75(0x100),'Script\x20items',_0x5e7e75(0x115)))return;for(var _0x4db20e=0x0;_0x4db20e<smoke[_0x5e7e75(0xf9)];_0x4db20e++){vecOrigin=smoke[_0x4db20e]['position'];const _0xb858bd=UI[_0x5e7e75(0x10f)]('Misc','JAVASCRIPT',_0x5e7e75(0x109),_0x5e7e75(0x10b)),_0x3e354d=UI[_0x5e7e75(0x10f)](_0x5e7e75(0x113),_0x5e7e75(0x100),'Script\x20items','Smoke\x20radius\x20color');draw_circle_3d(vecOrigin[0x0],vecOrigin[0x1],vecOrigin[0x2],0xa0,0x168,0x0,[_0xb858bd[0x0],_0xb858bd[0x1],_0xb858bd[0x2],_0xb858bd[0x3]],[_0x3e354d[0x0],_0x3e354d[0x1],_0x3e354d[0x2],_0x3e354d[0x3]]);}},onDraw=function(){molotovDraw(),smokeDraw();},clearData=function(){var _0x4d2cdd=_0x1a8785;for(var _0x54d50e=0x0;_0x54d50e<molotov[_0x4d2cdd(0xf9)];_0x54d50e++){molotov[_0x4d2cdd(0xfd)](_0x54d50e,0x1);}for(var _0x54d50e=0x0;_0x54d50e<smoke['length'];_0x54d50e++){smoke[_0x4d2cdd(0xfd)](_0x54d50e,0x1);}};Cheat[_0x1a8785(0x119)](_0x1a8785(0x101),_0x1a8785(0x106)),Cheat['RegisterCallback'](_0x1a8785(0x11b),_0x1a8785(0x10e)),Cheat['RegisterCallback']('smokegrenade_expired',_0x1a8785(0x114)),Cheat[_0x1a8785(0x119)](_0x1a8785(0x112),'molotovStart'),Cheat[_0x1a8785(0x119)](_0x1a8785(0x117),_0x1a8785(0x108)),Cheat[_0x1a8785(0x119)](_0x1a8785(0xfc),'onDraw');