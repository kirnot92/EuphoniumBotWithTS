import * as ScriptJson from "./json/script.json";
import Math from "./mathExtension";
import Assert from "./assert";
import * as path from "path"

const ROOT = path.resolve(__dirname, "..");
const IMAGES = path.join(ROOT, "source", "image");

export class ScriptData
{
    public FilePaths: string[];
    public Text: string;

    constructor(text: string, fileNames: string[])
    {
        this.Text = text;
        this.FilePaths = this.ConvertToPath(fileNames);
    }

    ConvertToPath(files: string[]): string[]
    {
        var filePaths = new Array<string>();

        for(var fileName of files)
        {
            filePaths.push(path.join(IMAGES, fileName));
        }

        return filePaths;
    }
}

export default class ScriptRepository
{
    // 이건 임시 함수
    public static GetRandomScript(): ScriptData
    {
        var index = Math.Range(0, ScriptJson.length);
        
        return this.GetScriptAt(index);
    }

    public static GetScriptAt(index: number): ScriptData
    {
        Assert.IsTrue(0 < index && index < ScriptJson.length);

        var json = ScriptJson[index];
        
        return new ScriptData(json.Text, json.Files);
    }
}