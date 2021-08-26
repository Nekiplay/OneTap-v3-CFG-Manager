//Whether or not the script is listening for a 'player_hurt' event
var waiting_for_hit = false;

//The target the ragebot last fired at
var target_idx = 0;

//The tick the ragebot last fired on
var tick_count = -1;

//Miss count for each individual player
var misses = [64];

//Safety state for each individual player
var safety_ents = [64];

//Set the default values for 'misses' and 'safety_ents'
reset_miss_logs()

//Add the miss slider
UI.AddSliderInt("Safety after x misses", 1, 6);

function on_ragebot_fire() {
    //The ragebot fired so now we're waiting for a 'player_hurt' event
    waiting_for_hit = true;
    //Update the current target index
    target_idx = Event.GetInt("target_index");
    //Update the tick count
    tick_count = Globals.Tickcount()
}

function on_player_hurt() {
    //The entity that was hurt
    var entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));

    //Don't continue if the hurt entity is the local player
    if (entity == Entity.GetLocalPlayer())
        return;

    //The entity that attacked 'entity'
    var attacker = Entity.GetEntityFromUserID(Event.GetInt("attacker"));

    //Don't continue unless 'attacker' is the local player
    if (attacker != Entity.GetLocalPlayer())
        return;

    //Don't continue if 'entity' isn't the last target
    if (entity != target_idx)
        return;

    //We damaged the target so we are no longer waiting for a hit. Reset the variables
    waiting_for_hit = false;
    target_idx = 0;
    tick_count = -1;
 
}

function on_create_move() {
    //Time in milliseconds between each tick
    var tick_interval = 1000 / Globals.Tickrate();

    //The amount of ticks we're going to wait for a player_hurt event
    var wait_ticks = 1 + Math.ceil((Local.Latency() * 2) / tick_interval);

    //Run this block if more than 'wait_ticks" has passed since the ragebot fired
    if (Globals.Tickcount() - tick_count >= wait_ticks && waiting_for_hit) {
        //Increment the misses for the current target
        misses[target_idx]++;

        //Force safety on the current target if more than x misses
        if (misses[target_idx] >= UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Safety after x misses")) {
            safety_ents[target_idx] = 1;
        }

        //Reset the variables
        waiting_for_hit = false;
        target_idx = 0;
        tick_count = -1;
    }

    //Current target
    var rbot_target = Ragebot.GetTarget();

    //If there is no target, don't continue
    if (rbot_target == 0)
        return;

    //Force safety on the target
    if (safety_ents[rbot_target] == 1) {
        Ragebot.ForceTargetSafety(rbot_target);
    }
}

//Reset variables on death
function on_player_death() {
    var idx = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    reset_specific_miss_logs(idx)
}

//Resets 'misses[]' and 'safety_ents[]'
function reset_miss_logs() {
    for (var i = 0; i < 64; i++) {
        reset_specific_miss_logs(i)
    }
}

//Resets 'misses' and 'safety_ents' for a specific entity
function reset_specific_miss_logs(idx) {
    misses[idx] = 0;
    safety_ents[idx] = 0;
}

//Register callbacks
Cheat.RegisterCallback("ragebot_fire", "on_ragebot_fire");
Cheat.RegisterCallback("player_hurt", "on_player_hurt");
Cheat.RegisterCallback("CreateMove", "on_create_move");
Cheat.RegisterCallback("player_death", "on_player_death")
Cheat.RegisterCallback("round_start", "reset_miss_logs");