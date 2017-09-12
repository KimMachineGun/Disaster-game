$(document).ready(function({
    
    $('#login').click(function(){
    
    var signin = $("").attr('signin'); 
    var form_data = {
    user_id :$("user_id").val(),
    user_pw : $("user_pw").val(),
    is_ajax :1
};
    $.ajax({
    url:'',
    type : 'post',
    dataType:form_data,
    data:FormData,
    success:function(response){
    if(response =='200'){
        
        //성공일 시 이벤트
        
    }else{
        //실패 시 이벤트
    }
}
});

return false;

});
    
});