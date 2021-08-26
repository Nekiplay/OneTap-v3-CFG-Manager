UI.AddCheckbox("Draw indicators");
UI.AddSliderInt("Indicator offset X", 1, 1920);
UI.AddSliderInt("Indicator offset Y", 1, 1080);
UI.AddHotkey("Min damage override");
UI.AddSliderInt( "DMG", 1, 130 );
var slider_values = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "DMG")

function minDamageOverride(){
	if(!UI.IsHotkeyActive('Script items', 'Min damage override')) return;
	enemies = Entity.GetEnemies();
	for(i = 0; i < enemies.length; i++){
        if (!Entity.IsValid(enemies[i])) continue;
        if (!Entity.IsAlive(enemies[i])) continue;
        Ragebot.ForceTargetMinimumDamage(enemies[i], slider_values);
    }
}

function drawFunction(){
    var shouldDraw = UI.GetValue("Misc", "JAVASCRIPT", "Script Items", "Draw indicators");
    if (shouldDraw) {
        
        var screen_size = Global.GetScreenSize();
        var x = (UI.GetValue("Misc", "JAVASCRIPT", "Script Items","Indicator offset X"))
        var y = (UI.GetValue("Misc", "JAVASCRIPT", "Script Items","Indicator offset Y"))

        var keybindArray = [
            
        ];
        
        if (UI.IsHotkeyActive('Script items', 'Min damage override')) {
            keybindArray.push("DMG")
        }
        
        var text_size = 3.5

        for (var i=0;i < keybindArray.length;i++) {
            var textHeight = text_size*5.5
            var y_add = (textHeight * i)
            var clr = [255, 255, 255 ,255]
            if (keybindArray[i] == "DMG") {
                clr = [255, 140, 0 ,255]
            }     
            Render.String( x, y - y_add, 0, keybindArray[i], clr,text_size);
        }
    }
}

Global.RegisterCallback("Draw","drawFunction")
Global.RegisterCallback("CreateMove", "minDamageOverride")