window.location.reload(true);

var res = new Array(8)

for(var i = 0; i < 8; i++)
{
    res[i] =
    {
        ranking: 0,
        username: "unknown",
        exp: 0
    }
}

function request()
{
    let jsonData = JSON.stringify
    (
        {
            "id": $("#username").val()
        }
    );

    $.ajax
    (
        {
            url: '/ranking',
            type: 'post',
            data: jsonData,
            success: function(data)
            {
                console.log(data);
                var resData = JSON.parse(data);

                for(var i = 0; i < resData.length; i++)
                {
                    res[i].ranking = resData[i].ranking;
                    res[i].username = resWData[i].username;
                    res[i].exp = resData[i].exp;
                }
            },
            error: function(data)
            {
                console.log(data);
                alert("Failed");
            }
        }
    )
}

function printRanking()
{
    var array = document.getElementsByClassName("ranking");

    for(var i = 0; i < array.length; i++)
    {
        array[i].parentElement.children[0].innerHTML = res[i].ranking;
        array[i].parentElement.children[2].innerHTML = res[i].username;
        array[i].parentElement.children[4].innerHTML = res[i].exp;
    }
}

document.getElementById("back").onclick = function()
{
    window.location.href = "/";
}

request();
printRanking();
