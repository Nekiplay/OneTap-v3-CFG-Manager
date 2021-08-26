var local = Entity.GetLocalPlayer();
var doubletap_bak = false;
var hideshots_bak = false;
var duck_bak = false;
var duck = false;
UI.AddSliderInt("", 0,0);
UI.AddHotkey("VALVE Fake duck");
UI.AddSliderInt("", 0,0);
UI.AddLabel("UNBIND YOUR DEFAULT FAKE DUCK");
UI.AddSliderInt("THIS SCRIPT WILL BREAK FAKE-LAG", 0,0);
UI.AddSliderInt("Min Height", 47,60);
UI.AddSliderInt("Max Height", 47,60);
UI.AddSliderInt("Max Choke Count", 1,16);
UI.AddCheckbox("No Fake-Lag On Max Height");
UI.AddSliderInt("Created by slyheech#7226", 0,0);
function main(){
local = Entity.GetLocalPlayer();
height = Math.round(Entity.GetEyePosition(local)[2] - Entity.GetHitboxPosition(local, 12)[2]);
if(UI.IsHotkeyActive("Script items", "VALVE Fake duck")){
duck_bak = true;

if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap")){
doubletap_bak = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap");
UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap");
}
if(UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots")){
hideshots_bak = UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Hide shots");
UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Hide shots");
}

UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", UI.GetValue("Script items", "Max Choke Count"));
UI.SetValue("Anti-Aim", "Fake-Lag", "Jitter", 0);

if(height <= UI.GetValue("Script items", "Min Height")){
Cheat.ExecuteCommand("-duck");
duck = false;
fakelag(false);
return;
}
if(height > UI.GetValue("Script items", "Min Height") && height < UI.GetValue("Script items", "Max Height")){
fakelag(true);
}
if(height >= UI.GetValue("Script items", "Max Height")){
if(UI.GetValue("Script items", "No Fake-Lag On Max Height")){
fakelag(false);
}
Cheat.ExecuteCommand("+duck");
duck = true;
return;
}
}
else{
fakelag(false);
if(doubletap_bak == true){
UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap");
doubletap_bak = false;
}
if(hideshots_bak == true){
UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Hide shots");
hideshots_bak = false;
}
if(duck_bak == true){
Cheat.ExecuteCommand("-duck");
duck_bak = false;
}
}
}
function fakelag(state){
UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", state);
}
Cheat.RegisterCallback("Draw", "main");