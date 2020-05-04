import * as Twitter from "twitter";
import * as Config from "./json/config.json";
import File from "./file";
import Assert from "./assert";

export default class Client
{
    private client: Twitter

    constructor()
    {
        this.client = new Twitter({
            consumer_key: Config.CounsumerKey,
            consumer_secret: Config.ConsumerSecret,
            access_token_key: Config.AccessToken,
            access_token_secret: Config.AccessTokenSecret 
        });
    }

    public async Tweet(text: string, filePathList: string[])
    {
        var params = {status: text, media_ids: ""};
        
        if (filePathList.length != 0)
        {
            var mediaIds = await this.UploadImages(filePathList);
            params.media_ids = mediaIds.toString();
        }

        // toString으로 바꿔준 다음 넣지 않으면 auth오류가 남...
        await this.client.post('statuses/update', params);
    }

    public async UploadImages(filePathList: string[]): Promise<string[]>
    {
        Assert.IsTrue(filePathList.length != 0);

        var mediaIds = new Array<string>();

        for (var filePath of filePathList)
        {
            var mediaId = await this.UploadImage(filePath);

            mediaIds.push(mediaId);
        }
        
        return mediaIds;
    }

    public async UploadImage(filePath: string): Promise<string>
    {
        var image = await File.ReadFile(filePath, 'base64');
        var response = await this.client.post('media/upload', {media_data: image});

        return response.media_id_string;
    }
}