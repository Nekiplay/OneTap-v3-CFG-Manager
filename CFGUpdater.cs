//using CFG_Manager;

MCC.LoadPlugin(new CFGUpdater());

//Script Extensions
 
public class CFGUpdater : Plugin
{
	public void GetDataBase()
	{
		/* Скрипты */
		JSScript override_damage = new JSScript("Override Damage", "Neki_play", "54B90C5DF3147E69856D7C56E05C3A0C", "https://raw.githubusercontent.com/Nekiplay/OneTap-v3-CFG-Manager/main/Rainbow/scripts/Overide%20Damage.js");
		JSScript china_hat = new JSScript("China Hat", "Klient", "F665737D7C218DDA9B13B4DB4BB785F7", "https://raw.githubusercontent.com/Nekiplay/OneTap-v3-CFG-Manager/main/Rainbow/scripts/China%20Hat.js");
		JSScript matrix_hitlogs = new JSScript("Matrix HitLogs", "Klient", "4F7D3CB9C9630629E4EE0C556B723756", "https://raw.githubusercontent.com/Nekiplay/OneTap-v3-CFG-Manager/main/Rainbow/scripts/Matrix%20Hitlogs.js");
		JSScript evolve_chams = new JSScript("Evolve Chams", "Klient", "8AB75527AB6C394BDC5C45C822DC7B01", "https://raw.githubusercontent.com/Nekiplay/OneTap-v3-CFG-Manager/main/Rainbow/scripts/Evolve%20Chams.js");
		JSScript molotov_radius = new JSScript("Molotov Radius", "Unknow", "F429DD85000226ED5A7F4C6E1E255179", "https://raw.githubusercontent.com/Nekiplay/OneTap-v3-CFG-Manager/main/Rainbow/scripts/Molotov%20Radius.js");
		
		JSScript jump_scout = new JSScript("Jump Scout", "iDesync", "AC022DD65E381C3DD66B61B325B2BE52", "https://raw.githubusercontent.com/Nekiplay/OneTap-v3-CFG-Manager/main/Rainbow/scripts/Jump%20Scout.js");
		
		JSScript matchmaking_fakeduck = new JSScript("Matchmaking FakeDuck", "swayzov", "8989D1BDCFB9D7841C8309A31B390531", "https://raw.githubusercontent.com/Nekiplay/OneTap-v3-CFG-Manager/main/Rainbow/scripts/Matchmaking%20FakeDuck.js");
		
		/* Конфиги */
		PluginPostObject(new CFG("Rainbow", "Asker", "337EEDE59EB91FC04C2396FFE1B723B4", "https://raw.githubusercontent.com/Nekiplay/OneTap-v3-CFG-Manager/main/Rainbow/Rainbow.cfg", new List<JSScript>() { override_damage, china_hat, matrix_hitlogs, evolve_chams, molotov_radius, new JSScript("Notify", "Asker", "38C3184E426778175E56F1F9747171D4", "https://raw.githubusercontent.com/Nekiplay/OneTap-v3-CFG-Manager/main/Rainbow/scripts/Notify.js") }));
		PluginPostObject("LoadDone");
	}
	public override void Initialize()
	{
		GetDataBase();
	}
	public override void ReceivedObject(object s)
    {
        if (s.GetType() == typeof(string))
        {
            string text = (string)s;
            if (text == "GetDataBase")
            {
                GetDataBase();
            }
        }
	}
}


