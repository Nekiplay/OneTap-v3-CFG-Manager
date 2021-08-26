/* ------------------------------------------------------ */

const clr = [
    text = [ 240, 240, 240, 255 ],
    main = [ 38, 38, 38, 160 ],
    back = [ 32, 32, 32, 255 ],
    high = [ 48, 48, 48, 255 ],
    red  = [ 240, 41, 41, 255 ],
]

var positions = [];
var trace = [];
var render = [];
var local = Entity.GetLocalPlayer();

function Clamp(v, min, max)
{
    return Math.max(Math.min(v, max), min);
}

/* ------------------------------------------------------ */

function ImportGrenades()
{
    var grenades = Entity.GetEntitiesByClassID(9).concat(Entity.GetEntitiesByClassID(113).concat(Entity.GetEntitiesByClassID(100)));
    for (e in grenades)
    {
        pass = false;
        for (g in positions)
        {
            if (positions[g][0] == grenades[e])
            {
                pass = true;
                continue;
            }
        }
        if (pass)
            continue;

        positions.push([grenades[e], Globals.Curtime(), [Entity.GetRenderOrigin(grenades[e])], Globals.Curtime()]);
    }
}

/* ------------------------------------------------------ */

function GrenadeWarning()
{
    var grenades = Entity.GetEntitiesByClassID(9).concat(Entity.GetEntitiesByClassID(114).concat(Entity.GetEntitiesByClassID(100)));

    if (!Entity.IsAlive(local)) { return; }
    
    for (g in grenades) {
        for (var i = 0; i < grenades.length; i++) {
            
            var g = grenades[i];
            var isInferno = Entity.GetClassID(g) === 100;
            var isHeGrenade = Entity.GetClassID(g) === 9;

            /* --------------- */

            function DistanceInFeets (origin, destination) {
                var sub = [destination[0] - origin[0], destination[1] - origin[1], destination[2] - origin[2]];
                return Math.round(Math.sqrt(sub[0] ** 2 + sub[1] ** 2 + sub[2] ** 2) / 12);
                //return Math.round(sub[0] + sub[1] + sub[2]); // Для измерения в юнитах
            }

            /* --------------- */

            var destination = Entity.GetRenderOrigin(g);
            var origin = Entity.GetEyePosition(local);
            var distance = DistanceInFeets(origin, destination);
            var screen = Render.WorldToScreen(destination);
            var isSafe = distance > (isInferno ? 15 : 20) || trace[1] < 0.61;

            /* --------------- */

            if (distance > 256) { continue; }

            if (isHeGrenade && Entity.GetProp (g, "CBaseCSGrenadeProjectile", "m_nExplodeEffectTickBegin")) { continue; }

            /* --------------- */

            Render.FilledRect (screen[0] + 16, screen[1] - 12, 48, 24, clr[1]);

            Render.Polygon ([ [ screen[0] + 8,  screen[1] - 1 ], [ screen[0] + 16, screen[1] - 8 ], [ screen[0] + 16, screen[1] + 8 ] ], clr[1]);

            Render.String (screen[0] + 36, screen[1] - 5, 0, Math.round(distance / 3.28) + " m", clr[0], 3);
            Render.String (screen[0] + 20, screen[1] - 6, 0, isHeGrenade ? "I" : "K", isSafe ? clr[0] : clr[4], 6);

            /* --------------- */

            const warning_stroke = false; // true для красной обводки при опасности

            Render.Line ( screen[0] + 8, screen[1], screen[0] + 16, screen[1] - 8, !isSafe && warning_stroke ? clr[4] : clr[3])
            Render.Line ( screen[0] + 8, screen[1], screen[0] + 16, screen[1] + 8, !isSafe && warning_stroke ? clr[4] : clr[3])

            Render.Line ( screen[0] + 16, screen[1] - 12, screen[0] + 16, screen[1] - 7, !isSafe && warning_stroke ? clr[4] : clr[3])
            Render.Line ( screen[0] + 16, screen[1] + 12, screen[0] + 16, screen[1] + 8, !isSafe && warning_stroke ? clr[4] : clr[3])

            Render.Line ( screen[0] + 16, screen[1] - 12, screen[0] + 64, screen[1] - 12, !isSafe && warning_stroke ? clr[4] : clr[3])
            Render.Line ( screen[0] + 16, screen[1] + 12, screen[0] + 64, screen[1] + 12, !isSafe && warning_stroke ? clr[4] : clr[3])
            Render.Line ( screen[0] + 64, screen[1] + 12, screen[0] + 64, screen[1] - 12, !isSafe && warning_stroke ? clr[4] : clr[3])
            
            /* --------------- */

            if (isInferno)
            {
                var time = Entity.GetProp(g, "CInferno", "m_nFireEffectTickBegin") * Globals.TickInterval();
                var factor = Clamp(((time + 7) - Globals.Curtime()) / 7, 0, 7);
    
                Render.FilledRect(screen[0] + 16, screen[1] + 10, 48, 2, clr[2]);
                Render.FilledRect(screen[0] + 16, screen[1] + 10, Math.trunc(factor * 48), 2, clr[4]);
            }
        }
    }
}

/* ------------------------------------------------------ */

function onDraw()
{
    ImportGrenades();
    GrenadeWarning();
}

Cheat.RegisterCallback("Draw", "onDraw");