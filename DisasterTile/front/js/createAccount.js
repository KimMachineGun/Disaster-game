document.getElementById("sign-up").onclick = function()
{
    let jsonData = JSON.stringify
    (
        {
            "id": $("#username").val(),
            "pw": $("#password").val(),
            "re-pw": $("#re-password").val()
        }
    );

    $.ajax
    (
        {
            url: '/register',
            type : 'post',
            data : jsonData,
            success : function()
            {
                window.location.href = "/";
            },
            error : function()
            {
            }
        }
    );
}

document.getElementById("back").onclick = function()
{
    window.location.href = "/";
}
