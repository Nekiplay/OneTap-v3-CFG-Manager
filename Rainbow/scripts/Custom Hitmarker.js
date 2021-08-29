const print = function(text, color){
    if(color == undefined)
    Cheat.Print(text.toString() + "\n");
    else
    Cheat.PrintColor(color, text.toString() + "\n");
}
const getval = function(name){
    return UI.GetValue("Script items", name);
}
const setval = function(name, value){
    return UI.SetValue("Script items", name, value);
}
const getcol = function(name){
    return UI.GetColor("Script items", name);
}
const get_dropdown_value = function(value, index){
    const mask = 1 << index;
    return value & mask ? true : false;
}

var shots = [];

const is_bidlo = function(value){
    for(var i in shots){
        if(shots[i].tickcount == value)
            return true;
    }
    return false;
}

const text = function(outline, x, y, a, text, color, font)
{
    if(outline){
        Render.StringCustom(x + 1, y, a, text, [0, 0, 0, color[3]], font);
        Render.StringCustom(x - 1, y, a, text, [0, 0, 0, color[3]], font);
        Render.StringCustom(x, y + 1, a, text, [0, 0, 0, color[3]], font);
        Render.StringCustom(x, y - 1, a, text, [0, 0, 0, color[3]], font);
    }
    Render.StringCustom(x, y, a, text, color, font);
}

const cross = function(x,y,size,color,type){
    switch(type){
        case 0:
            Render.Line(x - size, y - size, x + size, y + size, color);
            Render.Line(x - size, y + size, x + size, y - size, color);
        break;

        case 1:
            Render.Line(x + size, y + size, x + (size / 3), y + (size / 3), color);
            Render.Line(x + size, y - size, x + (size / 3), y - (size / 3), color);
            Render.Line(x - size, y - size, x - (size / 3), y - (size / 3), color);
            Render.Line(x - size, y + size, x - (size / 3), y + (size / 3), color);
        break;

        case 2:
            Render.Line(x - size, y, x + size, y, color);
            Render.Line(x, y + size, x, y - size, color);
        break;

        case 3:
            Render.Line(x + size, y, x + (size / 3), y, color);
            Render.Line(x, y - size, x, y - (size / 3), color);
            Render.Line(x - size, y, x - (size / 3), y, color);
            Render.Line(x, y + size, x, y + (size / 3), color);
        break;

        case 4:
            Render.Line(x + size, y + size, x + (size / 4), y + (size / 4), color);
            Render.Line(x + size, y - size, x + (size / 4), y - (size / 4), color);
            Render.Line(x - size, y - size, x - (size / 4), y - (size / 4), color);
            Render.Line(x - size, y + size, x - (size / 4), y + (size / 4), color);
            Render.Circle(x,y,size/1.5,color);
        break;
    }
}

const screen_size = Render.GetScreenSize();
UI.AddLabel("    Custom hitmarkers by K1nG#1835");
UI.AddLabel("");

UI.AddDropdown("Cross position", ["Static - hitbox pos", "Dynamic - world pos"]);
UI.AddDropdown("Cross type", ["Default", "Gapped", "Plus", "Plus gapped", "Circle gapped"]);
UI.AddSliderInt("Cross size", 3, 15);

UI.AddCheckbox("Animated");
UI.AddSliderFloat("Animation speed", 0.5, 2.0);
UI.AddSliderInt("Erase time", 100, 1000);
UI.AddCheckbox("Lines from screen center");
UI.AddColorPicker("Cross & lines color");

UI.AddCheckbox("Damage");
UI.AddColorPicker("Damage color");
UI.AddCheckbox("Damage fly up");
UI.AddSliderFloat("Damage fly up speed", 0.01, 1.0);
UI.AddCheckbox("Damage outline");

UI.AddLabel("");
UI.AddCheckbox("Disable sounds");

if( !getval("Disable sounds") ) Cheat.ExecuteCommand("play music\\kill_03"); // lmao

const main = function(){
    const font = Render.AddFont("Verdana", 8, 600);
    const values = {cross_size: getval("Cross size"), cross_color: getcol("Cross & lines color"), animated: getval("Animated"), animation_speed: getval("Animation speed"), delay: getval("Erase time"), lines: getval("Lines from screen center"), damage: getval("Damage"), damage_color: getcol("Damage color"), damage_fly: getval("Damage fly up"), damage_fly_speed: getval("Damage fly up speed"), damage_outline: getval("Damage outline")};
    for(var i in shots){
        const s = shots[i];
        if(s.didhit){
            if(s.alpha<255 && s.erase_time == values.delay) s.alpha+=values.animation_speed;
            if(s.alpha>=255 && s.erase_time > 0) s.erase_time -= 0.5; else if(s.erase_time <= 0) s.alpha-=values.animation_speed;
            if(s.alpha <= 0 && s.erase_time <= 0) shots.splice(i, 1);

            const w2s = Render.WorldToScreen(s.pos);
            const color = [values.cross_color[0],values.cross_color[1],values.cross_color[2],values.animated ? (s.alpha > 255 ? 255 : s.alpha) : values.cross_color[3]];
            const color_dmg = [values.damage_color[0],values.damage_color[1],values.damage_color[2],values.animated ? (s.alpha > 255 ? 255 : s.alpha) : values.damage_color[3]];
            cross(w2s[0], w2s[1], values.cross_size, color, s.cross_type);
            if(values.damage) text(values.damage_outline, w2s[0],w2s[1] - 30 - s.damage_fly,1,s.damage.toString(),color_dmg,font);
            if(values.damage_fly) s.damage_fly += values.damage_fly_speed;
            if(values.lines && (w2s[1] < screen_size[1] && w2s[1] > 0)) Render.Line(screen_size[0] / 2, screen_size[1] / 2, w2s[0], w2s[1], color);
        }
    }
}

const hitgroup_to_hitbox = {1: 0, 2: 5, 3: 2, 4: 13, 5: 14, 6: 12, 7: 11};
const bullet_impact = function(){
    if(shots.length > 3) shots.shift();
    const uid = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    if(Entity.IsLocalPlayer(uid) && !is_bidlo(Globals.Tickcount()))
        if(getval("Cross position"))
            shots.push({pos: [Event.GetFloat("x"),Event.GetFloat("y"),Event.GetFloat("z")], didhit: 0, tickcount: Globals.Tickcount(), cross_type: getval("Cross type"), alpha: getval("Animated") ? 0 : 255, erase_time: getval("Erase time"), damage: 0, damage_fly: 0});
}

const player_hurt = function(){
    const uid = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    const attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));
    if(Entity.IsLocalPlayer(attacker) && uid != attacker){
        if(!getval("Cross position")) shots.push({pos: Entity.GetHitboxPosition(uid, hitgroup_to_hitbox[Event.GetInt("hitgroup")] != undefined ? hitgroup_to_hitbox[Event.GetInt("hitgroup")] : 3), didhit: 1, tickcount: Globals.Tickcount(), cross_type: getval("Cross type"), alpha: getval("Animated") ? 0 : 255, erase_time: getval("Erase time"), damage: Event.GetInt("dmg_health"), damage_fly: 0}); else {
            for (var i in shots){
                if(shots[i].tickcount == Globals.Tickcount() && !shots[i].didhit){
                    shots[i].didhit = true;
                    shots[i].damage = Event.GetInt("dmg_health");
                }
            }
        }
    }
}

Cheat.RegisterCallback("Draw", "main");
Cheat.RegisterCallback("bullet_impact", "bullet_impact");
Cheat.RegisterCallback("player_hurt", "player_hurt");