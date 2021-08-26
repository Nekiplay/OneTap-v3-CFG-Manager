// Creator: Klient
// Discord: Klient#1690

Cheat.CursorInBox = function(x, y, length, height) {
    var cursor = Input.GetCursorPosition()
    if (cursor[0] > x && cursor[0] < x + length && cursor[1] > y && cursor[1] < y + height)
        return true
    return false
}

function drawBoard(x, y, w, h, color, title) {
    var font = Render.AddFont("MuseoSansCyrl-900", 11, 500)

    Render.FilledRect(x, y - 1, w - 2, h, color)
    Render.FilledRect(x - 1, y, w, h - 2, color)

    Render.FilledRect(x + 15, y + 25, w - 30, 2, [27, 27, 29, 255])

    Render.StringCustom(x + 15, y + 5, 0, title, [255, 255, 255, 255], font)
}

var x = "X";
var y = "Y";

X = function () {
    return UI.GetValue("Script items", x)
}
Y = function () {
    return UI.GetValue("Script items", y)
}
function sliders() {
    UI.AddSliderInt(x, -630, Render.GetScreenSize()[0])
    UI.AddSliderInt(y, -600, Render.GetScreenSize()[1])

    UI.SetEnabled("Script items", x, false)
    UI.SetEnabled("Script items", y, false)
}
sliders()

var menumove = false;
var waitforup = false;
var offsetx = 0;
var offsety = 0;

function checkMovement() {
    var cursor = Input.GetCursorPosition()
    var onmenu = Cheat.CursorInBox(X(), Y(), 200, 200)
    if (UI.IsMenuOpen()) {
        if (Input.IsKeyPressed(0x01) && !waitforup && onmenu) {
            menumove = true
            offsetx = cursor[0] - X()
            offsety = cursor[1] - Y()
            waitforup = true
        }
        if (!Input.IsKeyPressed(0x01)) {
            menumove = false
            waitforup = false
        }
        if (menumove) {
            UI.SetValue("Script items", "X", cursor[0] - offsetx)
            UI.SetValue("Script items", "Y", cursor[1] - offsety)
        }
    }
}
Cheat.RegisterCallback("Draw", "checkMovement")

var idCheckbox = 0
var comboOverlapping = false
var comboactive = -1
var wasDown = []

function resetSpacing() {
    idCheckbox = 0
}
resetSpacing()

function checkbox(x, y, name, enable) {
    var size = 8
    var frames = 8 * Globals.Frametime();
    var font = Render.AddFont("MuseoSansCyrl-500", 10, 500)
    var color = [3, 5, 13, 255]
    var color1 = [74, 87, 97, 255]
    var xs = 0

    if (enable) {
        color = [3, 23, 46, 255]
        color1 = [3, 168, 245, 255]
        xs = 28
    } else {
        color = [3, 5, 13, 255]
        color1 = [74, 87, 97, 255]
        xs = 0
    }

    if (!comboOverlapping) {
        Render.FilledCircle(x + 126, y + 15, 7, color)
        Render.FilledCircle(x + 153, y + 15, 7, color)
        Render.FilledRect(x + 125, y + 8, 30, 15, color)

        Render.FilledCircle(x + 126 + xs, y + 15, 9, color1)

        Render.StringCustom(x, y + 5, 0, name, [255, 255, 255, 255], font)
    }
   
    if (UI.IsMenuOpen() && !comboOverlapping) {
        if ((Cheat.CursorInBox(x + 122, y + 8, 42, 15)) && comboactive == -1) {
            if (!wasDown[idCheckbox]) {
                if (Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = true
                    return true
                }
            }
            else if (wasDown[idCheckbox]) {
                if (!Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = false
                    return false
                }
            }
            return false
        }
    }
}

var tab = 0

UI.AddCheckbox("Show ping")
UI.AddCheckbox("Show name")
UI.AddCheckbox("Show time")
UI.AddCheckbox("Show fps")
UI.AddCheckbox("Show ip")

function watermark() {

    var AddCheckbox = function (x, y, name) {
        if (checkbox(x, y, name, UI.GetValue("Script items", name))) UI.SetValue("Script items", name, !UI.GetValue("Script items", name))
    }

    var username = Cheat.GetUsername()
    var fps = Math.floor(1 / Global.Frametime());
    var today = new Date();
    var ping = Math.floor(Global.Latency() * 1000 / 1.5);
    var ip = World.GetServerString()
    var hours1 = today.getHours();
    var minutes1 = today.getMinutes();
    var seconds1 = today.getSeconds();
    var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
    var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
    var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds()    ;

    var font = Render.AddFont("MuseoSansCyrl-900", 9, 900)
    var font1 = Render.AddFont("MuseoSansCyrl-900", 11, 900)
   
    var text = ""

    if (UI.GetValue("Script items", "Show name")) {
        text += ("| " + username)
    }
    if (UI.GetValue("Script items", "Show ping")) {
        text += (" | " + ping + " mc")
    }
    if (UI.GetValue("Script items", "Show time")) {
        text += (" | " + hours + minutes + seconds)
    }
    if (UI.GetValue("Script items", "Show fps")) {
        text += (" | " + fps + " fps")
    }
    if (UI.GetValue("Script items", "Show ip")) {
        text += (" | " + ip)
    }

    var text1 = "NL"

    var h = 27;
    var w = Render.TextSizeCustom(text, font)[0] + 33;
    var x = Global.GetScreenSize()[0] - 2;
    var y = 12;
    x = x - w - 10;

    Render.FilledRect(x, y - 1, w - 2, h, [0, 20, 20, 255]);
    Render.FilledRect(x - 1, y, w, h - 2, [0, 20, 20, 255]);
    Render.StringCustom(x + 28, y + 5, 0, text, [255, 255, 255, 255], font)

    Render.StringCustom(x + 4, y + 3, 0, text1, [34, 179, 246, 255], font1)
    Render.StringCustom(x + 5, y + 4, 0, text1, [255, 255, 255, 255], font1)


    if (Cheat.CursorInBox(x, y, w, h) && Input.IsKeyPressed(0x02)) {
        tab = 1
    }

    if (!Cheat.CursorInBox(X(), Y(), 200, 200) && Input.IsKeyPressed(0x01)) {
        tab = 0
    }

    if (tab == 1 && UI.IsMenuOpen()) {
        drawBoard(X(), Y(), 200, 200, [11, 11, 14, 255], "Watermark Settings");
        AddCheckbox(X() + 15, Y() + 35, "Show ping")
        AddCheckbox(X() + 15, Y() + 65, "Show name")
        AddCheckbox(X() + 15, Y() + 95, "Show time")
        AddCheckbox(X() + 15, Y() + 125, "Show fps")
        AddCheckbox(X() + 15, Y() + 155, "Show ip")
    }
}

Cheat.RegisterCallback("Draw", "watermark")