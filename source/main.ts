import Client from "./tweet";
import ScriptRepository from "./scriptRepository";
import Time from "./time";
import WaitFor from "./waitFor";
import * as Config from "./json/config.json";

class EuphoniumEngine
{
    private static client: Client;

    public static Initialize()
    {
        this.client = new Client();
    }

    public static async Main()
    {
        while (true)
        {
            try
            {
                // 다음 정각 시간까지 기다린다
                await WaitFor.Minute(60 - Time.GetMinute());

                await this.Tweet();
            }
            catch (error)
            {
                await this.ErrorReport(error);
            }
        }
    }

    private static async Tweet()
    {
        var hour = Time.GetHour();

        // 7시부터 24시까지 트윗
        if (6 < hour || hour == 0)
        {
            var scriptData = ScriptRepository.GetRandomScript();

            // 3의 배수 시간에는 이미지를 포함해서 트윗
            var files = hour % 3 == 0 ? scriptData.FilePaths : [];
            this.client.Tweet(scriptData.Text, files);
        }
    }

    private static async ErrorReport(error: Error)
    {
        var errorMsg = "애러가 발생했습니다. " + error.stack;
        var adminId = Config.AdminId;

        await this.client.DirectMessage(adminId, errorMsg);
    }
}

EuphoniumEngine.Initialize();
EuphoniumEngine.Main();