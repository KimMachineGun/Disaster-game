$("#login").on("click", function() {
    let jsonData = JSON.stringify({
        "id": $("#username").val(),
        "pw": $("#password").val()
    });
    $.ajax({
        url: '/login',
        type : 'post',
        data : jsonData,
        success : function(a, b, c) {
            console.log(a + " " + b + " " + c);
            window.location.href = "/";
        },
        error : function(a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
            alert("Login Failed");
        }
    }); 
}); 