//
// By iDesync, for YouGame.biz
//

const size = Render.GetScreenSize();

UI.AddLabel("|--------------------------------------------|");

UI.AddCheckbox("Enable Jump Scout");
UI.AddSliderInt("Scout Hitchance in Jump:", 0, 100);

//---position---//
UI.AddCheckbox("j_Enable indicator");
UI.AddCheckbox("j_Custom position");
//---//

//---val---//
UI.AddSliderInt("j_Height:", 0, size[0]);
UI.AddSliderInt("j_Width:", 0, size[1]);
//---//

UI.AddLabel("|--------------------------------------------|");


//-------------------------------DO WORK-------------------------------//

function doWork()
{
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Scout Hitchance in Jump:", UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Jump Scout") ? true : false);
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "j_Enable indicator", UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Jump Scout") ? true : false);
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "j_Custom position", UI.GetValue("Misc", "JAVASCRIPT", "Script items", "j_Enable indicator") ? true : false);
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "j_Height:", UI.GetValue("Misc", "JAVASCRIPT", "Script items", "j_Custom position") ? true : false);
	UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "j_Width:", UI.GetValue("Misc", "JAVASCRIPT", "Script items", "j_Custom position") ? true : false);
	
	
	if (Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())) != "ssg 08") // if weapon != scout, exit
		return;
		
	if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Enable Jump Scout"))
		return;
		
	value = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Scout Hitchance in Jump:"); // update value from us slider
	
	
	//---SETUP VALUES--//
	
	if (Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_hGroundEntity")) { // on player jump
	
		Ragebot.ForceTargetHitchance(Ragebot.GetTarget(), value);
		isActive = true;
	}
	
	else 
		isActive = false;
}


function indicator()
{	
	if (!UI.GetValue("Misc", "JAVASCRIPT", "Script items", "j_Enable indicator") || !isActive)
		return;
	
	if (!Entity.IsAlive(Entity.GetLocalPlayer()))
		return;
	
	if (Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer())) != "ssg 08") // if weapon != scout, exit
		return;
	
	X = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "j_Height:"); // update values 
	Y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "j_Width:"); // from us sliders
	
	//-------------------------RENDER-------------------------//
	if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "j_Custom position"))
		Render.String(X, Y, 0, "Jump Scout", [255, 255, 255, 255]);
	
	else
		Render.String(size[0] / 2, size[1] / 2 + 400, 0, "Jump Scout", [255, 255, 255, 255]);
}



Cheat.RegisterCallback("CreateMove", "doWork");
Cheat.RegisterCallback("Draw", "indicator");