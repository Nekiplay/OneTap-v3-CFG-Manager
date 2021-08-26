var fonts = function(size, h) {
    return {
        verdana: Render.AddFont("Verdana", size == undefined ? 7 : size, h == undefined ? 400 : h),
        small: Render.AddFont("Small fonts", size == undefined ? 5 : size, h == undefined ? 400 : h), 
    }
}

Render.ShadowStringCustom = function(x, y, alignid, text, color, font) {
	Render.StringCustom(x + 1, y + 1, alignid, text, [0, 0, 0, 255 * color[3] / 255], font)
	Render.StringCustom(x, y, alignid, text, color, font)
}

UI.AddColorPicker("[N] Global color")

var notify = {
	nlogs: new Array,
	speed: 0,
	name: "Raimbow CFG",

	add_notify: function(text, index, alpha) {
		var font = fonts().verdana
		var color = UI.GetColor("Script items", "[N] Global color")

		var size = Render.GetScreenSize()
		size = [size[0], size[1] - 150]
		var text_size = Render.TextSizeCustom("[" + notify.name + "]  ", font)[0] + Render.TextSizeCustom(text, font)[0]
		var p_x = Math.floor(size[0] / 2) - 4 - Math.floor(text_size / 2)

	    Render.FilledRect(Math.floor(p_x - 0.5), size[1] - (index) - 2, text_size + 8, 30, [0, 0, 0, 150 * alpha])
	    Render.FilledRect(Math.floor(p_x - 0.5), size[1] - (index) - 2, text_size + 8, 2, [color[0], color[1], color[2], 255 * alpha])

	    Render.ShadowStringCustom(size[0] / 2 - Render.TextSizeCustom(text, font)[0] / 2, size[1] - (index) + 3 + 4, 1, "[" + notify.name + "]", [color[0], color[1], color[2], 255 * alpha], font)
	    Render.ShadowStringCustom(size[0] / 2 + Render.TextSizeCustom("[" + notify.name + "]  ", font)[0] / 2, size[1] - (index) + 3 + 4, 1, text, [255, 255, 255, 255 * alpha], font)
	},

	on_draw: function() {
		for (var i = 0; i < notify.nlogs.length; i++) {
			var curtime = notify.nlogs[i][3]
			var e_time = notify.nlogs[i][1]
			var text = notify.nlogs[i][0]

			var time = curtime + e_time;
			var time_left = time - Globals.Curtime();

			if (notify.nlogs[i][2] < 1 && !(time_left < 0.6))
				notify.nlogs[i][2] += Globals.Frametime() * 2
			
			if (time_left < 0.6)
				notify.nlogs[i][2] -= Globals.Frametime() * 2

			if (i == 0) {
				if (notify.speed < 1 && !(time_left < 0.6))
					notify.speed += Globals.Frametime() * 4
				
				if (time_left <= 0.01 && notify.nlogs.length > 0)
					notify.speed = 1
			
				notify.add_notify(text, Math.floor(notify.speed * 20) + 20, Math.max(Math.min(1, notify.nlogs[i][2]), 0))
			} else {
				notify.add_notify(text, 40 * (i + 1), Math.max(Math.min(1, notify.nlogs[i][2]), 0))
			}

	        if (Math.max(Math.min(1, notify.nlogs[i][2])) <= 0)
	            notify.nlogs.splice(i, 1)
		}

		if (notify.nlogs.length == 0)
			notify.speed = 0
	}
}
Cheat.RegisterCallback("Draw", "notify.on_draw")

notify.nlogs.push(["Welcome, config loaded successfully.", 8, 0, Globals.Curtime()])