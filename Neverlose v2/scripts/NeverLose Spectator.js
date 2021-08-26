const screen_size = Global.GetScreenSize();
var stored = false;
var x_offs = 0;
var y_offs = 0;
UI.AddSliderInt("spectators x", 0, screen_size[0]);
UI.AddSliderInt("spectators y", 0, screen_size[1]);
UI.SetEnabled("Script items", "spectators x", false);
UI.SetEnabled("Script items", "spectators y", false);
const in_bounds = function(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}
const get_spectators = function() {
    var spectators = [];
    const players = Entity.GetPlayers();
    for (i = 0; i < players.length; i++) {
        const cur = players[i];
        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")
            if (obs === Entity.GetLocalPlayer()) {
                const name = Entity.GetName(cur);
                spectators.push(name);
            }
        }
    } return spectators;
}
const spectators = function() {
    const x = UI.GetValue("Script items", "spectators x"),
    y = UI.GetValue("Script items", "spectators y");
    const font = Render.AddFont("Calibri", 13, 600);
    const spects = Render.AddFont("Calibri", 11, 100);
    const icon = Render.AddFont("untitled-font-1", 14, 100);
    const names = get_spectators();
    Render.FilledRect(x, y, 160, 25, [11, 11, 20, 200]);
    Render.StringCustom(x + 5, y + 3, 0, "b", [0, 130, 255, 255], icon);
    Render.StringCustom(x + 30, y + 1, 0, "Spectators", [245, 245, 245, 255], font);
    Render.FilledRect(x, y + 24, 160, 24 + 19 * (names.length - 1), [200, 200, 200, 15]);
    for (i = 0; i < names.length; i++){
        Render.StringCustom(x + 30, y + 26 + 20 * i, 0, names[i], [245, 245, 245, 255], spects);
        Render.StringCustom(x + 6, y + 26 + 20 * i, 0, "d", [200, 200, 200, 255], icon);
    }
    if(UI.IsMenuOpen() && Input.IsKeyPressed(0x1)){
        const mouse_pos = Global.GetCursorPosition();
        if (in_bounds(mouse_pos, x, y, x + 150, y + 30)) {
            if(!stored){
                x_offs = mouse_pos[0] - x;
                y_offs = mouse_pos[1] - y;
                stored = true;
            }
            UI.SetValue("Script items", "spectators x", mouse_pos[0] - x_offs);
            UI.SetValue("Script items", "spectators y", mouse_pos[1] - y_offs);
        }
    } else if(stored) stored = false;
}
Global.RegisterCallback("Draw", "spectators");