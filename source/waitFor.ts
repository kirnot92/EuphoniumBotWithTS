export default class WaitFor
{
    public static async Hour(hour: number): Promise<void>
    {
        return await this.Minute(hour * 60);
    }

    public static async Minute(min: number): Promise<void>
    {
        return await this.Seconds(min * 60);
    }

    public static async Seconds(sec: number): Promise<void>
    {
        return await this.Millisecond(sec * 1000);
    }

    public static async Millisecond(ms: number): Promise<void>
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}