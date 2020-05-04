
export default class Time
{
    public static GetHour(): number
    {
        var date = new Date();
        return date.getHours();
    }

    public static GetMinute(): number
    {
        var date = new Date();
        return date.getMinutes();
    }
}