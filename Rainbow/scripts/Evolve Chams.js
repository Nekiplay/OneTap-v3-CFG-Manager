var materials = []

function createMat(name){
    UI.AddColorPicker(name + " chams")
    UI.AddCheckbox("Hollow " + name.toLowerCase() + " chams")
    UI.AddCheckbox("Pulse " + name.toLowerCase() + " chams")
    UI.AddCheckbox("Rainbow " + name.toLowerCase() + " chams")
    UI.AddCheckbox("Wireframe " + name.toLowerCase() + " chams")
    Material.Create(name + " chams")
    materials.push([name,
         name + " chams",
         "Hollow " + name.toLowerCase() + " chams",
         "Pulse " + name.toLowerCase() + " chams",
         "Rainbow " + name.toLowerCase() + " chams",
         "Wireframe " + name.toLowerCase() + " chams"]);
}
function HSVtoRGB(h,s,v){
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        255
    ]
}
function materialUpdate(){   
    for(i in materials){
        var mat = materials[i]
        var mat_index = Material.Get(mat[0] + " chams")
        if ( mat_index > 0 )
        {
            
            Material.SetKeyValue(mat_index, "$baseTexture", "vgui/white")
            var additive = UI.GetValue("Script items", "Hollow " + mat[0] .toLowerCase() + " chams")
            Material.SetKeyValue(mat_index, "$additive", additive ? "1" : "0")
            Material.SetKeyValue(mat_index, "$envmap", "models/effects/cube_white")
            Material.SetKeyValue(mat_index, "$envmapfresnel", "1")
            
            var uicol = UI.GetColor("Script items", mat[0]  + " chams")
            var pulse = UI.GetValue("Script items", mat[3])
            var rainbow = UI.GetValue("Script items", mat[4])
            if(rainbow){
                uicol = HSVtoRGB(Globals.Realtime() / 5 % 1, 1, 1)
                uicol[0] /= 10
                uicol[1] /= 10
                uicol[2] /= 10
            }
            if(pulse){
                var speed = 7
                var additive = 5
                var intensity = 0.6
                var sine = (Math.sin(Globals.Realtime() * 7) + 5) * intensity
                uicol[0] *= sine
                uicol[1] *= sine
                uicol[2] *= sine
            }
            var wireframe = UI.GetValue("Script items", mat[5])
            Material.SetKeyValue(mat_index, "$wireframe", wireframe ? "1" : "0")
            Material.SetKeyValue(mat_index, "$envmapfresnelminmaxexp", wireframe ? "[0 2 4]" : "[0 1 2]")
            Material.SetKeyValue(mat_index, "$envmaptint", "[" + uicol[0]/255 + " " + uicol[1]/255 + " " + uicol[2]/255 + "]")
            Material.SetKeyValue(mat_index, "$alpha", "1")
            Material.Refresh(mat_index)       
        }
    }
}
createMat("Better glow")
Cheat.RegisterCallback("Material", "materialUpdate")
function onUnload()
{
    for(i in materials)
    {
        Material.Destroy(materials[i][0])
    }
}
Cheat.RegisterCallback("Unload", "onUnload")