var x , y;
var sum, sub,mod, div,pow,and,or;
do
{
    x = prompt ('Введите X', 0);
} while (isNaN(x) && x != null)
    
do
{
    y = prompt ('Введите Y', 0);
} while (isNaN(y) && y != null)

if ((x != null) && (y != null))
{
    x = parseFloat(x);

    y = parseFloat(y);

    sum = x + y;
    sub = x - y;
    div = x / y;
    mod = x % y;
    and = x & y;
    or = x | y;

    result = "Результаты математических операций: \n";
    result += x + ' + ' + y +' = ' + sum.toFixed(2) + '\n';
    result += x + ' - ' + y +' = ' + sub.toFixed(2) + '\n';
    if (isFinite(div)) result += x + ' / ' + y +' = ' + div.toFixed(2) + '\n';
    if (isFinite(mod)) result += x + ' % ' + y +' = ' + mod.toFixed(2) + '\n';

    if (((y ^ 0) === y) && (y > 0)) 
    {
        for (pow=x, i = 1; i < y; i++ )
        {
            pow *= x;
        }
        result += x + ' ** ' + y +' = ' + pow.toFixed(2) + '\n';
    }

    result += dec2bin(x) + ' | ' + dec2bin(y) +' = ' + or + '\n';

    alert (result);
}
function dec2bin(dec){
    return (dec >>> 0).toString(2);
}