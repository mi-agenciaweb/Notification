$(function () {
    //FOLDER OPEN
    $(".app_folder_open").click(function () {
        $(".app_folder_widget").fadeIn(200).css('display', 'flex');
        $('body').css('overflow', 'hidden');

        if ($(this).attr('data-module').length) {
            $(".app_folder_widget_nav_module[href='#" + $(this).attr('data-module') + "']").trigger('click');
        }

        $(".app_folder_close").click(function () {
            $(".app_folder_widget").fadeOut(200);
            $('body').css('overflow', 'auto');
        });
    });

    //OPEN FOLDER NAV
    $(".app_folder_widget_nav_open").click(function () {
        $(".app_folder_widget_nav").fadeIn(200);
    });

    //CLOSE FOLDER NAV
    $(".app_folder_widget_nav_close").click(function () {
        $(".app_folder_widget_nav").fadeOut(200);
    });

    //NORMALIZE MODULE
    $('.app_folder_widget_nav_module, .app_folder_open').click(function () {
        setTimeout(function () {
            $(".app_folder_normalize_height:visible").parent().each(function () {
                var maxHeight = 0;
                var normalize = $(this).find(".normalize_folder_height");

                normalize.each(function () {
                    if ($(this).height() > maxHeight) {
                        maxHeight = $(this).height();
                    }
                }).height(maxHeight);
            });
        }, 300);
    });
});

