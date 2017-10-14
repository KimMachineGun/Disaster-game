    $("#sign-up").on("click", function() {
    let jsonData = JSON.stringify({
        "id": $("#username").val(),
        "pw": $("#password").val(),
        "re-pw": $("#re-password").val()
    });
    $.ajax({
        url: '/register',
        type : 'post',
        data : jsonData,
        success : function() {
            window.location.href = "/";
        },
        error : function() {
            alert("Register Failed");
        }
    }); 
});