$(function () {
    BASE = $("link[rel='base']").attr("href");
    AJAX = BASE + '/_up/upinside.php';
    NAME = $("link[rel='username']").attr('data-name');

    //GET HELLOBAR
    if (window.location.href.indexOf('/aovivo/') === -1) {
        $.getScript(BASE + "/_cdn/widgets/hellobar/hellobar.wc.js", function () {
            $("head").append("<link rel='stylesheet' href='" + BASE + "/_cdn/widgets/hellobar/hellobar.wc.css'/>");
        });
    }

    /**
     * Controla o menu mobile
     */
    $('.jup_mobile_nav').click(function () {
        var MenuMobile = $('.main_header_nav');
        if (!MenuMobile.hasClass('active')) {
            MenuMobile.animate({left: '0'}, 300, function () {
                MenuMobile.addClass('active');
            });
        } else {
            MenuMobile.animate({left: '-270'}, 300, function () {
                MenuMobile.removeClass('active');
            });
        }
        return false;
    });

    //campus sidebar nav
    $(".campus_sidebar_mobile_nav").click(function () {
        var CampusMobileNav = $(".campus_sidebar");
        var CampusMobileMenu = $(this);
        if (CampusMobileNav.css('right') <= '0') {
            $("html, body").css("overflow", "hidden");
            CampusMobileMenu.css("background", "#00749b").removeClass('icon-menu').addClass('icon-arrow-right');
            CampusMobileNav.animate({'right': '0', "opacity": '1'}, 200);
        } else {
            $("html, body").css("overflow", "auto");
            CampusMobileMenu.css("background", "none").removeClass('icon-arrow-right').addClass('icon-menu');
            CampusMobileNav.animate({'right': '-' + CampusMobileNav.outerWidth(), "opacity": "0"}, 200);
        }
    });

    //campus mobile nav
    $(".campus_home_sidebar_mobile").click(function () {
        var CampusHomeMobileNav = $(".campus_home_sidebar");
        var CampusHomeMobileMenu = $(this);
        if (CampusHomeMobileNav.css('right') <= '0') {
            $("html, body").css("overflow", "hidden");
            CampusHomeMobileMenu.css("background", "#00749b").removeClass('icon-plus').addClass('icon-minus');
            CampusHomeMobileNav.animate({'right': '0'}, 200);
        } else {
            $("html, body").css("overflow", "auto");
            CampusHomeMobileMenu.css("background", "none").removeClass('icon-minus').addClass('icon-plus');
            CampusHomeMobileNav.animate({'right': '-' + CampusHomeMobileNav.outerWidth()}, 200);
        }
    });

    //VIDEO PLAYER
    $("*[data-video]").click(function () {
        $("*[data-video]").removeClass("active");
        $(this).addClass("active");

        var videoPlay = $(this).attr("data-video");
        var videoBox = $(this).attr("data-target");

        $(videoBox).html("<iframe src='https://player.vimeo.com/video/" + videoPlay + "?autoplay=1&color=BE3F3F&title=0&byline=0&portrait=0' width='640' height='360' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
    });

    //VIDEO PLAYER AUTOCLICK
    if (window.location.hash && window.location.hash.search("v") >= 1) {
        var videoId = window.location.hash.replace("#v", "");
        $("*[data-video='" + videoId + "']").trigger("click");
    }

    /**
     * Normaliza os elementos após carregar a página!
     */
    $(window).load(function () {
        upNormalizeHeight();
    });

    /**
     * HOME VIDEOS: Cria ação de PLAY e navegação nos depoimentos da home
     */
    $('.main_home_about_slide').on('click', '.jup_media_play', function () {
        var YouTubeVideo = $(this).attr('id');
        $(".j_media_" + YouTubeVideo).html('<div class="embed-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + YouTubeVideo + '?rel=0&amp;showinfo=0&amp;autoplay=1" frameborder="0" allowfullscreen></iframe></div>');
    });

    $('.jup_home_media_nav_go').click(function () {
        if ($('.jup_home_about_slide.active').index() !== $('.jup_home_about_slide').last().index()) {
            $('.jup_home_about_slide.active').fadeOut(200, function () {
                homeVideoPlayBack();
                $(this).removeClass('active').next().addClass('active').fadeIn();
            });
        } else {
            $('.jup_home_about_slide.active').fadeOut(200, function () {
                homeVideoPlayBack();
                $(this).removeClass('active');
                $('.jup_home_about_slide').first().addClass('active').fadeIn();
            });
        }
    });

    $('.jup_home_media_nav_back').click(function () {
        if ($('.jup_home_about_slide.active').prev().size()) {
            $('.jup_home_about_slide.active').fadeOut(200, function () {
                homeVideoPlayBack();
                $(this).removeClass('active').prev().addClass('active').fadeIn();
            });
        } else {
            $('.jup_home_about_slide.active').fadeOut(200, function () {
                homeVideoPlayBack();
                $(this).removeClass('active');
                $('.jup_home_about_slide').last().addClass('active').fadeIn();
            });
        }
    });

    //Normaliza os cursos do club
    $('.club_cursos_link_sidebar').click(function () {
        setTimeout(function () {
            upNormalizeHeight();
        }, 1000);
    });

    //Envia para oferta do club
    $(".go_offer").click(function () {
        var offerDiv = $("#offer").offset().top;
        $('html, body').animate({scrollTop: offerDiv}, 800);
    });

    //OPEN VV
    $(".j_club_more_open").click(function () {
        $(".club_page_main_modal .embed-container").html('<iframe src="https://player.vimeo.com/video/' + $(".club_page_main_modal .embed-container").attr("id") + '?autoplay=1&title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
        $(".club_page_main_modal").fadeIn(200).css("display", "flex");
    });

    //OPEN DEPOIMENT
    $(".j_depoiment_open").click(function () {
        var YouTubeMedia = $(this).attr("id");
        $(".club_page_main_modal .embed-container").html('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + YouTubeMedia + '?rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;autoplay=1" frameborder="0" allowfullscreen></iframe>');
        $(".club_page_main_modal").fadeIn(200).css("display", "flex");
    });

    //CLOSE VV
    $(".j_club_more_close").click(function () {
        $(".club_page_main_modal").fadeOut(400, function () {
            $(".club_page_main_modal .embed-container").html('');
        });
    });

    //SEND PAY
    $(".club-infusion-form").submit(function () {
        var InfusionForm = $(this);
        var InfusionSend = "https://zn360.infusionsoft.com/app/form/process/";
        var InfusionData = $(this).serialize();

        //OPEN LOAD
        triggerLoad($(this));

        //GET ENROLLMENT
        $.post(AJAX, $(this).serialize() + "&rock=student_enrollments", function (data) {
            //ALL TRIGGERS
            upTriggers(data);

            //CLOSE LOAD
            triggerLoadClose();

            if (data.club_type === "prospect") {
                var inf_form_xid = "063f9aeffe6b839bf38728b3b04c5fab";
                var InfusionDataSend = {
                    inf_form_xid: inf_form_xid,
                    inf_form_name: "Club Prospect",
                    infusionsoft_version: "1.65.0.51",
                    inf_field_FirstName: InfusionForm.find("input[name='name']").val(),
                    inf_field_Email: InfusionForm.find("input[name='email']").val()
                };

                var user_name = InfusionForm.find("input[name='name']").val();
                var user_email = InfusionForm.find("input[name='email']").val();
                if (data.club_name) {
                    user_name = data.club_name;
                }

                //MODAL PROSPCT:: R$ 64
                var HtmlContent = "<span class='icon icon-checkmark2'></span><p class='title'>Reserva Efetuada Com Sucesso!</p><p class='text'>Parabéns " + user_name + ", sua reserva para o Club foi efetuada com sucesso. Clique no link abaixo para efetuar o pagamento na Hotmart!</p><a href='" + data.club_offer + "&name=" + InfusionForm.find("input[name='name']").val() + "&email=" + user_email + "' title='Efetuar Pagamento' class='club_call_to_action club_call_to_action_green icon-cart'>EFETUAR PAGAMENTO</a><p class='pay'>Apenas R$ 64 por mês.</p>";
                $(".club_modal_pay_content").html(HtmlContent);
                $(".club_modal_pay").fadeIn(200).css("display", "flex");

                //SEND TO INFUSION
                var InfusionLinkSend = InfusionSend + inf_form_xid;
                $.post(InfusionLinkSend, InfusionDataSend);
            }

            if (data.club_type === "student") {
                var inf_form_xid = "31ce0d9b3540a783e597afca117263fb";
                var InfusionDataSend = {
                    inf_form_xid: inf_form_xid,
                    inf_form_name: "Club Student",
                    infusionsoft_version: "1.65.0.51",
                    inf_field_FirstName: InfusionForm.find("input[name='name']").val(),
                    inf_field_Email: InfusionForm.find("input[name='email']").val()
                };

                var user_name = InfusionForm.find("input[name='name']").val();
                var user_email = InfusionForm.find("input[name='email']").val();
                if (data.club_name) {
                    user_name = data.club_name;
                }

                //MODAL PROSPCT:: R$ 54
                var HtmlContent = "<span class='icon icon-heart'></span><p class='title'>Você tem desconto " + user_name + "!</p><p class='text'>Sua reserva no Club foi efetuada com sucesso e você paga <b>apenas R$ 54/mês</b> pois já é nosso aluno. Clique abaixo para pagar agora!</p><a href='" + data.club_offer + "&name=" + InfusionForm.find("input[name='name']").val() + "&email=" + user_email + "' title='Efetuar Pagamento' class='club_call_to_action club_call_to_action_green icon-cart'>PAGAR COM DESCONTO</a><p class='pay'>Apenas R$ 54 por mês.</p>'";
                $(".club_modal_pay_content").html(HtmlContent);
                $(".club_modal_pay").fadeIn(200).css("display", "flex");

                //SEND TO INFUSION
                var InfusionLinkSend = InfusionSend + inf_form_xid;
                $.post(InfusionLinkSend, InfusionDataSend);
            }
        }, 'json');
        return false;
    });

    /**
     * Element Action: Abre, fecha e manipula elementos encapsulados com a classe .j_rock de forma dinâmica!
     * @param data-rock Ação desejada no elemento.
     * @param data-target Classe da div que vai receber o evento.
     */
    $("body").on('click', '*[data-rock]', function () {
        var Body = $(this);
        var Rock = Body.attr('data-rock');
        var Ajax = (Body.attr("data-ajax") ? BASE + '/_up/' + Body.attr("data-ajax") : AJAX);
        var rKey = Body.attr('data-key');
        var rVal = Body.attr('data-id');
        var rTar = $("." + Body.attr('data-target'));

        //CLOSE, REMOVE ACTION
        if (Rock.match("close")) {
            rTar.fadeOut(200, function () {
                $(this).remove();
            });
        }

        //SHARE ON MODAL
        if (Rock.match("modalShare")) {
            var url = $(this).attr('data-share');
            var width = 600;
            var height = 600;

            var leftPosition, topPosition;
            leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
            topPosition = (window.screen.height / 2) - ((height / 2) + 100);
            window.open(url, "Window2",
                    "status=no,height=" + height + ",width=" + width + ",resizable=yes,left="
                    + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY="
                    + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
            return false;
        }

        //FORCE CLICK
        if (Rock.match("click")) {
            rTar.trigger('click');
        }

        //TOOGLE CLASS rKey el, rVal class
        if (Rock.match('toogle')) {
            if ($(this).hasClass(rVal)) {
                return false;
            }
            $(rKey).toggleClass(rVal);
        }

        //FADE IN rTar
        if (Rock.match('fadeIn')) {
            rTar.fadeIn(200);
            upNormalizeHeight();
        }

        //FADE TOGGLE rTar
        if (Rock.match('fadeToggle')) {
            rTar.fadeToggle(200);
            upNormalizeHeight();
        }

        //SLIDE TOGGLE rTar
        if (Rock.match('slideToggle')) {
            rTar.slideToggle(200);
            upNormalizeHeight();
        }

        //FADE IN rTar
        if (Rock.match('fadeFlex')) {
            rTar.fadeIn(200).css("display", "flex");
            upNormalizeHeight();
        }

        //FADE OUT rTar
        if (Rock.match('fadeOut')) {
            rTar.fadeOut(200);
        }

        //AJAX POST
        if (Rock.match('post')) {
            $.ajax({
                url: Ajax,
                data: "rock=" + rKey + "&id=" + rVal,
                dataType: 'json',
                type: 'POST',
                beforeSend: function () {
                    triggerLoad(Body);
                },
                success: function (data) {
                    //ALL TRIGGERS
                    upTriggers(data);

                    //TOOTLE CLASS
                    if (data.tootleClass) {
                        Body.removeClass(data.tootleClass[0]).addClass(data.tootleClass[1]);
                    }

                    //APPEND CONTENT
                    if (data.append) {
                        window.setTimeout(function () {
                            $.each(data.append, function (key, value) {
                                $(key).append(value);
                            });
                        }, 300);
                    }

                    //PREPEWND CONTENT
                    if (data.prepend) {
                        window.setTimeout(function () {
                            $.each(data.prepend, function (key, value) {
                                $(key).prepend(value);
                            });
                        }, 300);
                    }

                    //UPDATE CONTENT
                    if (data.content) {
                        $.each(data.content, function (key, value) {
                            $(key).fadeTo(400, 0.1, function () {
                                $(this).html(value).fadeTo(200, 1);
                            });
                        });
                    }

                    //REMOVE
                    if (data.remove) {
                        window.setTimeout(function () {
                            $.each(data.remove, function (key, value) {
                                $(value).fadeOut(200, function () {
                                    $(this).remove();
                                });
                            });
                        }, 200);
                    }

                    //FADE IN
                    if (data.fadeIn) {
                        $(data.fadeIn).each(function (key, value) {
                            $(value).fadeIn(200);
                        });
                    }

                    //FADE OUT
                    if (data.fadeOut) {
                        $(data.fadeOut).each(function (key, value) {
                            $(value).fadeOut(200);
                        });
                    }

                    //ELEMENT FADE OUT AND REMOVE
                    if (data.fadeRemove) {
                        $(data.fadeRemove).each(function (key, value) {
                            $(value).fadeOut(400, function () {
                                $(this).remove();
                            });
                        });
                    }

                    //REDIRECT
                    if (!data.redirect && !data.reload) {
                        triggerLoadClose();
                    } else {
                        window.location.href = BASE + "/" + data.redirect;
                        if (window.location.hash) {
                            window.location.reload();
                        }
                    }

                    //RELOAD
                    if (data.reload) {
                        window.location.reload();
                    }
                }
            });
        }
    });

    //FORM SEND
    $("body").on('submit', 'form', function () {
        //GET FORM
        var Form = $(this);
        var Rock = Form.attr("data-rock");
        var Ajax = (Form.attr("data-ajax") ? BASE + '/_up/' + Form.attr("data-ajax") : AJAX);

        if (Rock) {
            //TINYMCE SAVE CONTENT
            if (typeof tinyMCE !== 'undefined') {
                tinyMCE.triggerSave();
            }

            //FORM SEND
            Form.ajaxSubmit({
                url: Ajax,
                data: {rock: Rock},
                dataType: 'json',
                beforeSubmit: function () {
                    triggerLoad(Form);
                },
                uploadProgress: function (event, position, total, completed) {
                    var progress = completed + "%";

                    //PROGRESS PROCESS
                    $(".up_modal_load_box_progress").text(progress);
                    $(".up_modal_load_box_progress_bar").width(progress);

                    //ADD MODAL PROGRESS
                    if (!Form.find(".up_modal_load").length) {
                        Form.append("<div class='up_modal_load'><div class='up_modal_load_box'><div class='up_modal_load_box_progress'>0%</div><p class='up_modal_load_box_info'>Aguarde, enviando arquivos</p><div class='up_modal_load_box_progress_bar'></div></div></div>");
                    }

                    //LOAD MODAL PROGRESS
                    if (position < total && !up_modal_load) {
                        var up_modal_load = true;
                        $(".up_modal_load").fadeIn(200).css("display", "flex");
                    }

                    //REMOVE MODAL PROGRESS
                    if (completed >= '100' || position >= total) {
                        $(".up_modal_load").fadeOut(200, function () {
                            $(this).remove();
                        });
                    }
                },
                success: function (data) {
                    //ALL TRIGGERS
                    upTriggers(data);

                    //TRIGGER REMOVE MENTIONS
                    $("#input_mention_remove").remove();

                    //TINYMCE LOAD CONTENT
                    if (typeof tinyMCE !== 'undefined' && data.tinyMCE) {
                        tinyMCE.activeEditor.insertContent(data.tinyMCE);
                    }

                    //REMOVE FORM LOAD
                    Form.find(".up_form_load").fadeOut(200, function () {
                        $(this).remove();
                    });

                    //RESET FORM
                    if (data.reset) {
                        Form.trigger("reset");
                    }

                    //CLEAR INPUT FILE
                    if (!data.error) {
                        Form.find("input[type='file']").val("");
                    }

                    //APPEND CONTENT
                    if (data.append) {
                        $.each(data.append, function (key, value) {
                            $(key).append(value);
                        });
                    }

                    //ELEMENT FADE IN
                    if (data.fadeIn) {
                        $(data.fadeIn).each(function (key, value) {
                            $(value).fadeIn(200).css("display", "flex");
                        });
                    }

                    //ELEMENT FADE OUT
                    if (data.fadeOut) {
                        $(data.fadeOut).each(function (key, value) {
                            $(value).fadeOut();
                        });
                    }

                    //ELEMENT FADE OUT AND REMOVE
                    if (data.fadeRemove) {
                        $(data.fadeRemove).each(function (key, value) {
                            $(value).fadeOut(400, function () {
                                $(this).remove();
                            });
                        });
                    }

                    //ELEMENT SLIDEUP
                    if (data.slideUp) {
                        $(data.slideUp).each(function (key, value) {
                            $(value).slideUp();
                        });
                    }

                    //UPDATE CONTENT
                    if (data.content) {
                        $.each(data.content, function (key, value) {
                            $(key).fadeTo(400, 0.1, function () {
                                $(this).html(value).fadeTo(200, 1);
                            });
                        });
                    }

                    //REDIRECT
                    if (!data.redirect && !data.reload) {
                        triggerLoadClose();
                    } else {
                        window.location.href = BASE + "/" + data.redirect;
                    }

                    //REFRESH TIME
                    if (data.redirect_on) {
                        setTimeout(function () {
                            window.location.href = BASE + "/" + data.redirect_on[0];
                        }, data.redirect_on[1]);
                    }

                    //RELOAD
                    if (data.reload) {
                        window.location.reload();
                    }

                    //CLOSE WINDOW
                    if (data.window_close) {
                        window.open('', '_self').close();
                    }

                    //CODE
                    if (data.code) {
                        if (typeof hljs !== 'undefined') {
                            setTimeout(function () {
                                $('*[class="brush: php;"]').each(function (i, block) {
                                    hljs.highlightBlock(block);
                                });
                            }, 500);
                        } else {
                            $("head").append('<link rel="stylesheet" href="' + BASE + '/_cdn/highlight.min.css">');
                            $.getScript(BASE + '/_cdn/highlight.min.js', function () {
                                $('*[class="brush: php;"]').each(function (i, block) {
                                    hljs.highlightBlock(block);
                                });
                            });
                        }
                    }
                }
            });
            return false;
        }
    });

    //IMAGE LOAD
    $('.wc_loadimage').change(function () {
        var input = $(this);
        var target = $('.' + input.attr('id'));
        var fileDefault = target.attr('default');

        if (!input.val()) {
            target.fadeOut('fast', function () {
                $(this).attr('src', fileDefault).fadeIn('slow');
            });
            return false;
        }

        if (this.files && (this.files[0].type.match("image/jpeg") || this.files[0].type.match("image/png"))) {
            triggerLoad($(this));
            var reader = new FileReader();
            reader.onload = function (e) {
                triggerLoadClose();
                target.fadeOut('fast', function () {
                    $(this).attr('src', e.target.result).width("100%").fadeIn('fast');
                });
            };
            reader.readAsDataURL(this.files[0]);
        } else {
            triggerAlert("yellow", "sad", "Oops " + NAME + ", erro ao salvar sua foto:", "Deu GAP aqui pois a foto deve ser em PNG ou JPG com 500x500px. Bora enviar uma nova foto?");

            target.fadeOut('fast', function () {
                $(this).attr('src', fileDefault).fadeIn('slow');
            });
            input.val('');
            return false;
        }
    });

    //NOTIFICATION CENTER
    if ($(".campus_notification_icon").length) {
        //NOTIFICATION ALERT
        setInterval(function () {
            $.post(BASE + "/_up/upinside_timeline.php", {rock: 'time_manager_notification_count'}, function (data) {
                if (data.notification) {
                    $(".campus_notification_icon span").text(data.notification).fadeIn(50);
                }
            }, 'json');
        }, 1000 * 10);

        //NOTIFICATION CLICK
        $(".campus_notification_icon").click(function (e) {
            e.stopPropagation();
            e.preventDefault();

            $(this).fadeOut(function () {
                $(".campus_notification_close").fadeIn().css("display", "inline-block");
            }).find("span").fadeOut();

            $.post(BASE + "/_up/upinside_timeline.php", {rock: 'time_manager_notification_list'}, function (data) {
                upTriggers(data);

                if (data.notifications) {
                    //ADD NOTIFICATIONS
                    $("body").append("<div class='campus_notification_center'></div>");
                    $(".campus_notification_center").slideDown(200);
                    $.each(data.notifications, function (key, value) {
                        $(".campus_notification_center").prepend(value);
                    });

                    //REMOVE NOTIFICATIONS
                    $("html, body").css("overflow", "hidden").on("click", "*:not( .campus_notification_icon, .campus_notification_icon span, .campus_notification_center, .campus_notification_center * )", function () {
                        $(".campus_notification_center").slideUp(200, function () {
                            $(this).remove();
                            if ($(".campus_notification_close").length) {
                                $(".campus_notification_close").fadeOut(function () {
                                    $(".campus_notification_icon").fadeIn();
                                });
                            } else {
                                $(".campus_notification_icon").fadeIn();
                            }
                            $("html, body").css("overflow", "auto");
                        });
                    });
                }
            }, 'json');

            $(".campus_notification_close").click(function () {
                var notification_close = $(this);
                $(".campus_notification_center").slideUp(200, function () {
                    $(this).remove();
                    notification_close.fadeOut(200, function () {
                        $(".campus_notification_icon").fadeIn(200);
                    });
                });
            });
        });
    }

    //TIMELINE LOAD
    $(".timeline_start").click(function () {
        var TimelineButton = $(this);

        $(window).scroll(function () {
            var timelineLoaded = $(".campus_timeline:visible");
            var windowScroll = $(document).scrollTop();

            if (windowScroll >= timelineLoaded.last().offset().top + 100 && $('.timeline_end').length) {
                $(".campus_timeline.ds_none:eq(0)").fadeIn().removeClass("ds_none");
            }

            if (!$(".campus_timeline.ds_none").length) {
                TimelineButton.fadeOut(200, function () {
                    $(".timeline_finish").fadeIn(200);
                });
            }
        });

        if (!TimelineButton.hasClass('timeline_end')) {
            $(this).removeClass('btn_blue').addClass('btn_red timeline_end').html('<span class="icon-stop">Parar Timeline</span>');
            $('.campus_timeline.ds_none:eq(0)').fadeIn();
        } else {
            $(this).removeClass('btn_red timeline_end').addClass('btn_blue').html('<span class="icon-spinner">Carregar Mais</span>');
        }
    });

    //HOTMART PAY
    $(".hotmart-fb").click(function () {
        var Button = $(this);

        function importHotmart() {
            var imported = document.createElement('script');
            imported.src = 'https://static.hotmart.com/checkout/widget.min.js';
            document.head.appendChild(imported);
        }

        importHotmart();
        setTimeout(function () {
            Button.click();
        }, 200);

        return false;
    });

    //TAB AUTOCLICK
    if (window.location.hash) {
        $("a[href='" + window.location.hash + "']").click();
    }

    /**
     * <b>DRAG AND DROP:</b> Cria interação de ordem de qualquer elemento marcado com...
     * @param data-id id na tabela do banco
     * @param data-order nome do campo de ordem da tabela
     * @example você precisa ter um botão azul com a classe j_drag dentro de um elemento pai onde os elementos a serem ordenados estão!
     */
    $(".j_drag").click(function () {
        var dragElements = $(this).parents().find("*[data-order='true']");

        if ($(this).hasClass('btn_yellow')) {
            $(this).removeClass('btn_yellow icon-floppy-disk').addClass('btn_blue icon-list-numbered');
            dragElements.click(function () {
                window.location.href = $(this).attr('href');
            });

            //NOTFY
            triggerNotify("green", "star-full", "Seus favoritos foram salvos,", "<p>Que a força esteja com você " + NAME + " pois aliada sua a UpInside é <span class='icon-grin icon-notext'></span></p>");

            var Rock = 'user_data_reorder';
            var Reorder = new Array();

            $.each($("*[draggable='true']"), function (i, el) {
                Reorder.push([$(el).attr('data-id'), $(el).attr('data-field'), i + 1]);
            });

            $.post(AJAX, {rock: Rock, reorder: Reorder}, function (data) {
                //ALL TRIGGERS
                upTriggers(data);

                dragElements.attr('draggable', false);
            }, 'json');
        } else {
            triggerNotify("blue", "star-empty", "Primero arraste e organize " + NAME + "!", "<p>Depois não esqueça de clicar novamente no botão para salvar tudo ok? <span class='icon-wink icon-notext'></span></p>");

            $(this).removeClass('btn_blue icon-list-numbered').addClass('btn_yellow icon-floppy-disk');
            dragElements.attr('draggable', true);
            dragElements.click(function () {
                return false;
            });
        }

        //GRAG
        $("html").on("drag", "*[draggable='true']", function (event) {
            event.preventDefault();
            event.stopPropagation();
            dragContent = $(this);
            dragPosition = $(this).index();
        });

        //OVER
        $("html").on("dragover", "*[draggable='true']", function (event) {
            event.preventDefault();
            event.stopPropagation();

            $(this).css('outline', '1px dashed #ccc');
        });

        //LEAVE
        $("html").on("dragleave", "*[draggable='true']", function (event) {
            event.preventDefault();
            event.stopPropagation();

            $(this).css('outline', '0');
        });

        //DROP
        $("html").on("drop", "*[draggable='true']", function (event) {
            event.preventDefault();
            event.stopPropagation();

            var dropElement = $(this);

            $(dropElement).css('outline', '0');
            if (dragPosition > dropElement.index()) {
                dropElement.before(dragContent);
            } else {
                dropElement.after(dragContent);
            }
        });
    });

    //TASK MANAGER
    if ($('.app_campus_task').length) {
        $.getScript(BASE + "/_cdn/vimeoplayer.js", function () {
            var TaskTarget = $('.app_campus_task_status');
            var TaskRepeat = null;
            var TaskPostIt = 10 * 1000;
            var TaskPlayer = ($(".app_campus_task_vimeo").length ? new Vimeo.Player(document.querySelector('.app_campus_task_vimeo')) : null);

            //NOT VIMEO PLAYER :: Time Control
            if (!TaskPlayer) {
                //PREVEND
                clearTimeout(TaskRepeat);

                //REPEAT
                TaskRepeat = setInterval(function () {
                    $.post(AJAX, {rock: 'user_task_access'}, function (data) {
                        //ALL TRIGGERS
                        upTriggers(data);

                        if (data.alert || data.confirm || data.letter) {
                            clearTimeout(TaskRepeat);
                        }

                        if (data.check) {
                            TaskTarget.fadeTo(400, 0.5, function () {
                                TaskTarget.html(data.check).fadeTo(400, 1);
                            });
                        }

                        if (data.stop) {
                            clearTimeout(TaskRepeat);
                        }
                    }, 'json');
                }, TaskPostIt);
            } else {
                //VIMEO PLAYER :: PREVENT
                clearTimeout(TaskRepeat);

                if ($('.app_campus_task_vimeo').attr('data-play') >= 10) {
                    TaskPlayer.setCurrentTime($('.app_campus_task_vimeo').attr('data-play') - 3).then(function () {
                        TaskPlayer.pause();
                    });
                }

                //PAUSE ON OPEN FOLDER
                $(".app_folder_open").click(function () {
                    TaskPlayer.pause();
                });

                //VIMEO PLAYER :: TASK
                TaskPlayer.on('play', function () {
                    //PAUSE VIMEO ON SCROLL
                    $(window).scroll(function () {
                        if ($(window).scrollTop() > $(".app_campus_task_media").offset().top + $(".app_campus_task_media").outerHeight()) {
                            TaskPlayer.pause();
                        }
                    });

                    //GET SECONDS TO UPDATE
                    var TaskSeconds = 0;
                    TaskPlayer.on('timeupdate', function (time) {
                        TaskSeconds = time.seconds;
                    });

                    //REPEAT
                    TaskRepeat = setInterval(function () {
                        $.post(AJAX, {rock: 'user_task_access', seconds: TaskSeconds}, function (data) {
                            //ALL TRIGGERS
                            upTriggers(data);

                            if (data.alert || data.confirm || data.letter) {
                                TaskPlayer.pause();
                                clearTimeout(TaskRepeat);
                            }

                            if (data.check) {
                                TaskTarget.fadeTo(400, 0.5, function () {
                                    TaskTarget.html(data.check).fadeTo(400, 1);
                                });
                            }

                            if (data.stop) {
                                clearTimeout(TaskRepeat);
                            }
                        }, 'json');
                    }, TaskPostIt);
                });

                //VIMEO PLAYER :: PAUSE PLAY AND STOP REPEAT
                TaskPlayer.on('pause', function () {
                    clearInterval(TaskRepeat);
                });

                TaskPlayer.on('ended', function () {
                    clearInterval(TaskRepeat);
                    $.post(AJAX, {rock: 'user_task_progress'});
                });
            }

            //TASK USER CHECK
            $(".app_campus_task_media_actions").on('click', ".app_campus_task_unchecked, .app_campus_task_checked", function () {
                $.post(AJAX, {rock: 'user_task_manager'}, function (data) {
                    //ALL TRIGGERS
                    upTriggers(data);

                    if (data.alert || data.confirm || data.letter) {
                        TaskPlayer.pause();
                        clearTimeout(TaskRepeat);
                    }

                    if (data.check) {
                        TaskTarget.fadeTo(400, 0.5, function () {
                            TaskTarget.html(data.check).fadeTo(400, 1);
                        });
                    }
                }, 'json');
            });
        });
    }

    //SUPPORT EDITOR
    if ($('.app_task_support_editor').length) {
        tinyMCE.init({
            selector: "textarea.app_task_support_editor",
            language: 'pt_BR',
            menubar: false,
            theme: "modern",
            height: 260,
            verify_html: true,
            skin: 'light',
            entity_encoding: "raw",
            theme_advanced_resizing: true,
            plugins: [
                "paste autolink link fullscreen"
            ],
            toolbar: "styleselect |  bold | italic | link | unlink | fullscreen",
            content_css: BASE + "/admin/_css/tinyMCE.css",
            style_formats: [
                {title: 'Normal', block: 'p'},
                {title: 'Título', block: 'h3'},
                {title: 'Código', block: 'pre', classes: 'brush: php;'}
            ],
            link_title: false,
            target_list: false,
            media_dimensions: false,
            media_poster: false,
            media_alt_source: false,
            media_embed: false,
            extended_valid_elements: "a[href|target=_blank|rel|class]",
            image_dimensions: false,
            relative_urls: false,
            remove_script_host: false,
            resize: false,
            paste_as_text: true
        });
    }

    //FORUM MANAGER
    //forum :: editor
    if ($('.forum_topic_response_form_editor').length) {
        tinyMCE.init({
            selector: "textarea.forum_topic_response_form_editor",
            language: 'pt_BR',
            menubar: false,
            theme: "modern",
            height: 150,
            verify_html: true,
            skin: 'light',
            entity_encoding: "raw",
            theme_advanced_resizing: true,
            plugins: [
                "paste autolink link fullscreen smileys"
            ],
            toolbar: "styleselect |  bold | italic | link | unlink | upinsideimage | smileys | fullscreen",
            content_css: BASE + "/admin/_css/tinyMCE.css",
            style_formats: [
                {title: 'Normal', block: 'p'},
                {title: 'Título', block: 'h3'},
                {title: 'Código', block: 'pre', classes: 'brush: php;'}
            ],
            setup: function (editor) {
                editor.addButton('upinsideimage', {
                    title: 'Enviar Imagem',
                    icon: 'image',
                    onclick: function () {
                        $(".forum_form_upload_image").trigger("click");
                    }
                });
            },
            link_title: false,
            target_list: false,
            media_dimensions: false,
            media_poster: false,
            media_alt_source: false,
            media_embed: false,
            extended_valid_elements: "a[href|target=_blank|rel|class]",
            image_dimensions: false,
            relative_urls: false,
            remove_script_host: false,
            resize: false,
            paste_as_text: true
        });

        $(".forum_form_upload_image").change(function () {
            $(".forum_form_upload").submit();
            $(this).val("");
        });

        $("*[data-response-user]").click(function () {
            var response_form = $(".forum_topic_response_form");
            var response_to = $(this).attr("data-response-user");
            var response_to_id = $(this).attr("data-response-user-id");

            tinyMCE.activeEditor.insertContent("<b class='forum_topic_response_to'>" + response_to + "</b>&nbsp;");
            if (!response_form.find("input[name='response_to']").length) {
                response_form.prepend("<input type='hidden' name='response_to' value='" + response_to_id + "' readonly/>");
            } else {
                var defalt_users = response_form.find("input[name='response_to']").val();
                response_form.find("input[name='response_to']").val(defalt_users + "," + response_to_id);
            }
        });
    }

    //UPINSIDE TIMELINE
    if ($(".upinside_timeline_post").length) {

        $(window).load(function () {
            $(".timeline_post_form").slideDown();
        });

        tinyMCE.init({
            selector: "textarea.timeline_post_form_create",
            language: 'pt_BR',
            menubar: false,
            theme: "modern",
            autoresize_min_height: 20,
            autoresize_bottom_margin: 0,
            autoresize_overflow_padding: 15,
            verify_html: true,
            skin: 'light',
            entity_encoding: "raw",
            theme_advanced_resizing: false,
            placeholder_attrs: {style: {'font-size': '0.9em', 'font-weight': '500', 'font-family': 'Open Sans', 'line-height': '1.2', position: 'absolute', top: '0', left: '0', color: '#888', padding: '15px', width: '100%', overflow: 'hidden', 'white-space': 'pre-wrap'}},
            plugins: [
                "paste autolink link fullscreen smileys autoresize placeholder"
            ],
            toolbar: "styleselect |  bold | italic | link | unlink | smileys",
            content_css: BASE + "/_up/upinside_timeline.css?t=4",
            style_formats: [
                {title: 'Normal', block: 'p'},
                {title: 'Título', block: 'h3'},
                {title: 'Código', block: 'pre', classes: 'brush: php;'}
            ],
            link_title: false,
            target_list: false,
            media_dimensions: false,
            media_poster: false,
            media_alt_source: false,
            media_embed: false,
            extended_valid_elements: "a[href|target=_blank|rel|class]",
            image_dimensions: false,
            relative_urls: false,
            remove_script_host: false,
            resize: false,
            paste_as_text: true,
            statusbar: false,
            setup: function (ed) {
                sendsubmit = null;
                ed.on("keyup", function () {
                    getTimelineMediaForUrl(tinyMCE.activeEditor.getContent(), $(this).attr("id"));
                    if ($(tinyMCE.activeEditor.getContent()).length < 3) {
                        sendsubmit = null;
                    }
                });
            }
        });

        function getTimelineMediaForUrl(Content, ed) {
            var imageMedia = $("#" + ed).parents("form").find(".timeline_post_form_media, .campus_timeline_comments_form_media");
            var imageLink = $(Content).find("a:not('.timeline_mention_user')").attr("href");
            if (!imageMedia.is(":visible") && typeof (imageLink) !== 'undefined' && (sendsubmit !== ed + imageLink)) {
                sendsubmit = ed + imageLink;
                $.ajax({
                    url: AJAX,
                    type: 'POST',
                    data: "rock=getUrlContent&url=" + imageLink,
                    dataType: 'json',
                    success: function (data, a, b) {
                        if (data.post) {
                            imageMedia.html(data.post).fadeIn();
                        }
                    }
                });
            } else {
                return false;
            }

            $(".timeline_post_form_media, .campus_timeline_comments_form_media").on('click', '.timeline_post_html_close', function () {
                var element_clear = $(this);
                $(this).parents("form").find(".timeline_post_form_media, .campus_timeline_comments_form_media").fadeOut(function () {
                    element_clear.parent(".timeline_post_html").remove();
                });
            });
        }

        //IMAGE LOAD
        $(".timeline_post_form_image").click(function () {
            //CLEAR YOUTUBE
            $(".timeline_post_form_video_select").val("").slideUp();
            $('.timeline_post_form_media').slideUp(400, function () {
                $(this).html("");
            });

            //START IMAGE
            $(".timeline_post_form_image_select").trigger("click");
            $(".timeline_post_form_image_select").change(function () {
                var input = $(this);
                var target = $('.timeline_post_form_media');

                if (this.files && (this.files[0].type.match("image/jpeg") || this.files[0].type.match("image/png"))) {
                    triggerLoad($(this));
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        triggerLoadClose();
                        target.html("<img src='" + e.target.result + "' alt='' title=''/>").slideDown();
                    };
                    reader.readAsDataURL(this.files[0]);
                } else {
                    target.slideUp(400, function () {
                        triggerAlert("yellow", "sad", "Oops " + NAME + ", erro ao salvar sua foto:", "Para publicar um momento com uma imagem ou foto, ela deve ser do tipo PNG ou JPG ok?");
                        $(this).html("");
                    });

                    input.val('');
                    return false;
                }
            });
        });

        //VIDEO LOAD
        $(".timeline_post_form_video").click(function () {
            //CLEAR IMAGE
            $(".timeline_post_form_image_select").val("");
            $('.timeline_post_form_media').slideUp(400, function () {
                $(this).html("");
            });

            //START YOUTUBE
            $(".timeline_post_form_video_select").val("").fadeToggle(400, function () {
                $(this).bind("change paste", function () {
                    $(this).fadeOut();
                    var playThisVideo = $(this).val();
                    var numericTest = /[^0-9]/;
                    if (playThisVideo && numericTest.test(playThisVideo)) {
                        $(".timeline_post_form_media").html("<div class='embed-container'><iframe width='560' height='315' src='https://www.youtube.com/embed/" + playThisVideo + "?rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;autoplay=1' frameborder='0' allowfullscreen></iframe></div>").slideDown(400);
                    }

                    if (playThisVideo && !numericTest.test(playThisVideo)) {
                        $(".timeline_post_form_media").html("<div class='embed-container'><iframe src='https://player.vimeo.com/video/" + playThisVideo + "?color=596273&title=0&byline=0&portrait=0&autoplay=1' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>").slideDown(400);
                    }
                });
            });
        });

        //RESPONSE VIDEO LOAD
        $(".campus_timeline_comments_form_video").click(function () {
            var playVideoAction = $(this);
            var timelineResForm = playVideoAction.parents("form");

            //RESET IMAGE
            $(".campus_timeline_comments_form_image_i").val("");
            timelineResForm.find(".campus_timeline_comments_form_media").slideUp(400, function () {
                $(this).html("");
            });

            playVideoAction.find(".campus_timeline_comments_form_video_i").fadeIn(200, function () {
                var playVideoInput = $(this);
                playVideoInput.bind("change paste", function () {
                    $(this).fadeOut();

                    var playThisVideo = playVideoInput.val();
                    var numericTest = /[^0-9]/;
                    if (playThisVideo && numericTest.test(playThisVideo)) {
                        timelineResForm.find(".campus_timeline_comments_form_media").html("<div class='embed-container'><iframe width='560' height='315' src='https://www.youtube.com/embed/" + playThisVideo + "?rel=0&amp;showinfo=0&amp;iv_load_policy=3&amp;autoplay=1' frameborder='0' allowfullscreen></iframe></div>").slideDown(400);
                    }

                    if (playThisVideo && !numericTest.test(playThisVideo)) {
                        timelineResForm.find(".campus_timeline_comments_form_media").html("<div class='embed-container'><iframe src='https://player.vimeo.com/video/" + playThisVideo + "?color=596273&title=0&byline=0&portrait=0&autoplay=1' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>").slideDown(400);
                    }
                });
            }).val("").focus();
        });

        //RESPONSE IMAGE LOAD
        $(".campus_timeline_comments_form_image").click(function () {
            var timelineResForm = $(this).parents("form");
            var playImageAction = timelineResForm.find(".campus_timeline_comments_form_image_i");

            //CLEAR YOUTUBE
            $(".campus_timeline_comments_form_video_i").val("");
            timelineResForm.find(".campus_timeline_comments_form_media").slideUp(400, function () {
                $(this).html("");
            });

            //START IMAGE
            playImageAction.trigger("click");
            playImageAction.change(function () {
                var input = $(this);
                var target = timelineResForm.find('.campus_timeline_comments_form_media');

                if (this.files && (this.files[0].type.match("image/jpeg") || this.files[0].type.match("image/png"))) {
                    triggerLoad($(this));
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        triggerLoadClose();
                        target.html("<img src='" + e.target.result + "' alt='' title=''/>").slideDown();
                    };
                    reader.readAsDataURL(this.files[0]);
                } else {
                    target.slideUp(400, function () {
                        triggerAlert("yellow", "sad", "Oops " + NAME + ", erro ao salvar sua foto:", "Para publicar um momento com uma imagem ou foto, ela deve ser do tipo PNG ou JPG ok?");
                        $(this).html("");
                    });

                    input.val('');
                    return false;
                }
            });
        });

        //MENTION USER
        $("body").on("click", ".timeline_comment_actions_mention", function () {
            var mentionClik = $(this);
            var mentionUser = mentionClik.attr("data-mention");
            var mentionUserId = mentionClik.attr("data-user");
            var mentionForm = mentionClik.parents('article').find("form");
            var activeForm = mentionForm.attr("id");

            if (!$(mentionForm).find("input[name='comment_mentions']").length) {
                $(mentionForm).append("<input id='input_mention_remove' name='comment_mentions' type='hidden' value='" + mentionUserId + "'/>");
            } else {
                var inputMention = $("#" + activeForm).find("input[name='comment_mentions']");
                inputMention.val(inputMention.val() + "," + mentionUserId);
            }

            tinyMCE.get("active_editor_" + activeForm).insertContent("<a class='timeline_mention_user' data-user='" + mentionUserId + "' href='" + BASE + "/" + mentionUser + "'>" + mentionUser + "</a> ");
        });

        //MENTION BAR
        $(".timeline_comment_action_mention input").keyup(function (e) {
            var mention = $(this);
            var mentionForm = mention.attr('data-form');
            var mentionEdit = mention.attr('data-edit');

            if (mention.val().replace("@", "").length >= 5) {
                $.post(BASE + "/_up/upinside_timeline.php", {rock: 'timeline_comment_action_mention', mention: mention.val().replace("@", "")}, function (data) {
                    if (data.mentions) {
                        $("." + mentionForm + " .timeline_comment_action_mention_result").html(data.mentions);
                        $("." + mentionForm + " .timeline_comment_action_mention_result p").click(function () {
                            var mentionClik = $(this);
                            mentionClik.fadeOut(200);

                            if (!$("." + mentionForm).find("input[name='comment_mentions']").length) {
                                $("." + mentionForm).append("<input id='input_mention_remove' name='comment_mentions' type='hidden' value='" + mentionClik.attr("id") + "'/>");
                            } else {
                                var inputMention = $("." + mentionForm).find("input[name='comment_mentions']");
                                inputMention.val(inputMention.val() + "," + mentionClik.attr("id"));
                            }

                            tinyMCE.get("active_editor_" + mentionEdit).insertContent("<a class='timeline_mention_user' data-user='" + mentionClik.attr("id") + "' href='" + BASE + "/" + mentionClik.text() + "'>" + mentionClik.text() + "</a> ");
                        });
                    }
                }, 'json');
            } else {
                $(".timeline_comment_action_mention_result p").each(function () {
                    $(this).remove();
                });
            }
        });

        //LOAD COMMENTS
        $(".timeline_comment_count").click(function () {
            var timeline = $(this);
            var timelineId = timeline.attr("id");
            var timelineOn = $("#" + timelineId + " .campus_timeline_comments_post.ds_none");

            if (!(timelineOn).is(":visible")) {
                timeline.find("span").html("ocultar <b>" + timeline.find("b").text() + "</b> comentários anteriores");
                timelineOn.slideDown();
            } else {
                timeline.find("span").html("ver + <b>" + timeline.find("b").text() + "</b> comentários anteriores");
                timelineOn.slideUp();
            }
        });
    }

    if ($('.pagarme_js').length) {
        $.getScript('https://assets.pagar.me/js/pagarme.min.js');
    }

    $('input[name="data_payment_type"]').on('change', function () {
        var type = $(this).val();

        if (type === 'boleto') {
            $('.data_payment_type_credit_card').slideUp();
            $('.data_payment_type_boleto').slideDown();
        } else {
            $('.data_payment_type_boleto').slideUp();
            $('.data_payment_type_credit_card').slideDown();
        }
    });

    $('input[name="data_paymend_card_item"]').on('change', function () {
        $('.card_item').addClass('card_item_unselected');
        $('#' + $(this).val() + '.card_item').removeClass('card_item_unselected').addClass('card_item_selected');
    });

    //CHANGE PLAN STEP
    $(".signature_modal_box_form_plan").change(function () {
        if ($(this).val() === 'card') {
            $(".signature_modal_box_form_newplan").slideDown(200, function () {
                $(this).find("input").first().focus();
            });
        } else {
            $(".signature_modal_box_form_newplan").slideUp(200, function () {
                $(this).find("input").val("");
            });
        }
    });

    $(".signature_modal_open").click(function () {
        $(".signature_modal").fadeIn(200).css("display", "flex");
        $("body").css("overflow", "hidden");
    });

    $(".signature_modal_close").click(function () {
        $(".signature_modal").fadeOut(200, function () {
            window.location.hash = "#assinatura";
            window.location.reload();
        });
        $("body").css("overflow", "auto");
    });

    //VIP
    $(".keep_vip_open").click(function () {
        $(".keep_vip").fadeIn(200);
    });

    $(".keep_vip_accept").click(function () {
        $(".keep_vip").fadeOut(200);
    });

    $(".keep_vip_recuse").click(function () {
        triggerConfirm("warning", "Hey " + NAME + ", você tem certeza que deseja abrir mão do seu Club VIP?<p>Ao fazer isso vamos destinar a vaga a outro aluno e você não terá mais acesso a oferta.</p>", "QUERO O VIP!", "ABRIR MÃO!", function (e) {
            if (e === false) {

                $.post(AJAX, {rock: 'keep_vip', keep: '2'}, function (data) {}, 'json');

                $(".keep_vip").fadeOut(200, function () {
                    triggerAlert("red", "sad", "Sua vaga foi destinada a outro aluno :/", "Caso se arrependa você ainda pode enviar um e-mail para cursos@upinside.com.br para verificarmos se ainda há vagas disponíveis.</p>");
                });
            } else {
                $(".keep_vip_accept").click();
            }
        });
    });

    $(".vip_change_plan").click(function () {
        triggerConfirm("heart", "Shooow " + NAME + ", então vamos migrar seu plano agora mesmo para o Club VIP ok?", "OK!", "AGORA NÃO :/", function (e) {
            if (e === false) {
            } else {
                $.post(AJAX, {rock: 'update_club_to_vip', club_vip: '1'}, function (data) {

                    if(data.reload){
                        window.location.reload();
                    }
                }, 'json');
            }
        });
    });

    $(".keep_vip_close").click(function () {
        $(".keep_vip").fadeOut(200, function () {
            $.post(AJAX, {rock: 'keep_vip', keep: '1'}, function (data) {}, 'json');
        });
    });

    $(".view_keep_vip").click(function () {
        $.post(AJAX, {rock: 'view_keep_vip', keep: '1'}, function (data) {}, 'json');
        window.location.reload();
    });
});

/**
 * DEPOIMENTOS: Controla os depoimentos na home da UpInside.
 */
function homeVideoPlayBack() {
    if ($('.jup_home_about_slide iframe').length) {
        window.setTimeout(function () {
            $('.jup_home_about_slide').each(function () {
                var MediaItemImage = $(this).attr('id');
                $(this).find('.media').html('<div class="media_false_bg"><div class="media_play jup_media_play radius" id="' + MediaItemImage + '"><span class="icon-play3 icon-notext"></span></div></div><img src="' + BASE + '/themes/upinside/images/reviews/' + MediaItemImage + '.jpg" alt="" title=""/>');
            });
        }, 100);
    }
}