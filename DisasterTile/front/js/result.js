var res = new Array(4);

for(var i = 0; i < 4; i++)
{
    res[i] =
    {
        ranking: 0,
        username: "unknown",
        score: 0
    }
}

function request()
{
    $.ajax
    (
        {
            url: '/result',
            type: 'get',

            success: function(data)
            {
                var resData = JSON.parse(data);

                for(var i = 0; i < resData.length; i++)
                {
                    res[i].ranking = resData[i].ranking;
                    res[i].username = resData[i].username;
                    res[i].score = resData[i].score;
                }
            },
            error: function()
            {
                console.log(data);
                alert("Failed");
            }
        }
    )
}

function printResult()
{
    var array = document.getElementsByClassName("ranking");

    for(var i= 0; i < array.length; i++)
    {
        array[i].parentElement.children[0].innerHTML = res[i].ranking;
        array[i].parentElement.children[2].innerHTML = res[i].username;
        array[i].parentElement.children[4].innerHTML = res[i].score;
    }
}

document.getElementById("close").onclick = function()
{
    window.location.href = "/";
}

printResult();
