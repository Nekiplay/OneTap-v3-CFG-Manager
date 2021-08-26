const print = function(text){
    Cheat.Print(text.toString() + "\n");
}
const getval = function(name){
    return UI.GetValue("Script items", name);
}
const getcol = function(name){
    return UI.GetColor("Script items", name);
}

const arc_poly = function(center, radius, a_min, a_max, num_segments, thiccboi, color){
    if (radius == 0.0) return;
    var prevpos = 0;
    for (var i = 0; i <= num_segments; i++)
    {
        const a = a_min + (i / num_segments) * (a_max - a_min);
        const a_next = a_min + ((i+1) / num_segments) * (a_max - a_min);

        const renderat = [center[0] + Math.cos(a) * radius, center[1] + Math.sin(a) * radius];
        const renderat_next = [center[0] + Math.cos(a_next) * radius, center[1] + Math.sin(a_next) * radius];

        const top = [renderat[0] - (Math.cos(a) * thiccboi), renderat[1] - (Math.sin(a) * thiccboi)];
        const top_next = [renderat_next[0] - (Math.cos(a_next) * thiccboi), renderat_next[1] - (Math.sin(a_next) * thiccboi)];

        if(prevpos != 0){
            Render.Polygon([[top[0],top[1]],[prevpos[0], prevpos[1]],[renderat[0], renderat[1]]], color);
            if(i != num_segments)
                Render.Polygon([[renderat[0],renderat[1]], [top_next[0], top_next[1]], [top[0], top[1]]], color);
        } else Render.Polygon([[renderat[0],renderat[1]], [top_next[0], top_next[1]], [top[0], top[1]]], color);
        
        prevpos = renderat;
    }
}

const arc_line = function(center, radius, a_min, a_max, num_segments, color){
    if (radius == 0.0) return;
    var prevpos = 0
    for (var i = 0; i <= num_segments; i++)
    {
        const a = a_min + (i / num_segments) * (a_max - a_min);
        var renderat = [center[0] + Math.cos(a) * radius, center[1] + Math.sin(a) * radius];
        if(prevpos != 0)
        Render.Line(prevpos[0], prevpos[1], renderat[0], renderat[1], color);
        
        prevpos = renderat;
    }
}

const calc_angle = function(vec1, vec2){
    var qAngles = [0,0,0];
	var delta = [(vec1[0] - vec2[0]), (vec1[1] - vec2[1]), (vec1[2] - vec2[2])];
	var hyp = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
	qAngles[0] = (Math.atan(delta[2] / hyp) * (180.0 / Math.PI));
	qAngles[1] = (Math.atan(delta[1] / delta[0]) * (180.0 / Math.PI));
	qAngles[2] = 0;
	if (delta[0] >= 0)
		qAngles[1] = qAngles[1]+180;
	return qAngles;
}

const deg2rad2 = function(x){
    return x * (Math.PI / 180.0);
}

const screen_size = Render.GetScreenSize()
const screen_center = [screen_size[0] / 2, screen_size[1] / 2];

const is_on_screen = function(origin){
    const w2s = Render.WorldToScreen(origin);
    if(!w2s) return false;
    return screen_size[0] > w2s[0] && screen_size[1] > w2s[1];
}

UI.AddLabel("       Neverlose OOF by @lenin");
UI.AddCheckbox("Only invisible");
UI.AddCheckbox("Disable sounds");
UI.AddSliderInt("Size", 0, 10);
UI.AddSliderInt("Radius", 6, 500);
UI.AddSliderInt("Segments", 3, 128);
UI.AddColorPicker("Color");

if( !getval("Disable sounds") ) Cheat.ExecuteCommand("play music\\kill_03"); // lmao

const main = function(){
    const enemies = Entity.GetEnemies();
    const viewangles = Local.GetViewAngles();
    const localorigin = Entity.GetEyePosition(Entity.GetLocalPlayer());
    const values = {only_invis: getval("Only invisible"), radius: getval("Radius"), size: getval("Size"), segments: getval("Segments"), color: getcol("Color")};
    for (i=0; i<enemies.length; i++)
    {
        if(!Entity.IsDormant(enemies[i]) && Entity.IsAlive(enemies[i])){
            const hitbox_pos = Entity.GetRenderOrigin(enemies[i]);
            if(!(values.only_invis && is_on_screen(hitbox_pos))){
                const angle = viewangles[1] - calc_angle(localorigin, hitbox_pos)[1] - 90;
                arc_poly(screen_center, values.radius + 6 + (values.size * 2), deg2rad2(angle - values.size), deg2rad2(angle + values.size), values.segments, 4.5, values.color);
                arc_line(screen_center, values.radius + (values.size * 2) - 1, deg2rad2(angle - values.size), deg2rad2(angle + values.size), values.segments, values.color);
            }
        }
    }
}
Cheat.RegisterCallback("Draw", "main");