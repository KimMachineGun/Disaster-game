$("#sign-up").on("click", function() {
    let jsonData = JSON.stringify({
        "username": $("#username").val(),
        "password": $("#password").val(),
        "re-password": $("#re-password").val()
    });
    $.ajax({
        url: '/create-account',
        type : 'post',
        dataType: 'json',
        data : jsonData,
        success : function() {
            alert("회원가입 성공");
            window.location.href = "/";
        },
        error : function() {
            alert("회원가입 실패");
        }
    }); 
});