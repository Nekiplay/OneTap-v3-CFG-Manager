/*
|-------------------------------------------------------------------------------|
    Special thanks to some people from yougame.biz (restenj and blitzkrieg-)
                    for some help with script fps optimization
|-------------------------------------------------------------------------------|
     Thx for mafia007, restenj, blitzkrieg-, prince1337, skyline cord for
                   your sources, that I found on yougame.biz
|-------------------------------------------------------------------------------|
             Official script developer: ANARXIST_ (ANARXIST#0911)
       VK - vk.com/c/an4rx1st, YG - https://yougame.biz/members/371308/
|-------------------------------------------------------------------------------|
*/


//Menu objects
UI.AddLabel(" <----------------------------------->"),
UI.AddLabel("             [$Infernal tech$]"),
UI.AddLabel("            [$1nf3rn4l t3ch$]"),
UI.AddLabel("    [Credits to ANARXIST#0911]"),
UI.AddLabel(" <----------------------------------->"),
UI.SetEnabled("Script items", "             [$Infernal tech$]", 0),
UI.SetEnabled("Script items", "            [$1nf3rn4l t3ch$]", 0);
//Vars
var lasttime_lab = 0,
back = true,
leg_break,
enemies_m = 0,
transparensy = UI.GetValue("Script items", "Background alpha"),
font = false,
hc_val = false,
damage = false,
freestand_orig = true,
h = new Array(), screen_size = Render.GetScreenSize(),
lasttime_ct = 0,
gr1, gr2, gr3,
ping = Math.round(Entity.GetProp(Entity.GetLocalPlayer(), "CPlayerResource", "m_iPing")).toString(),
drag = [0, 0, 0],
pingspike_back = true,
hurtLogs = [ ],
typeSpeed = 0.05,
fadeOutSpeed = 8,
showDelayTime = typeSpeed + Globals.Curtime(),
drawLeft = 0,
drawNotActive = 1,
drawRight = 0,
leftWasPressed = false,
rightWasPressed = false,
screen_size = Global.GetScreenSize(),
oldTick = 0,
lastPressed = 0,
isNotActive = false,
original_aa = true,
yaw_offset_cache = UI.GetValue ("Anti-Aim", "Rage Anti-Aim", "Yaw offset"),
LPx = [(screen_size[0] /2) - 50, (screen_size[1] /2) + 9],
LPy = [(screen_size[0] /2) - 50, (screen_size[1] /2) - 9],
LPz = [(screen_size[0] /2) - 68, (screen_size[1] /2)],
RPx = [(screen_size[0] /2) + 50, (screen_size[1] /2) + 9],
RPy = [(screen_size[0] /2) + 50, (screen_size[1] /2) - 9],
RPz = [(screen_size[0] /2) + 68, (screen_size[1] /2)],
binds = [
    ["Force body aim", ["Rage", "General", "Force body aim"], "[active]", 0, 0],
    ["Force safe point", ["Rage", "General", "Force safe point"], "[active]", 0, 0],
    ["Auto peek", ["Misc", "Movement", "Auto peek"], "[active]", 0, 0],
    ["Freestand", ["Script items", "Freestand keybind"], "[active]", 0, 0],
    ["Fake duck", ["Anti-Aim", "Extra", "Fake duck"], "[active]", 0, 0],
    ["Double tap", ["Rage", "Exploits", "Doubletap"], "[active]", 0, 0],
    ["Hide shots", ["Rage", "Exploits", "Hide shots"], "[active]", 0, 0],
    ["Pingspike", ["Script items", "Pingspike keybind"], "[" + ping + "]", 0, 0],
    ["HC override", ["Script items", "Hitchance keybind"], "[active]", 0, 0],
    ["Dmg override", ["Script items", "Minimum Damage Override"], "[active]", 0, 0],
],
indicators = [
    ["freestand", ["Misc","JAVASCRIPT","Script items", "Freestand keybind"], [122,199,236, 255]],
    ["autopeek", ["Misc", "GENERAL", "Movement","Auto peek"], [122,199,236,255]],
    ["    ping", ["Misc","JAVASCRIPT","Script items", "Pingspike keybind"], [240,240,240,255]],
    ["    body", ["Rage", "GENERAL", "General", "Force body aim"], [240,240,240,255]],
    ["    safe", ["Rage", "GENERAL", "General", "Force safe point"], [240,240,240,255]],
    ["    dmg", ["Misc","JAVASCRIPT","Script items", "Minimum Damage Override"], [240,240,240,255]],
    ["      hc", ["Misc","JAVASCRIPT","Script items", "Hitchance keybind"], [240,240,240,255]],
],
tag = [
        '',
        'I',
        'N',
        'F',
        'E',
        'R',
        'N',
        'A',
        'L',
        '',
        'T',
        'E',
        'C',
        'H',
        'Infernal tech',
        'Infernal tech',
        'Infernal tec%',
        'Infernal te&',
        'Infernal t@',
        'Infernal $',
        'Inferna#',
        'Infern*',
        'Infer@',
        'Infe?',
        'Inf$',
        'In^',
        'I%',
        '&',
        ''
        ];
getval = function(val) {
    return UI.GetValue("Script items", val);
},
getcol = function(col) {
    return UI.GetColor("Script items", col);
},
setval = function(set, val) {
    return UI.SetValue("Script items", set, val);
},
setenable = function(enable, value) {
    return UI.SetEnabled("Script items", enable, value);
};
function GetVelocity(index) {
    var velocity = Entity.GetProp(index, "CBasePlayer", "m_vecVelocity[0]");
    return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
};
//UI + menu elements
const UI_menu = function() {
	if (UI.IsMenuOpen()) {
    var b = parseInt((Globals.Curtime() * 2));
    if (b != lasttime_lab) {
        switch ((b) % 2) {
        case 0:setenable("            [$1nf3rn4l t3ch$]", 0),setenable("             [$Infernal tech$]", 1);break;
        case 1:setenable("            [$1nf3rn4l t3ch$]", 1),setenable("             [$Infernal tech$]", 0);break;
        }
    }
    lasttime_lab = b
    const b = getval("Menu");
    rage = b == 0, aa = b == 1, vis = b == 2, misc = b == 3, cont = b == 4;
    
    setenable("Safety on lethal", rage),
    setenable("Adaptive noscope", rage),
    setenable("Autopeek helper", rage)
    setenable('HP/2 on dt (only auto)', rage),
    setenable("Mindmg override", rage),
    setenable('Hitchance override', rage),
    setenable("Better Anti-aim", aa),
    setenable("AA inverter on stand", aa),
    setenable("Freestand on key", aa),
    setenable("Manual AA", aa),
    setenable("Indicators", vis),
    setenable("Keybinds", vis),
    setenable("Watermark", vis),
    setenable("Hitlogs", vis),
    setenable("Leg fucker", vis),
    setenable("Custom thirdperson", vis),
    setenable("Aspect ratio changer", misc),
    setenable("Pingspike", misc),
    setenable("Clan-tag", misc),
    setenable("FPS Boost", misc),
    setenable("Discord - ANARXIST#0911", cont),
    setenable("YouTube - youtube.com/c/anarxist", cont),
    setenable("VK - vk.com/an4rx1st", cont);

        /* Functions UI visible */
    if (getval("Mindmg override")) {
        setenable("Minimum Damage Override", rage),
        setenable("Pistol mindmg", rage),
        setenable("Heavy Pistols mindmg", rage),
        setenable("Scout mindmg", rage),
        setenable("AWP mindmg", rage),
        setenable("Auto mindmg", rage);
    } else {
        setenable("Minimum Damage Override", 0),
        setenable("Pistol mindmg", 0),
        setenable("Heavy Pistols mindmg", 0),
        setenable("Scout mindmg", 0),
        setenable("AWP mindmg", 0),
        setenable("Auto mindmg", 0);
    }
    if (getval("Hitchance override")) {
        setenable("Hitchance keybind", rage),
        setenable("Hitchance value", rage);
    } else {
        setenable("Hitchance keybind", 0),
        setenable("Hitchance value", 0);
    }
    if (getval("Manual AA")){
        setenable("Arrows type", aa),
        setenable("Color selected inverter", aa),
        setenable("Color selected arrow", aa),
        setenable("Color not selected arrow", aa),
        setenable("Left direction", aa),
        setenable("Right direction", aa);
    }
    else {
        setenable("Arrows type", 0),
        setenable("Color selected inverter", 0),
        setenable("Color selected arrow", 0),
        setenable("Color not selected arrow", 0),
        setenable("Left direction", 0),
        setenable("Right direction", 0);
    }
    if(getval("Better Anti-aim")) {
        setenable("Body yaw type", aa),
        setenable("Real offset", aa),
        setenable("LBY offset", aa)
    }
    else {
        setenable("Body yaw type", 0),
        setenable("Real offset", 0),
        setenable("LBY offset", 0)
    }
    if (getval("Freestand on key")) {
        setenable("Freestand keybind", aa)
    } else {
        setenable("Freestand keybind", 0)
    }
    if (getval("Indicators")) {
        setenable("Indicators y adding", vis)
    } else {
        setenable("Indicators y adding", 0)
    }
    if (getval("Indicators style") == 0) {
                setenable("Static color line", vis)
                setenable("Fade color line", 0),
                setenable("Gradient 1 color", 0),
                setenable("Gradient 2 color", 0),
                setenable("Gradient 3 color", 0);
            }
            else if (getval("Indicators style") == 1) {
                setenable("Static color line", 0),
                setenable("Fade color line", vis),
                setenable("Gradient 1 color", 0),
                setenable("Gradient 2 color", 0),
                setenable("Gradient 3 color", 0);
            }
            else if (getval("Indicators style") == 2) {
                setenable("Static color line", 0),
                setenable("Fade color line", 0),
                setenable("Gradient 1 color", vis),
                setenable("Gradient 2 color", vis),
                setenable("Gradient 3 color", vis);
            }
            else {
                setenable("Static color line", 0),
                setenable("Fade color line", 0),
                setenable("Gradient 1 color", 0),
                setenable("Gradient 2 color", 0),
                setenable("Gradient 3 color", 0);
            }
            if (getval("Keybinds") || getval("Watermark") || getval("Hitlogs")) {
                setenable("Line position", vis),
                setenable("Indicators style", vis),
                setenable("Background alpha", vis);
        }
        else {
                setenable("Line position", 0),
                setenable("Indicators style", 0),
                setenable("Background alpha", 0);
            }
            if (!getval("Keybinds") && (!getval("Watermark")) && (!getval("Hitlogs"))) {
                setenable("Static color line", 0),
                setenable("Fade color line", 0),
                setenable("Gradient 1 color", 0),
                setenable("Gradient 2 color", 0),
                setenable("Gradient 3 color", 0);
            }
    if (getval("Custom thirdperson")) {
        setenable("Thirdperson distance", vis);
    }
    else {
        setenable("Thirdperson distance", 0);
    }
    if (getval("Aspect ratio changer")) {
        setenable("Aspect ratio", misc);
    } else {
        setenable("Aspect ratio", 0);
    }    
    if (getval("Pingspike")) {
        setenable("Pingspike keybind", misc),
        setenable("Ping limit", misc);
    }
    else {
        setenable("Pingspike keybind", 0),
        setenable("Ping limit", 0);
    }
	}
}
//UI things
UI.AddDropdown("Menu", ["Rage", "Anti-Aim", "Visuals", "Misc", "Contacts"]),
UI.AddLabel("Discord - ANARXIST#0911"),
UI.AddLabel("YouTube - youtube.com/c/anarxist"),
UI.AddLabel("VK - vk.com/an4rx1st"),
UI.AddCheckbox("Safety on lethal"),
UI.AddCheckbox("Adaptive noscope"),
UI.AddCheckbox("Autopeek helper"),
UI.AddCheckbox("HP/2 on dt (only auto)"),
UI.AddCheckbox("Mindmg override"),
UI.AddHotkey("Minimum Damage Override"),
UI.AddSliderInt("Pistol mindmg", 0, 130),
UI.AddSliderInt("Heavy Pistols mindmg", 0, 130),
UI.AddSliderInt("Scout mindmg", 0, 130),
UI.AddSliderInt("AWP mindmg", 0, 130),
UI.AddSliderInt("Auto mindmg", 0, 130),
UI.AddCheckbox("Hitchance override"),
UI.AddHotkey("Hitchance keybind"),
UI.AddSliderInt("Hitchance value", 0, 100),
UI.AddCheckbox("Better Anti-aim"),
UI.AddDropdown("Body yaw type", ["None", "Random jitter", "Static desync"]),
UI.AddSliderInt("Real offset", 1, 60),
UI.AddSliderInt("LBY offset", 1, 60),
UI.AddCheckbox('AA inverter on stand'),
UI.AddCheckbox("Freestand on key"),
UI.AddHotkey("Freestand keybind"),
UI.AddCheckbox("Manual AA"),
UI.AddDropdown("Arrows type", ["Thin", "Team Skeet"]),
UI.AddColorPicker("Color selected inverter"),
UI.AddColorPicker("Color selected arrow"),
UI.AddColorPicker("Color not selected arrow"),      
UI.AddHotkey("Left direction"),
UI.AddHotkey("Right direction"),
UI.AddCheckbox("Indicators"),
UI.AddSliderInt("Indicators y adding", -250, 250),
UI.AddCheckbox("Keybinds"),
UI.AddCheckbox("Watermark"),
UI.AddCheckbox("Hitlogs"),
UI.AddDropdown("Indicators style", ["Static line", "Fade line","Gradient line", "Skeet line", "Rainbow line"]),
UI.AddDropdown("Line position", ["Top", "Bottom"]),
UI.AddColorPicker("Static color line"),
UI.AddColorPicker("Fade color line"),
UI.AddColorPicker("Gradient 1 color"),
UI.AddColorPicker("Gradient 2 color"),
UI.AddColorPicker("Gradient 3 color"),
UI.AddSliderInt("Background alpha", 0, 255),
UI.AddSliderInt("kb_x", 0, Render.GetScreenSize()[0]),
UI.AddSliderInt("kb_y", 0, Render.GetScreenSize()[1]);
setenable("kb_x", 0),
setenable("kb_y", 0),
UI.AddCheckbox("Custom thirdperson"),
UI.AddSliderInt('Thirdperson distance', 0, 350),
UI.AddCheckbox("Leg fucker"),
UI.AddCheckbox("Aspect ratio changer"),
UI.AddSliderFloat("Aspect ratio", 0, 5),
UI.AddCheckbox("Pingspike"),
UI.AddHotkey("Pingspike keybind"),
UI.AddSliderInt("Ping limit", 150, 200),
UI.AddCheckbox("Clan-tag"),
UI.AddCheckbox("FPS Boost");
//Help functions                   
if (transparensy == 0) {
    setval("Background alpha", 255),
    UI.SetColor("Script items", "Color selected inverter", [0,255,255,255]),
    UI.SetColor("Script items", "Color selected arrow", [0,255,255,255]),
    UI.SetColor("Script items", "Color not selected arrow", [35,35,35,150]),
    UI.SetColor("Script items", "Static color line", [0,255,255,255]),
    UI.SetColor("Script items", "Fade color line", [0,255,255,255]),
    UI.SetColor("Script items", "Gradient 1 color", [0,255,255,255]),
    UI.SetColor("Script items", "Gradient 2 color", [255,0,255,255]),
    UI.SetColor("Script items", "Gradient 3 color", [255,255,0,255]);
}
function getPlayerHealth(index) { /*For hp/2*/ 
    return Entity.GetProp(index, "CPlayerResource", "m_iHealth");
}
function closestTarget() { /*For noscope*/ 
    var local = Entity.GetLocalPlayer(), enemies = Entity.GetEnemies(), dists = [], damage = [];
    for(e in enemies) {
        if(!Entity.IsAlive(enemies[e]) || Entity.IsDormant(enemies[e]) || !Entity.IsValid(enemies[e])) continue;
        dists.push([enemies[e], calcDist(Entity.GetHitboxPosition(local, 0), Entity.GetHitboxPosition(enemies[e], 0))]);
    }
    dists.sort(function(a, b)
    {
        return a[1] - b[1];
    });
    if(dists.length == 0 || dists == []) return target = -1;
    return dists[0][0];
}
function calcDist(a, b) { /*For noscope*/ 
    x = a[0] - b[0],y = a[1] - b[1],z = a[2] - b[2];
    return Math.sqrt( x * x + y * y + z * z );
}

function get_metric_distance(a, b) { /*For noscope*/
    return Math.floor(Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2)) * 0.0254 );
}
function random(S, A) { /*For better aa*/
        var S = Math.ceil(S),
            A = Math.floor(A);
        return Math.floor(Math.random() * (A - S + 1)) + S;
}
function HSVtoRGB(m, B, w) { /*For visuals*/
    var e, n, u, l, o, k, j, A,l = Math.floor(m * 6),o = m * 6 - l,k = w * (1 - B),j = w * (1 - o * B),A = w * (1 - (1 - o) * B);
    switch (l % 6) {
    case 0:
        e = w, n = A, u = k;
        break;
    case 1:
        e = j, n = w, u = k;
        break;
    case 2:
        e = k, n = w, u = A;
        break;
    case 3:
        e = k, n = j, u = w;
        break;
    case 4:
        e = A, n = k, u = w;
        break;
    case 5:
        e = w, n = k, u = j;
        break
    }
    return {
        r: Math.round(e * 255),
        g: Math.round(n * 255),
        b: Math.round(u * 255)
    }
}
function player_connect(){ /* for manual */
    lastPressed = Global.Tickcount();
    oldTick = Global.Tickcount();
}
function pHurt() { /* for hitlogs */
    var alp = getval("Background alpha");
        attackerEntity = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
        localEntity = Entity.GetLocalPlayer();
     
        if (attackerEntity == localEntity) {
            victimName = Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("userid")));
         
            hitboxName = hitgroupToHitbox(Event.GetInt("hitgroup"));
         
            damageDone = Event.GetInt("dmg_health");
            healthRemaining = Event.GetInt("health");
         
            hurtLogs.push([victimName, hitboxName, damageDone, healthRemaining, 0, 255, (Math.random() * (0.2 - 1.200) + 1.200).toFixed(4), Globals.Curtime()]);
        }
    }
function showOrHide() {

        for (var i = 0; i < hurtLogs.length; i++) {
            hurtLogs[i][4]++;
            toSay =  "Hurt  in  "+ hitboxName  + "  for  "+ damageDone  + " | " + healthRemaining + "  health remaining";
            if(Globals.Curtime() - hurtLogs[i][7] < 3)
            {
                continue
            }
            hurtLogs[i][5] -= Globals.Frametime() * 700;
         
            if (hurtLogs[i][5] < 0) {
                hurtLogs.shift(i, 1);
            }
        }
    }
function hitgroupToHitbox(hitgroup) {
        hitbox = "generic";
     
        switch (hitgroup) {
            case 0:
            hitbox =  "head";
            break;
            case 1:
            hitbox =  "neck";
            break;
            case 2:
            hitbox =  "pelvis";
            break;
            case 3:
            hitbox =  "body";
            break;
            case 4:
            hitbox =  "chest";
            break;
            case 5:
            hitbox =  "chest";
            break;
            case 6:
            hitbox =  "chest";
            break;
            case 7:
            hitbox =  "thigh";
            break;
            case 8:
            hitbox =  "thigh";
            break;
            case 9:
            hitbox =  "calf";
            break;
            case 10:
            hitbox =  "calf";
            break;
            case 11:
            hitbox =  "foot";
            break;
            case 12:
            hitbox =  "foot";
            break;
            case 13:
            hitbox =  "hand";
            break;
            case 14:
            hitbox =  "hand";
            break;
            case 15:
            hitbox =  "arm";
            break;
            case 16:
            hitbox =  "arm";
            break;
            case 17:
            hitbox =  "arm";
            break;
            case 18:
            hitbox =  "arm";
        }
    return hitbox;
}
const CRender = {
    ShadowText(x, y, align, text, color1, color2, font) {
        Render.StringCustom(x+1, y+1, align, text, color2, font);
        Render.StringCustom(x, y, align, text, color1, font);
    },
    HSV2RGB(h,s,v) {
        var r, g, b, i, f, p, q, t;

        i = Math.floor(h * 6);
        f = h*6-i;
        p = v*(1-s);
        q = v*(1-f*s);
        t = v*(1-(1-f)*s);

        switch (i % 6) {
          case 0: r = v, g = t, b = p; break;
          case 1: r = q, g = v, b = p; break;
          case 2: r = p, g = v, b = t; break;
          case 3: r = p, g = q, b = v; break;
          case 4: r = t, g = p, b = v; break;
          case 5: r = v, g = p, b = q; break;
        }
        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    },
    FilledRect(x, y, w, h){
        const t = getval("Indicators style");
        const static = getcol("Static color line");
        const fade = getcol("Fade color line");
        const gradient1 = getcol("Gradient 1 color");
        const gradient2 = getcol("Gradient 2 color");
        const gradient3 = getcol("Gradient 3 color");
        var alp = getval("Background alpha");
        var rgb = CRender.HSV2RGB(Global.Realtime() / 4, 0.9, 1);
        var bottom = getval("Line position", 1);

        if (t != 3){
            
            var gradinetdir = t == 0 ? [static[0], static[1], static[2], static[3]] : t == 1 ? [0, 0, 0, 150] : t == 2 ? [gradient1[0], gradient1[1], gradient1[2], gradient1[3]] : [rgb.r, rgb.g, rgb.b, 255];
            var gradinetdir2 = t == 0 ? [static[0], static[1], static[2], static[3]] : t == 1 ? [fade[0], fade[1], fade[2], 255] : t == 2 ? [gradient2[0], gradient2[1], gradient2[2], gradient2[3]] : [rgb.g, rgb.b, rgb.r, 255];
            var gradinetdir3 = t == 0 ? [static[0], static[1], static[2], static[3]] : t == 1 ? [0, 0, 0, 150] : t == 2 ? [gradient3[0], gradient3[1], gradient3[2], gradient3[3]] : [rgb.b, rgb.r, rgb.g, 255];
            
            Render.FilledRect(x, y, w, h, [15, 15, 15, alp]);

            Render.GradientRect(x, bottom ? y + 17 : y -2, w / 2, 2, 1, gradinetdir, gradinetdir2);
            Render.GradientRect(x + w / 2, bottom ? y + 17 : y -2, w / 2, 2, 1, gradinetdir2, gradinetdir3);
            gr1 = gradinetdir
            gr2 = gradinetdir2
            gr3 = gradinetdir3
        } else {
            Render.FilledRect(x, y - 2, w, h + 2, [15, 15, 15, alp]);

            Render.GradientRect(x + 1, bottom ? y + 15 : y -1, w / 2 - 1, 1, 1, [0, 213, 255, 255], [204, 18, 204, 255]);
            Render.GradientRect(x + w / 2, bottom ? y + 15 : y -1, w / 2 - 1, 1, 1, [204, 18, 204, 255], [255, 250, 0, 255]);
            gr1 = [0, 213, 255, 255]
            gr2 = [204, 18, 204, 255]
            gr3 = [255, 250, 0, 255]

        }

    },
    Drag(x, y, width, height, menu, item){
        var cursor = Global.GetCursorPosition();
        if ((cursor[0] >= x) && (cursor[0] <= x + width) && (cursor[1] >= y) && (cursor[1] <= y + height)) {
            if ((Global.IsKeyPressed(0x01)) && (item[0] == 0)) {
                item[0] = 1;
                item[1] = x - cursor[0];
                item[2] = y - cursor[1];
            }
        }
        if (!Global.IsKeyPressed(0x01)) item[0] = 0;
        if (item[0] == 1 && UI.IsMenuOpen()) {
            setval(menu + "_x", cursor[0] + item[1]);
            setval(menu + "_y", cursor[1] + item[2]);
        }
    },
},
Anim = {
    Clamp(val, min, max) { return Math.min(Math.max(val, min), max) },
};
//Rage
function rage() {
    if (getval("Safety on lethal")) {
    enemy = Ragebot.GetTarget(),healh = getPlayerHealth(enemy);
    if (healh <= 90);
    Ragebot.ForceHitboxSafety(0)
    }
    weapon_name = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    if (getval("Adaptive noscope") && (weapon_name == "scar 20" || weapon_name == "g3sg1")) {
       if (back) {
          autoscope_cache = UI.GetValue("Rage", "GENERAL", "General", "Auto scope"),back = false;
        }       
    if(!Ragebot.GetTarget())
        target = closestTarget();
    else
        target = Ragebot.GetTarget();
    if(!Entity.IsAlive(target)) {
        UI.SetValue("Rage", "GENERAL", "General", "Auto scope", 1);
        return;
    }
    if(get_metric_distance(Entity.GetRenderOrigin(Entity.GetLocalPlayer()), Entity.GetRenderOrigin(target)) < 19) {
        UI.SetValue("Rage", "GENERAL", "General", "Auto scope", 0);
    } else {
        UI.SetValue("Rage", "GENERAL", "General", "Auto scope", 1);
    }
    } else {
     if (!back) {
        UI.SetValue("Rage", "GENERAL", "General", "Auto scope", autoscope_cache);
        back = true;
        }    
    }
    var targ = Ragebot.GetTarget();
    health = getPlayerHealth(targ);
    if (isAutoSniper(name)){
        if (!getval("HP/2 on dt (only auto)") == 1)
            return;
    if (!UI.IsHotkeyActive("Rage", "Exploits", "Doubletap"))
            return;

        if (!Entity.IsAlive(targ))
            return;

        switch (health)
        {
            case health >= 80: Ragebot.ForceTargetMinimumDamage(targ, 51); break;
            case health <= 79: Ragebot.ForceTargetMinimumDamage(targ, 41); break;
            case health >= 40 && health <= 59: Ragebot.ForceTargetMinimumDamage(targ, 31); break;
            case health >= 20 && health <= 39: Ragebot.ForceTargetMinimumDamage(targ, 21); break;
        }
    }
};
const autopeek = function() {
    var rule = Entity.GetGameRulesProxy();
    if (getval("Autopeek helper") && UI.IsHotkeyActive("Misc", "Movement", "Auto peek")) {
        !Entity.GetProp(rule, "CCSGameRulesProxy", "m_bIsValveDS") && !UI.IsHotkeyActive("Script items", "Freestand keybind") && UI.ToggleHotkey("Script items", "Freestand keybind");
        !Entity.GetProp(rule, "CCSGameRulesProxy", "m_bIsValveDS") && !UI.IsHotkeyActive("Rage", "GENERAL", "Doubletap") && UI.ToggleHotkey("Rage", "GENERAL", "Doubletap")
    }
}
//Manual
function ManualAA(){
    if (getval("Manual AA")){
        setenable("Color selected inverter", aa),
        setenable("Color selected arrow", aa),
        setenable("Color not selected arrow", aa),
        setenable("Left direction", aa),
        setenable("Right direction", aa);
    isLeftActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Left direction" );
    isRightActive = UI.IsHotkeyActive( "Misc", "JAVASCRIPT", "Script items", "Right direction" );
   
    if(isLeftActive && leftWasPressed == false)
    {  
        if (original_aa)
        {
            yaw_offset_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
            original_aa = false;
        }
        lastPressed = Global.Tickcount();
        isNotActive = false;
        leftWasPressed = true;
        rightWasPressed = false;
        drawLeft = 1;
        drawRight = 0;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", -90 );
    } else if( isLeftActive && leftWasPressed == true && Global.Tickcount() > lastPressed + 16 ) {
        isNotActive = true;
        oldTick = Global.Tickcount();
    }

    if(isRightActive && rightWasPressed == false)
    {  
        if (original_aa)
        {
            yaw_offset_cache = UI.GetValue ("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
            original_aa = false;
        }
        lastPressed = Global.Tickcount();
        isNotActive = false;
        leftWasPressed = false;
        rightWasPressed = true;
        drawLeft = 0;
        drawRight = 1;
        UI.SetValue( "Anti-Aim", "Rage Anti-Aim", "Yaw offset", 90 );
       
    } else if(isRightActive && rightWasPressed == true && Global.Tickcount() > lastPressed + 16){
        isNotActive = true;
        oldTick = Global.Tickcount();
    }

    if (isNotActive) {      
        if (Global.Tickcount() > oldTick + 16)  {
            yaw_offset_cache = UI.GetValue ("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
            rightWasPressed = false;
            leftWasPressed = false;
            oldTick = Global.Tickcount();
        }
       
        drawLeft = 0;
        drawRight = 0;
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yaw_offset_cache );
    }
    }
}

//Anti-Aim
const antiaim = function() {
        const S = UI.IsHotkeyActive("Anti-Aim", "Fake angels", "Inverter");
            A = getval("Body yaw type");
        A == 0 ? AntiAim.SetOverride(0) : AntiAim.SetOverride(1);
            if (A == 1) AntiAim.SetRealOffset(random(-getval("Real offset"), getval("Real offset"))), AntiAim.SetLBYOffset(random(-getval("LBY offset"), getval("LBY offset")));
            else A == 2 && (S ? AntiAim.SetRealOffset(getval("Real offset")) && AntiAim.SetLBYOffset(-getval("LBY offset")) : AntiAim.SetRealOffset(-getval("Real offset")) && AntiAim.SetLBYOffset(getval("LBY offset")));
    freestand_orig = getval("Freestand keybind")
    if (getval("Freestand on key"))
    {
        if (freestand_orig)
        {
            freestand_old = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction")
            freestand_orig = false;
        }
        if (UI.IsHotkeyActive("Script items","Freestand keybind"))
        {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", 1)
        }
        else
        {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", 0)
        }
    }
    else
    {
        if (!freestand_orig)
        {
            UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", freestand_old)
            freestand_orig = true;
        }
    } 
};
//Visuals
const visuals = function(){
    if(!World.GetServerString())
        return;
    const font = Render.AddFont("Verdana", 7, 400);
    const t = getval("Indicators style");
    var fl_value = (UI.GetValue("Anti-Aim", "Fake-Lag", "Limit")),
    today = new Date(),
    hours = today.getHours(),
    minutes = today.getMinutes(),
    hours = hours <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":",
    minutes = minutes <= 9 ? "0" + today.getMinutes() + "" : today.getMinutes(),
    tickrate = Globals.Tickrate().toString(),
    ping = Math.round(Local.Latency() * 1000 - 16),
    pos1 = getval("kb_x"),
    pos2 = getval("kb_y"),
    w = 146, h = 17, y = 4,
    today = new Date(),
    hours = today.getHours(),
    minutes = today.getMinutes(),
    hours = hours <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":",
    minutes = minutes <= 9 ? "0" + today.getMinutes() + "" : today.getMinutes(),
    tickrate = Globals.Tickrate().toString(),
    local_ping = Math.round(Local.Latency() * 1000 - 16),
    text = "infernal tech | " + Cheat.GetUsername() + " | ping: "+local_ping+" | tick: "+tickrate+" | time: " + hours + minutes,
    h_water = 18,
    w_water = Render.TextSizeCustom(text, font)[0] + 8,
    x_water = Global.GetScreenSize()[0],
    y_water = 10,
    alp = getval("Background alpha"),
    bottom = getval("Line position", 1);
    if(getval("Keybinds")) {
    for(var i = 0; i < binds.length; i++){
        if(UI.IsHotkeyActive.apply(null, binds[i][1])){
        binds[i][3] = 1; binds[i][4] = Anim.Clamp(binds[i][4] + (1 / .1) * Globals.Frametime(), 0, 1), 0, 1 - Math.pow(1 - 0.0025, 5)
        }if(!UI.IsHotkeyActive.apply(null, binds[i][1])){
        binds[i][4] = Anim.Clamp(binds[i][4] - (1 / .1) * Globals.Frametime(), 0, 1), 0, 1 - Math.pow(1 - 0.0025, 5); if (binds[i][4] <= 0) binds[i][3] = 0; }
        var name = binds[i][0], state = binds[i][2],add = binds[i][4];
        y += 16 * (add);
        CRender.ShadowText(pos1 + 4, pos2 + y + 3, 0, name, [255, 255, 255, 255 * add], [0, 0, 0, 200 * add], font);
        CRender.ShadowText(pos1 + w - Render.TextSizeCustom(state, font)[0] - 5, pos2 + y + 3, 0, state, [255, 255, 255, 255 * add], [0, 0, 0, 200 * add], font);
    }
    CRender.FilledRect(pos1, pos2, 146, 17);
    CRender.ShadowText(pos1 + (w / 2) - Render.TextSizeCustom("keybinds", font)[0] / 2, pos2 + 1, 0, "keybinds", [255, 255, 255, 255], [0, 0, 0, 200], font);
    CRender.Drag(pos1, pos2, w, 17, "kb", drag);
    }
    if (getval("Watermark")) {
        
        x_water = x_water - w_water - 10;
        Render.FilledRect(x_water, y_water + 2, w_water, h_water, [15, 15, 15, alp]);
        if (t != 3) {
        CRender.FilledRect(x_water, 13, w_water, 2);
        }
        else {
        CRender.FilledRect(x_water, 14, w_water, 1);
        }
        Render.StringCustom(x_water + 5, y_water + 6, 0, text, [0, 0, 0, 255], font);
        Render.StringCustom(x_water + 4, y_water + 5, 0, text, [255, 255, 255, 255], font);
    }
    const x_offset_ind = Global.GetScreenSize()[0];
    const y_offset_ind =  Global.GetScreenSize()[1] + 40; 
    var ind_keys = [],   
    is_dynamic = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "At targets"),
    is_dt = UI.IsHotkeyActive("Rage", "Exploits", "Doubletap"),
    is_fd = UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck"),
    is_jitter = getval("Body yaw type") == 1,
    is_static = getval("Body yaw type") == 2,
    is_hs = UI.IsHotkeyActive("Rage", "Exploits", "Hide shots"),
    y_adding = getval("Indicators y adding");
    if (Exploit.GetCharge() == 1) {
        var col_dt = [ 255, 255, 255, 255 ]
    }
    else {
        var col_dt = [ 200, 0, 0, 255 ]
    }
    if(getval("Indicators")) {
    ind_font = Render.AddFont("Verdana", 7, 600),
    under_font = Render.AddFont("Verdana", 6, 600),
    add_yx = 2;
    
    if(getval("Better Anti-aim")){
        Render.StringCustom( x_offset_ind / 2 - 36, is_jitter ? y_offset_ind / 2 + 15 + y_adding : is_static ? y_offset_ind / 2 + 15 + y_adding : y_offset_ind / 2 + 25 + y_adding, 0, "Infernal Tech", [ 0, 0, 0, 255 ], ind_font );
        Render.StringCustom( x_offset_ind / 2 - 35, is_jitter ? y_offset_ind / 2 + 16 + y_adding : is_static ? y_offset_ind / 2 + 16 + y_adding : y_offset_ind / 2 + 26 + y_adding, 0, "Infernal Tech", is_dynamic ? [ 249, 144, 59, 255 ] : [ 255,80,80, 255 ], ind_font ); 
        if(is_jitter) {
            Render.StringCustom( x_offset_ind / 2 - 34, y_offset_ind / 2 + 25 + y_adding, 0, "random jitter", [ 0, 0, 0, 255 ], under_font );
            Render.StringCustom( x_offset_ind / 2 - 33, y_offset_ind / 2 + 26 + y_adding, 0, "random jitter", [ 249, 144, 59, 255 ], under_font ); 
        }
        else if(is_static) {
            Render.StringCustom( x_offset_ind / 2 - 25, y_offset_ind / 2 + 25 + y_adding, 0, "static yaw", [ 0, 0, 0, 255 ], under_font );
            Render.StringCustom( x_offset_ind / 2 - 24, y_offset_ind / 2 + 26 + y_adding, 0, "static yaw", [ 255,80,80, 255 ], under_font ); 
        }
    }
    else {
    Render.StringCustom( x_offset_ind / 2 - 36, y_offset_ind / 2 + 25 + y_adding, 0, "Infernal Tech", [ 0, 0, 0, 255 ], ind_font );
    Render.StringCustom( x_offset_ind / 2 - 35, y_offset_ind / 2 + 26 + y_adding, 0, "Infernal Tech", is_dynamic ? [ 249, 144, 59, 255 ] : [ 255,80,80, 255 ], ind_font ); 
    }
    if(UI.GetValue("Anti-Aim", "Fake-Lag", "Enabled")){
        Render.StringCustom( is_fd ? x_offset_ind / 2 - 42 : is_dt ? x_offset_ind / 2 - 42 : is_hs ? x_offset_ind / 2 - 42 : x_offset_ind / 2 - 34, y_offset_ind / 2 + 35 + add_yx + y_adding, 0, is_fd ? "fake-lag: 0 (FD)" : is_dt ? "fake-lag: 0 (DT)" : is_hs ? "fake-lag: 0 (HS)" : "fake-lag: " + fl_value, [ 0, 0, 0, 255 ], ind_font );
        Render.StringCustom( is_fd ? x_offset_ind / 2 - 41 : is_dt ? x_offset_ind / 2 - 41 : is_hs ? x_offset_ind / 2 - 41 : x_offset_ind / 2 - 33, y_offset_ind / 2 + 36 + add_yx + y_adding, 0, is_fd ? "fake-lag: 0 (FD)" : is_dt ? "fake-lag: 0 (DT)" : is_hs ? "fake-lag: 0 (HS)" : "fake-lag: " + fl_value, is_dt ? col_dt : [ 214,123,250, 255 ], ind_font ); 
    }
    else {
        Render.StringCustom( x_offset_ind / 2 - 34, y_offset_ind / 2 + 35 + add_yx + y_adding, 0, "fake-lag: 0", [ 0, 0, 0, 255 ], ind_font );
        Render.StringCustom( x_offset_ind / 2 - 33, y_offset_ind / 2 + 36 + add_yx + y_adding, 0, "fake-lag: 0", [ 255,80,80, 255 ], ind_font ); 
    }
    for(var k in indicators){
        if(UI.IsHotkeyActive.apply(null, indicators[k][1])){
            ind_keys.push(k);
        }
    }
    for(var j in ind_keys){
        Render.StringCustom(x_offset_ind / 2 - 27, y_offset_ind / 2 + 59 - (j * -12) + y_adding, 0, indicators[ind_keys[j]][0], [0,0,0,255], ind_font),
        Render.StringCustom(x_offset_ind / 2 - 26, y_offset_ind / 2 + 60 - (j * -12) + y_adding, 0, indicators[ind_keys[j]][0], indicators[ind_keys[j]][2], ind_font);
    }
    } 
    if(getval("Hitlogs")) {
        const t = getval("Indicators style");
        const static = getcol("Static color line");
        const fade = getcol("Fade color line");
        const gradient1 = getcol("Gradient 1 color");
        const gradient2 = getcol("Gradient 2 color");
        const gradient3 = getcol("Gradient 3 color");
        var rgb = CRender.HSV2RGB(Global.Realtime() / 4, 0.9, 1);
        grad1 = t == 0 ? [static[0], static[1], static[2], static[3]] : t == 1 ? [0, 0, 0, 150] : t == 2 ? [gradient1[0], gradient1[1], gradient1[2], gradient1[3]] : [rgb.r, rgb.g, rgb.b, 255],
        grad2 = t == 0 ? [static[0], static[1], static[2], static[3]] : t == 1 ? [fade[0], fade[1], fade[2], 255] : t == 2 ? [gradient2[0], gradient2[1], gradient2[2], gradient2[3]] : [rgb.g, rgb.b, rgb.r, 255],
        grad3 = t == 0 ? [static[0], static[1], static[2], static[3]] : t == 1 ? [0, 0, 0, 150] : t == 2 ? [gradient3[0], gradient3[1], gradient3[2], gradient3[3]] : [rgb.b, rgb.r, rgb.g, 255];
        localplayer_index = Entity.GetLocalPlayer( );
        localplayer_alive = Entity.IsAlive( localplayer_index );
            if (localplayer_alive == true){
                screen = Render.GetScreenSize()
                textX = (screen[0]/2)
                textY = (screen[1]) - 162
         
                textYIncrement = 40;
                
                textCol = [255, 255, 255];
                
                for (var i = 0; i < hurtLogs.length; i++) {
                    currentLog = hurtLogs[i];
                 
                    victimName = currentLog[0];
                    hitboxName = currentLog[1];
                    damageDone = currentLog[2];
                    healthRemaining = currentLog[3];
                    
         
                    consolasFont = Render.AddFont("Verdana", 8, 100);
                 
                    currentTextPos = textY - (textYIncrement * i);
                 
                    toSay =  "Hurt  in  "+ hitboxName  + "  for  "+ damageDone  + " | " + healthRemaining + "  health remaining";
         
                    textCol = [255,255,255];
                    if (hurtLogs.length > 5) hurtLogs.shift();
                    if (healthRemaining > 0 || healthRemaining <= 0){
                        Render.FilledRect(textX - 130, currentTextPos - 2, 260, 22, [35,35,35,hurtLogs[i][5] + alp - hurtLogs[i][5]]);
                        if (t != 3) {
                            Render.GradientRect(textX - 130, bottom ? currentTextPos + 19 : currentTextPos - 2, 130, 2, 1, [grad1[0],grad1[1],grad1[2],grad1[3] + hurtLogs[i][5] - 255], [grad2[0],grad2[1],grad2[2],grad2[3] + hurtLogs[i][5] - 255]),
                            Render.GradientRect(textX, bottom ? currentTextPos + 19 : currentTextPos - 2, 130, 2, 1, [grad2[0],grad2[1],grad2[2],grad2[3] + hurtLogs[i][5] - 255], [grad3[0],grad3[1],grad3[2],grad3[3] + hurtLogs[i][5] - 255]);
                        }
                        else {
                            Render.GradientRect(textX - 129, bottom ? currentTextPos + 18 : currentTextPos, 130, 1, 1, [0,255,255,hurtLogs[i][5]], [255,0,255,hurtLogs[i][5]]),
                            Render.GradientRect(textX + 1, bottom ? currentTextPos + 18 : currentTextPos, 128, 1, 1, [255,0,255,hurtLogs[i][5]], [255,255,0,hurtLogs[i][5]]);
                        }
                        Render.StringCustom(textX + 1, currentTextPos + 1, 1, toSay, [0, 0, 0, hurtLogs[i][5]], consolasFont),
                        Render.StringCustom(textX, currentTextPos + 2, 1, toSay, [textCol[0], textCol[1], textCol[2], hurtLogs[i][5]], consolasFont);
                        
                    }
            }
        }  
    }
    if (getval("Manual AA")){
        if (!World.GetServerString()) return;
   
    isInverter = UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter"),
    isDesyncMode = UI.GetValue("Anti-Aim", "Fake angles", "Fake desync"),
    arrows_font = Render.AddFont("Calibri", 16, 400),
    arrow_type = getval("Arrows type"),
    color = getcol("Color selected inverter"),
    arrow = getcol("Color selected arrow"),
    arrown = getcol("Color not selected arrow");
   
    if (isInverter == 1)
    {   
        
        if(arrow_type == 0) {
        Render.StringCustom((screen_size[0] /2) - 56, (screen_size[1] /2) - 12, 0, "<",  [color[0], color[1], color[2], 255], arrows_font)
        Render.StringCustom((screen_size[0] /2) + 46, (screen_size[1] /2) - 12, 0, ">",  [arrown[0], arrown[1], arrown[2], arrown[3]], arrows_font)
        }
        else if(arrow_type == 1) {
        Render.FilledRect((screen_size[0] /2) - 48, (screen_size[1] /2) - 8, 2, 17, [color[0], color[1], color[2], 255]),
        Render.FilledRect((screen_size[0] /2) + 46, (screen_size[1] /2) - 8, 2, 17, [arrown[0], arrown[1], arrown[2], arrown[3]]);
        }             
    }
    else if(isInverter == 0)
    {
        if(arrow_type == 0) {
        Render.StringCustom((screen_size[0] /2) - 56, (screen_size[1] /2) - 12, 0, "<",  [arrown[0], arrown[1], arrown[2], arrown[3]], arrows_font)
        Render.StringCustom((screen_size[0] /2) + 46, (screen_size[1] /2) - 12, 0, ">",  [color[0], color[1], color[2], 255], arrows_font)
        }
        else if(arrow_type == 1) {
        Render.FilledRect((screen_size[0] /2) - 48, (screen_size[1] /2) - 8, 2, 17, [arrown[0], arrown[1], arrown[2], arrown[3]]),
        Render.FilledRect((screen_size[0] /2) + 46, (screen_size[1] /2) - 8, 2, 17, [color[0], color[1], color[2], 255]);        
        }  
    }
    if(drawLeft)
    {
        if(arrow_type == 0) {
        Render.StringCustom((screen_size[0] /2) - 66, (screen_size[1] /2) - 12, 0, "<",  [arrow[0], arrow[1], arrow[2], 255], arrows_font)
        }
        else if(arrow_type == 1) {
        Render.Polygon([RPy, RPz, RPx], [arrown[0], arrown[1], arrown[2], arrown[3]]),    
        Render.Polygon([LPx, LPz, LPy], [arrow[0], arrow[1], arrow[2], 255]);
        }
    }

    else if(drawRight)
    {
        if(arrow_type == 0) {
        Render.StringCustom((screen_size[0] /2) + 56, (screen_size[1] /2) - 12, 0, ">",  [arrow[0], arrow[1], arrow[2], 255], arrows_font)
        }
        else if(arrow_type == 1) {
        Render.Polygon([RPy, RPz, RPx], [arrow[0], arrow[1], arrow[2], 255]),     
        Render.Polygon([LPx, LPz, LPy], [arrown[0], arrown[1], arrown[2], arrown[3]]);
        }
    }

    else if(drawNotActive)
    {
        if(arrow_type == 0) {
        }
        else if(arrow_type == 1) {
        Render.Polygon([RPy, RPz, RPx], [arrown[0], arrown[1], arrown[2], arrown[3]]),      
        Render.Polygon([LPx, LPz, LPy], [arrown[0], arrown[1], arrown[2], arrown[3]]);
        }
    }  
    }
}
const misc = function() {
	if (getval("Aspect ratio changer")) {
    if (Convar.GetFloat("r_aspectratio") != getval("Aspect ratio")) {
        Convar.SetFloat("r_aspectratio", getval("Aspect ratio"))
    }
	}
	var alive = Entity.IsAlive(Entity.GetLocalPlayer()), ping = Math.round(Entity.GetProp(Entity.GetLocalPlayer(), "CPlayerResource", "m_iPing")).toString(), delay = getval("Ping limit"), pingenable = UI.IsHotkeyActive("Script items", "Pingspike keybind");
		
	if (pingenable && alive) {
       if (pingspike_back) {
        ping_cache = UI.GetValue( "Misc", "GENERAL", "Miscellaneous", "Extended backtracking"),pingspike_back = false;}		
		UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Extended backtracking", delay > ping);
	} else {
		if (!pingspike_back) {
		UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Extended backtracking", 0);
        pingspike_back = true;
		}		
	}
    if (!getval("Pingspike")) {
        UI.SetValue("Misc", "GENERAL", "Miscellaneous", "Extended backtracking", ping_cache);
    }
}
const misc1 = function() {
    if (getval("Custom thirdperson") && getval('Thirdperson distance') > 0) {
            UI.SetValue('Visual', 'WORLD', 'View', 'Thirdperson', getval('Thirdperson distance'));
    }   
    else {
        UI.SetValue('Visual', 'WORLD', 'View', 'Thirdperson', tp_old);
    }
	
    if (getval("Fps Boost")) {
        Convar.SetString("r_shadows", "0"),Convar.SetString("cl_csm_static_prop_shadows", "0"),Convar.SetString("cl_csm_shadows", "0"),Convar.SetString("cl_csm_world_shadows", "0"),Convar.SetString("cl_foot_contact_shadows", "0"),Convar.SetString("cl_csm_viewmodel_shadows", "0"),Convar.SetString("cl_csm_rope_shadows", "0"),Convar.SetString("cl_csm_sprite_shadows", "0"),Convar.SetString("violence_hblood", "0"),Convar.SetString("r_3dsky", "0"),Convar.SetString("r_drawrain", "0"),Convar.SetString("r_drawropes", "0"),Convar.SetString("r_drawsprites", "0"),Convar.SetString("r_drawparticles", "0"),Convar.SetString("fog_enable_water_fog", "0"),Convar.SetString("func_break_max_pieces", "0"),Convar.SetString("muzzleflash_light", "0"),Convar.SetString("r_eyemove", "0"),Convar.SetString("r_eyegloss", "0");
    } else {
        Convar.SetString("r_shadows", "1"),Convar.SetString("cl_csm_static_prop_shadows", "1"),Convar.SetString("cl_csm_shadows", "1"),Convar.SetString("cl_csm_world_shadows", "1"),Convar.SetString("cl_foot_contact_shadows", "1"),Convar.SetString("cl_csm_viewmodel_shadows", "1"),Convar.SetString("cl_csm_rope_shadows", "1"),Convar.SetString("cl_csm_sprite_shadows", "1"),Convar.SetString("violence_hblood", "1"),Convar.SetString("r_3dsky", "1"),Convar.SetString("r_drawrain", "1"),Convar.SetString("r_drawropes", "1"),Convar.SetString("r_drawsprites", "1"),Convar.SetString("r_drawparticles", "1"),Convar.SetString("fog_enable_water_fog", "1"),Convar.SetString("func_break_max_pieces", "1"),Convar.SetString("muzzleflash_light", "1"),Convar.SetString("r_eyemove", "1"),Convar.SetString("r_eyegloss", "1");
    }
}
const mindmg = function() { 
    weapon_name = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    if (UI.IsHotkeyActive("Script items", "Minimum Damage Override")) {
    if (weapon_name == "ssg 08") { damage = getval("Scout mindmg"); }
    if (weapon_name == "scar 20" || weapon_name == "g3sg1") { damage = getval("Auto mindmg"); }
    if (weapon_name == "awp") { damage_slider = getval("AWP mindmg"); }
    if (weapon_name == "r8 revolver" || weapon_name == "desert eagle") { damage = getval("Heavy Pistols mindmg"); }
    if (weapon_name == "p2000" || weapon_name == "five seven" || weapon_name == "p250" || weapon_name == "usp s" || weapon_name == "dual berettas" || weapon_name == "cz75 auto"  || weapon_name == "tec 9" || weapon_name == "glock 18") { damage = getval("Pistols mindmg"); }
    }
    if (!UI.IsHotkeyActive("Script items", "Minimum Damage Override")) return;
        enemies_m = Entity.GetEnemies();
    for(i = 0; i < enemies_m.length; i++){
     if (!Entity.IsValid(enemies_m[i])) continue;
     if (!Entity.IsAlive(enemies_m[i])) continue;
     Ragebot.ForceTargetMinimumDamage(enemies_m[i], damage);
    }
    
}
const minhc = function() { 
    hc_val = getval("Hitchance value");
    if (!UI.IsHotkeyActive("Script items", "Hitchance keybind")) return;
        enemies_m = Entity.GetEnemies();
    for(i = 0; i < enemies_m.length; i++){
     if (!Entity.IsValid(enemies_m[i])) continue;
     if (!Entity.IsAlive(enemies_m[i])) continue;
     Ragebot.ForceTargetHitchance(enemies_m[i], hc_val);    
    }
}
const invert = function() {
    var local_player = Entity.GetLocalPlayer()
    if (getval('AA inverter on stand')) {
        if (GetVelocity(local_player) <= 1) {
        UI.ToggleHotkey('Anti-Aim', 'Fake angles', 'Inverter')
        }
    } 
}
const leg_fuck = function() {
    leg_break = Globals.Realtime() * 30 % 6;
    if(getval("Leg fucker")) {
    if (leg_break > 4) {
        UI.SetValue("Misc", "General", "Movement", "Slide walk", true);
    } else {
        UI.SetValue("Misc", "General", "Movement", "Slide walk", false);
    }
    }
}
const ctag = function() {
    if (World.GetServerString()) {
        O = parseInt((Globals.Curtime() * 4))
        O != lasttime_ct && Local.SetClanTag (getval('Clan-tag') ? tag[O % tag.length] : ''), lasttime_ct = O;
    }
}
//UNLOAD
function unload() {
    AntiAim.SetOverride(0),AntiAim.SetFakeOffset(0),AntiAim.SetRealOffset(0),AntiAim.SetLBYOffset(0);
	if (UI.GetValue("Misc", "GENERAL", "Miscellaneous", "Hidden cvars")) {	
        Global.ExecuteCommand("r_aspectratio 0");
    }
	UI.SetValue( "Misc", "GENERAL", "Miscellaneous", "Extended backtracking", false);
}
//CALLBACKS
function hooked_events() {
Cheat.RegisterCallback("Draw", "UI_menu"),
Cheat.RegisterCallback("CreateMove", "rage"),
Cheat.RegisterCallback("CreateMove", "mindmg"),
Cheat.RegisterCallback("CreateMove", "minhc"),
Cheat.RegisterCallback("CreateMove", "ManualAA"),
Cheat.RegisterCallback("CreateMove","antiaim"),
Cheat.RegisterCallback("CreateMove","invert"),
Cheat.RegisterCallback("Draw", "autopeek"),
Cheat.RegisterCallback("Draw", "visuals"),
Cheat.RegisterCallback("player_hurt", "pHurt"),
Cheat.RegisterCallback("Draw", "showOrHide"),
Cheat.RegisterCallback("CreateMove", "misc"),
Cheat.RegisterCallback("CreateMove", "leg_fuck"),
Cheat.RegisterCallback("CreateMove", "ctag"),
Cheat.RegisterCallback("Draw", "misc1"),
Cheat.RegisterCallback("player_connect_full", "player_connect"),
Cheat.RegisterCallback("Unload", "unload");
}
hooked_events();
UI.AddLabel(" <----------------------------------->");
Cheat.PrintChat(">>  \x10 Infernal tech loaded"),
Cheat.PrintChat(">>  \x10 Current version - 2.0"),
Cheat.PrintChat(">>  \x10 Welcome to Infernal tech knight"),
Cheat.PrintChat(">>  \x10 Discord: https://discord.gg/C45CgHaB"),
Cheat.PrintChat(">>  \x10 Logged in as: " + Cheat.GetUsername());
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.PrintColor([250,81,85,255],  "    █  ███▄▄▄▄      ▄████████    ▄████████    ▄████████ ███▄▄▄▄      ▄████████  ▄█" + "\n"),
Cheat.PrintColor([250,93,85,255],  "   ███  ███▀▀▀██▄   ███    ███   ███    ███   ███    ███ ███▀▀▀██▄   ███    ███ ███" + "\n"),
Cheat.PrintColor([250,105,85,255], "  ████  ███   ███   ███    █▀    ███    █▀    ███    ███ ███   ███   ███    ███ ███" + "\n"),
Cheat.PrintColor([250,117,85,255], "  ████▌ ███   ███  ▄███▄▄▄      ▄███▄▄▄      ▄███▄▄▄▄██▀ ███   ███   ███    ███ ███" + "\n"),
Cheat.PrintColor([250,129,85,255], "  ████▌ ███   ███ ▀▀███▀▀▀     ▀▀███▀▀▀     ▀▀███▀▀▀▀▀   ███   ███ ▀███████████ ███" + "\n"),
Cheat.PrintColor([250,141,85,255], "   ███  ███   ███   ███          ███    █▄  ▀███████████ ███   ███   ███    ███ ███" + "\n"),
Cheat.PrintColor([250,153,85,255], "   ███  ███   ███   ███          ███    ███   ███    ███ ███   ███   ███    ███ ███▌    ▄" + "\n"),
Cheat.PrintColor([250,165,85,255], "   █▀    ▀█   █▀    ███          ██████████   ███    ███  ▀█   █▀    ███    █▀  █████▄▄██" + "\n"),
Cheat.PrintColor([250,177,85,255], "                                              ███    ███                        ▀" + "\n"),
Cheat.Print("\n"),
Cheat.PrintColor([255,255,255,255],"       ███        ▄████████  ▄████████    ▄█    █▄          ▄█    █▄   ▄███████▄ " + "\n"),
Cheat.PrintColor([255,255,255,255],"   ▀█████████▄   ███    ███ ███    ███   ███    ███        ███    ███ ██▀     ▄██ " + "\n"),
Cheat.PrintColor([255,255,255,255],"      ▀███▀▀██   ███    █▀  ███    █▀    ███    ███        ███    ███       ▄███▀" + "\n"),
Cheat.PrintColor([255,255,255,255],"       ███   ▀  ▄███▄▄▄     ███         ▄███▄▄▄▄███▄▄      ███    ███     ▄███▀ " + "\n"),
Cheat.PrintColor([255,255,255,255],"       ███     ▀▀███▀▀▀     ███        ▀▀███▀▀▀▀███▀       ███    ███   ▄███▀   " + "\n"),
Cheat.PrintColor([255,255,255,255],"       ███       ███    █▄  ███    █▄    ███    ███        ███    ███ ▄███▀ " + "\n"),
Cheat.PrintColor([255,255,255,255],"       ███       ███    ███ ███    ███   ███    ███        ███    ███ ███▄     ▄█ " + "\n"),
Cheat.PrintColor([255,255,255,255],"      ▄████▀     ██████████ ████████▀    ███    █▀          ▀██████▀   ▀████████▀ " + "\n"),
Cheat.Print("\n"),
Cheat.PrintColor([250,27,85,255],  "                                             █" + "\n"),
Cheat.PrintColor([250,231,85,255], "                                           █▀ ▀█" + "\n"),
Cheat.PrintColor([250,231,85,255], "                                          ██   ██ " + "\n"),
Cheat.PrintColor([250,231,85,255], "                                          ▀█▄ ▄█▀ " + "\n"),
Cheat.PrintColor([161,85,55,255],  "                                           █   █ " + "\n"),
Cheat.PrintColor([161,85,55,255],  "                                           █   █ " + "\n"),
Cheat.PrintColor([161,85,55,255],  "                                           █   █ " + "\n"),
Cheat.PrintColor([161,85,55,255],  "                                           █   █  " + "\n"),
Cheat.PrintColor([161,85,55,255],  "                                           █   █ " + "\n"),
Cheat.PrintColor([255,255,255,255],"                                      ▄▄▄▄▄█   █▄▄▄▄▄" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                    ▄█               █▄" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                   ▄█  █▀▀▀█▀█▀█▀▀▀█  █▄" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                   █  █▀   █ █ █   ▀█  █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                    █ █    █ █ █    █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                    █ █    █ █ █    █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                     █▀    █ █ █    ▀█" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                           █ █ █" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                            ███" + "\n"),
Cheat.PrintColor([255,255,255,255],"                                             █" + "\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print('\n'),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.Print("\n"),
Cheat.PrintColor([250,93,85,255],  '>> Infernal tech loaded' + '\n'),
Cheat.PrintColor([250,105,85,255], '>> Current version - 2.0' + '\n'),
Cheat.PrintColor([250,117,85,255], '>> Welcome to Infernal tech knight' + '\n'),
Cheat.PrintColor([250,129,85,255], '>> Discord: https://discord.gg/C45CgHaB' + '\n'),
Cheat.PrintColor([250,141,85,255], '>> Logged in as: ' + Cheat.GetUsername()  + '\n');