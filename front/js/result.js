var data = new Array(4);

for(var i = 0; i < 4; i++)
{
    data[i] =
    {
        ranking: 0.
        username: "unknon",
        score: 0
    }
}

function request
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
                    data[i].ranking = resData[i].ranking;
                    data[i].username = resData[i].username;
                    data[i].score = resData[i].score;
                }
            }
            error: function()
            (
            
            )
        }
    )
}