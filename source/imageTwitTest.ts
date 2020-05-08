import Client from "./tweet";
import ScriptRepository from "./scriptRepository";

(async ()=>
{
    try
    {
        var client = new Client();
        var scriptData = ScriptRepository.GetRandomScript();

        await client.Tweet(scriptData.Text, scriptData.FilePaths);
    }
    catch (error)
    {
        console.log(error);
    }
})();