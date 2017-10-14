document.getElementById("login").onclick = function()
{
    let jsonData = JSON.stringify
    (
        {
            "id": $("#username").val(),
            "pw": $("#password").val()
        }
    );
    
    $.ajax
    (
        {
            url: '/login',
            type : 'post',
            data : jsonData,
            success : function(a, b, c)
            {
                console.log(a + " " + b + " " + c);
                window.location.href = "/";
            },
            error : function(a, b, c)
            {
                console.log(a);
                console.log(b);
                console.log(c);
                alert("Login Failed");
            }
        }
    );
}

document.getElementById("back").onclick = function()
{
    window.location.href = "/";
}

document.getElementById("create-acount").onclick = function()
{
    window.location.href = "/register";
}