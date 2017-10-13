var data = new Array(8)

for(var i = 0; i < 8; i++)
{
    data[i] =
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
            type: 'get',
            data: jsonData,
            success: function(data)
            {
                console.log(data);
                let temp = JSON.parse(data);
                var resData = temp;
                
                for(var i = 0; i < resData.length; i++)
                {
                    data[i].ranking = resData[i].ranking;
                    data[i].username = resData[i].username;
                    data[i].exp = resData[i].exp;
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
        array[i].parentElement.children[0].innerHTML = data[i].ranking;
        array[i].parentElement.children[2].innerHTML = data[i].username;
        array[i].parentElement.children[4].innerHTML = data[i].exp;
    }
}

printRanking();