UI.AddLabel("----------Created--by--oXEKo----------")
UI.AddHotkey("Auto peek key")
UI.AddColorPicker("Auto peek active glow color")
UI.AddColorPicker("Auto peek pasive glow color")
UI.AddSliderFloat( "Glow radius", 0.0, 25.0 )
UI.AddSliderFloat( "Detalization glow", 0.0, 0.9 )
UI.AddSliderInt( "Polygon count", 11, 180)

function draw_circle_3d(x, y, z, start_at, color1, v1, autopeekactive, color2) {
	
	var detalization = 1 - UI.GetValue("Script items", "Detalization glow")
	var Polygoncount = UI.GetValue("Script items", "Polygon count")
	
	const v2 = color1[3] / v1 
	const v3 = color2[3] / v1 
	
	var ra = 0.0
    var accuracy = 10
    var old_x
	var old_y
    start_at = start_at + 1
	for (; ra <= v1; ra += detalization) {
		for (rot=start_at; rot < 360 + start_at + 1; rot+=accuracy) {
			rot_r = rot * (Math.PI / Polygoncount)
			line_x = ra * Math.cos(rot_r) + x
			line_y = ra * Math.sin(rot_r) + y
			var curr = Render.WorldToScreen([line_x, line_y, z])
			var cur = Render.WorldToScreen([x, y, z]);
			if (cur[0] != null && curr[0] != null && old_x != null) {
				if(!autopeekactive)
					Render.Polygon([ [curr[0], curr[1]], [old_x, old_y], [cur[0], cur[1]] ], [color2[0], color2[1], color2[2], color2[3] - v3 * ra])
				else
					Render.Polygon([ [curr[0], curr[1]], [old_x, old_y], [cur[0], cur[1]] ], [color1[0], color1[1], color1[2], color1[3] - v2 * ra])
			}
			old_x = curr[0], old_y = curr[1];
		}
	}
}

var active = false

function on_fire(){
    if (Entity.GetEntityFromUserID(Event.GetString("userid")) == Entity.GetLocalPlayer()){
		active = true
	}
}

Cheat.RegisterCallback("weapon_fire", "on_fire")

function drawglow() {
	
	if(!Entity.IsAlive(Entity.GetLocalPlayer()))
		return
	
    var color1 = UI.GetColor("Script items", "Auto peek active glow color")
	var color2 = UI.GetColor("Script items", "Auto peek pasive glow color")
	var radius = UI.GetValue("Script items", "Glow radius")
	var velocity = Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_vecVelocity[0]")
	var speed = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1] + velocity[2] * velocity[2])
	var localorigin = Entity.GetRenderOrigin( Entity.GetLocalPlayer( ) );
	
	if(UI.IsHotkeyActive("Script items", "Auto peek key")){
		
		if(active && canstop(localorigin[0] ,local_origin[0], localorigin[1] ,local_origin[1]))
			active = false
		
		draw_circle_3d(local_origin[0], local_origin[1], local_origin[2], 0.150, color1, radius, active, color2)
		
	}
	else{
		local_origin = Entity.GetRenderOrigin( Entity.GetLocalPlayer( ) );
		active = false
	}
}

Global.RegisterCallback("Draw", "drawglow");


function CreateMove() {
	
	if(!Entity.IsAlive(Entity.GetLocalPlayer()))
		return
	
	if(active)
		move_to_start(local_origin)
}

Global.RegisterCallback("CreateMove", "CreateMove");

function move_to_start(destination, a) {
    var local = Entity.GetLocalPlayer()
    var origin = Entity.GetRenderOrigin(local)
    origin[2] = Entity.GetEyePosition(local)[2]
    var delta = [destination[0] - origin[0], destination[1] - origin[1], destination[2] - origin[2]]
    var yaw = Local.GetViewAngles()[1]
    var cmdMove = []

    var speed = 14

    cmdMove[0] = (((Math.sin(yaw / 180 * Math.PI)) * delta[1]) + (Math.cos(yaw / 180 * Math.PI) * delta[0])) * 14
    cmdMove[1] = (((Math.sin(yaw / 180 * Math.PI)) * delta[0]) + (Math.cos(yaw / 180 * Math.PI) * -delta[1])) * 14
    cmdMove[2] = 0

    var length = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1] + delta[2] * delta[2])
	var velo = Entity.GetProp(local, "DT_CSPlayer", "m_vecVelocity[0]")
    var length2 = Math.sqrt(velo[0] * velo[0] + velo[1] * velo[1] + velo[2] * velo[2])

    UserCMD.SetMovement(cmdMove);
    return length < (a ? a : 1) && (length2 < 2 || a);
}

function canstop(x_from, x_to, y_from, y_to){
	
	var x_radius = Math.floor(x_from) - Math.floor(x_to) < 0 ? Math.floor(x_from) - Math.floor(x_to) * -1 : Math.floor(x_from) - Math.floor(x_to)
	var y_radius = Math.floor(y_from) - Math.floor(y_to) < 0 ? Math.floor(y_from) - Math.floor(y_to) * -1 : Math.floor(y_from) - Math.floor(y_to)	
	
	if(x_radius < 2 && y_radius < 2)
		return true
	else
		return false
}