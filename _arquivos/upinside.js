/*
 * INSTANCE UPINSIDE FRAMEWORK
 */

BASE = $("link[rel='base']").attr("href");

$("head").append("<link rel='stylesheet' href='" + BASE + "/_up/upinside.css'/>");

/**
 * <b>upTriggers:</b> Ao criar um shorthund ou um disparo ajax, coloque essa
 * função dentro do callback e passe o retorno nela para monitorar e disparar
 * todas as triggers!
 * @example CALLBACK $.post(AJAX, function(data){ upTriggers(data); });
 */
function upTriggers(data) {
    if (data.notify) {
        upTriggerNotify(data);
    }

    if (data.alert) {
        upTriggerAlert(data);
    }

    if (data.confirm) {
        upTriggerConfirm(data);
    }

    if (data.letter) {
        upTriggerLetter(data);
    }
}

/**
 * <b>triggerNotify:</b> Gera uma notificação rápida para o aluno sem travar o fluxo de navegação.
 * @param color cor da modal [ green | blue | red | yellow ]
 * @param icon Ícone a ser utilizada Ex: [ warning | info | checkmark ]
 * @param title Título da nofiticação
 * @param notify Mensagem da notificação
 */
function triggerNotify(color, icon, title, notify) {
    if (!$(".up_notify").length) {
        $("body").append("<div class='up_notify'></div>");
    }
    $(".up_notify_box:gt(2)").animate({"left": "100%", "opacity": "0"}, 200, function () {
        $(this).remove();
    });
    $(".up_notify").prepend("<div class='up_notify_box bg_" + color + "'><b class='icon-" + icon + "'>" + title + "</b> " + notify + "</div>");
    $(".up_notify_box").animate({"left": "0", "opacity": "1"}, 200, function () {
        var BoxNofity = $(this);
        setTimeout(function () {
            BoxNofity.animate({"left": "100%", "opacity": "0"}, 200, function () {
                $(this).remove();
            });
        }, 10 * 1000);
    });

    $(".up_notify_box").click(function (e) {
        var notifyBox = $(this);
        if (e.target === this) {
            notifyBox.fadeOut(function () {
                $(this).remove();
            });
        }
    });
}

//Executa a triggerNotify com Array!
function upTriggerNotify(data) {
    if (!data.notify.length) {
        triggerNotify(data.notify.color, data.notify.icon, data.notify.title, data.notify.notify);
    } else {
        $.each(data.notify, function (key, value) {
            setTimeout(function () {
                triggerNotify(value.color, value.icon, value.title, value.notify);
            }, key * 600);
        });
    }
}

/**
 * <b>triggerConfirm:</b> Gera uma mensagem de confirmação para o usuário antes de executar o trexo de código.
 * @example if(trggerConfirm(params){ Execute; }
 * @param icon Ícone a ser utilizada Ex: [ warning | info | checkmark ]
 * @param confirm Pergunta de confirmação
 * @param btn_true Texto do botão de aceitação
 * @param btn_false Texto do borão de cancelamento
 * @param callback um array com ação a ser executada
 * @param action uma função para determinar a ação do usuário
 */
function triggerConfirm(icon, confirm, btn_true, btn_false, action) {
    //CREATE BOX
    btn_false = (btn_false ? "<span class='btn btn_red icon-cancel-circle up_confirm_false'>" + btn_false + "</span>" : "");
    $("body").append("<div class='up_confirm'><div class='up_confirm_box'><div class='up_confirm_box_content'><span class='up_confirm_box_content_icon icon-" + icon + " icon-notext'></span>" + confirm + "</div><div class='up_confirm_box_action'><span class='btn btn_green icon-checkmark up_confirm_true'>" + btn_true + "</span>" + btn_false + "</div></div></div>");

    //SHOW BOX
    $(".up_confirm").fadeIn(200, function () {
        $(".up_confirm_box").animate({"top": "0", "opacity": "1"}, 200);
    }).css("display", "flex");

    //ACTION BOX
    $(".up_confirm_true").click(function (data) {
        confirmRemove();
        action(true);
    });

    $(".up_confirm_false").click(function () {
        confirmRemove();
        action(false);
    });

    function confirmRemove() {
        $(".up_confirm_box").animate({"top": "100", "opacity": "0"}, 200, function () {
            $(".up_confirm").fadeOut(200, function () {
                $(this).remove();
            });
        });
    }
}

//Executa triggerConfirm com Array e monitora eventos!
function upTriggerConfirm(data) {
    //Array Action
    var confirmAction = data.confirm.callback;

    //Trigger SHOW
    triggerConfirm(data.confirm.icon, data.confirm.confirm, data.confirm.btn_true, data.confirm.btn_false, function (callback) {
        if (callback === true) {
            //Redirect Action
            if (confirmAction.redirect) {
                window.location.href = BASE + "/" + confirmAction.redirect;
            }

            //Reload
            if (confirmAction.reload) {
                window.location.reload();
            }
        }
    });
}

/**
 * <b>triggerAlert:</b> Gera um alerta resumido para o aluno. Pode ser um erro de login, ou uma tarefa importante executada. <p><b>ATENÇÃO:</b> Essa modal gera overlay e trava o fluxo de navegação!</p>
 * @param color cor da modal [ green | blue | red | yellow ]
 * @param icon Ícone a ser utilizada Ex: [ warning | info | checkmark ]
 * @param title Título do alerta
 * @param alert Mensagem do alerta
 */
function triggerAlert(color, icon, title, alert) {
    $("body").css("overflow", "hidden").append("<div class='up_alert'><div class='up_alert_box bg_" + color + "'><span class='icon-cross icon-notext up_alert_close'></span><div class='up_alert_box_icon icon-" + icon + "'></div><div class='up_alert_box_content'><p class='title'>" + title + "</p><p>" + alert + "</p></div></div></div>");
    $(".up_alert").fadeIn(200, function () {
        $(".up_alert_box").animate({"top": "0", "opacity": "1"}, 200);

        $(".up_alert_close").click(function () {
            $("body").css("overflow", "auto");

            $(".up_alert_box").animate({"top": "100", "opacity": "0"}, 200, function () {
                $(".up_alert").fadeOut(200, function () {
                    $(this).remove();
                });
            });
        });
    }).css("display", "flex");
}

//Executa a trigger alert com Array!
function upTriggerAlert(data) {
    triggerAlert(data.alert.color, data.alert.icon, data.alert.title, data.alert.alert);
}


/**
 * <b>triggerLetter:</b> Cria uma modal que pode variar entre title, header ou media. Serve para uma conquista, um formuário, um vídeo, entre outros. <p><b>ATENÇÃO:</b> Essa modal gera overlay e trava o fluxo de navegação!</p>
 * @param headerType tipo de modal [title | header | image | youtube ]
 * @param color cor da modal [ green | blue | red | yellow ]
 * @param icon Ícone a ser utilizada Ex: [ warning | info | checkmark ]
 * @param title Título da carta
 * @param letter HTML ou conteúdo da carta
 * @param media Id de um vídeo do YouTube ou SRC de uma imagem
 */
function triggerLetter(headerType, color, icon, title, letter, media) {
    var BoxHeader = null, BoxTitle = null;
    if (headerType === "title") {
        BoxHeader = "<div class='up_letter_box_title bg_" + color + "'><p class='icon-" + icon + "'>" + title + "</p><span class='icon-cross icon-notext up_letter_close'></span></div>";
    } else if (headerType === "header") {
        BoxHeader = "<div class='up_letter_box_header bg_" + color + " icon-" + icon + " icon-notext'></div><span class='icon-cross icon-notext up_letter_close up_letter_box_header_close'></span>";
        BoxTitle = "<p class='up_letter_box_content_title'>" + title + "</p>";
    } else if (headerType === "image") {
        BoxHeader = "<div class='up_letter_box_media'><img style='width: 100%;' alt='" + title + "' title='" + title + "' src='" + media + "'/><span class='icon-cross icon-notext up_letter_close up_letter_box_header_close'></span></div>";
        BoxTitle = "<p class='up_letter_box_content_title'>" + title + "</p>";
    } else if (headerType === "youtube") {
        BoxHeader = "<div class='up_letter_box_media'><div class='embed-container'><iframe width='560' height='315' src='https://www.youtube.com/embed/" + media + "?rel=0&amp;showinfo=0&amp;autoplay=1' frameborder='0' allowfullscreen></iframe></div><span class='icon-cross icon-notext up_letter_close up_letter_box_header_close'></span></div>";
        BoxTitle = "<p class='up_letter_box_content_title'>" + title + "</p>";
    } else {
        triggerConfirm("warning", "O headertype informado não é compatível. Você pode usar os seguintes types: <p> title, header, image ou youtube", "Ok, eu entendi!</p>");
        return;
    }

    //CREATE LETTER
    $("body").css("overflow", "hidden").append("<div class='up_letter'><div class='up_letter_box'>" + BoxHeader + "<div class='up_letter_box_content'>" + (BoxTitle ? BoxTitle : "") + letter + "</div></div></div>");
    $(".up_letter").fadeIn(200).css("display", "flex");

    //CLOSE LETTER
    $(".up_letter_close").click(function () {
        $("body").css("overflow", "auto");
        $(".up_letter").fadeOut(200, function () {
            $(this).remove();
        });
    });
}

//Executa triggerAlert com Array!
function upTriggerLetter(data) {
    triggerLetter(data.letter.headerType, data.letter.color, data.letter.icon, data.letter.title, data.letter.letter, data.letter.media);
}

/**
 * <b>triggerLoad:</b> Cria e executa uma janela modal para informar carregamento de elementos ou ações
 * @param Element Elemento encapsulado onde a ação vai acontecer!
 */
function triggerLoad(Element) {
    //LOAD ADD IF EMPTY
    if (!Element.find(".up_form_load").length) {
        $("body").append("<div class='up_form_load'><img title='Aguarde, processando requisição.' alt='Aguarde, processando requisição.' src='" + BASE + "/_up/images/load_white.gif'/></div>");
    }

    //LOAD SHOW
    $(".up_form_load").fadeIn(200);
}

/**
 * <b>triggerLoadclose:</b> Fecha uma modal de carregamento de triggerLoad();
 */
function triggerLoadClose() {
    $('.up_form_load').fadeOut(200, function () {
        $(this).remove();
    });
}

/**
 * NORMALIZE: Equaliza a altura de elementos ou de conteúdo de elementos.
 * ele: Utilize a classe .jup_normalize_height em elementos para normalizar.
 * con: Utilize a classe .jup_normalize_height_content em conteúdo para normalizar.
 */
function upNormalizeHeight() {
    $(".jup_normalize_height:visible").parent().each(function () {
        var maxHeight = 0;
        var normalize = $(this).find(".jup_normalize_height");

        normalize.each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        }).height(maxHeight);
    });

    var maxContent = 0;
    $(".jup_normalize_height_content").each(function () {
        if ($(this).height() > maxContent) {
            maxContent = $(this).height();
        }
    }).height(maxContent);
}