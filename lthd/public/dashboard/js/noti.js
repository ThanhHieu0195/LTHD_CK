/**
 * Created by 7012 RM on 1/6/2017.
 */
$(document).ready(function(){
    function addNotification(notiContent){
        $('#notification-container').append(notiContent);
    }
    $(document).on('click', function(e){
        if($(e.target).is('.btn-close-notification')){
            $(e.target).parent().remove();
        };
    });
    $('.btn-like').click(function(){
        //sinh id tự động cho notification-item ngẫu nhiên
        var d = new Date();
        var idForNotif = "notif"+d.getTime();
        //Lấy tên sản phẩm
        var proname = $(this).parents().filter(".user-info").find('.profile-link').text();
        //lấy url sản phẩm
       var imgSrc = $(this).parents().filter(".post-content").find('.post-container').children().first().attr("src");

        //var like = $(this).parents().filter(".post-detail").find('.reaction').children().children().first().attr("alt");
        //div notification-item
        var notiContent = '<div id="'+idForNotif+'" class="notification-item"><div class="notification-img"><img src="'+imgSrc+'" alt="notification-img"/></div><div class="notification-content"><p> also like in your post</p></div> <span class="btn-close-notification"></span></div>';
        addNotification(notiContent);
        closeNotif('#'+idForNotif);
        return false;
    });
    var notifTimeout;
    //remove notification
    function closeNotif(idForNotif) {
        notifTimeout = setTimeout(function() {
            $(idForNotif).animate({opacity:'0'}, 500).delay(1000).animate({marginTop: '0'}, 0, function(){
                $(idForNotif).remove();
            });
        }, 1500);
    };
    //clear timeout when hover
    function saveNotif() {
        clearTimeout(notifTimeout);
    }
});
