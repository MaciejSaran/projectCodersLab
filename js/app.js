$(function () {


    // listy rozwijane - wyjezdzanie
    $('.list').hide();
    $('span').on('click', (e) => {

        $('.list').hide(500);
        $(e.target).parent().next().children().show(500);
    });

    //zaznacza kliknięte linki - w css jest ta klasa ostylowana
    $(".change").on('click', function () {
        $('.slider').removeClass('hidden');
        $(this).toggleClass("active");
    });

    $(".menu").find("a").on('click', function () {
        $(this).addClass("active");
    });

    // dane z API
    var url = "http://localhost:3000/movies";
    var changeParam = $(".change");

    // wybieranie wszystkich filmów i wrzucanie ich do slidera
    let sectionAll = $("#allMovies");
    if (sectionAll.length > 0) {
        let slider = $("#slider");
        let innerSlider = $(".carousel-inner");

        $(innerSlider)[0].innerHTML = "";
        $.ajax({
            url: url,
            method: "GET",
            dataType: "jsonp"
        }).done((response) => {
            var counter = response.length;
            $(".counter").text(counter);
            let arrayImg = [];
            let carouselItem = null;
            response.map((e, i) => {
                arrayImg.push(e.images);
                if (i == 0) {
                    carouselItem = $('<div class="carousel-item active">');
                } else {
                    carouselItem = $('<div class="carousel-item">');
                }
                let img = $('<img class="d-block">');
                img.attr('src', e.images);
                carouselItem.append(img);
                innerSlider.append(carouselItem);
                img.on("click", function () {
                    $(".modal-title").text(e.title);
                    $(".movieType").text(e.type);
                    $(".movieYear").text(e.year);
                    $(".movieNomination").text(e.nominations);
                    $(".movieUrl").attr('href', e.urlFilmWeb);
                    $(".movieImg").attr('src', e.images)
                    $("#exampleModalCenter").modal("show");
                });
            });

        }).fail((error) => {
            console.log("err");
        });

    }

    //losowanie 3 filmów z całego jsona i wrzucanieich do slidera
    let sectionRandom = $("#randomMovies");
    if (sectionRandom.length > 0) {
        //ta funkcja miesza tablicę
        function shuffle(a) {
            for (var i = a.length; i; i--) {
                var j = Math.floor(Math.random() * i);
                [a[i - 1], a[j]] = [a[j], a[i - 1]];
            }
        }

        let slider = $("#slider");
        let innerSlider = $(".carousel-inner");
        $(innerSlider)[0].innerHTML = "";
        $.ajax({
            url: url,
            method: "GET",
            dataType: "jsonp"
        }).done((response) => {

            var myArray = response;
            shuffle(myArray);
            var arrayRandom = [myArray[0], myArray[1], myArray[2]];

            let carouselItem = null;
            arrayRandom.map((e, i) => {

                if (i == 0) {
                    carouselItem = $('<div class="carousel-item active">');
                } else {
                    carouselItem = $('<div class="carousel-item">');
                }
                let img = $('<img class="d-block">');
                img.attr('src', e.images);
                carouselItem.append(img);
                innerSlider.append(carouselItem);
                img.on("click", function () {
                    $(".modal-title").text(e.title);
                    $(".movieType").text(e.type);
                    $(".movieYear").text(e.year);
                    $(".movieNomination").text(e.nominations);
                    $(".movieUrl").attr('href', e.urlFilmWeb);
                    $(".movieImg").attr('src', e.images)
                    $("#exampleModalCenter").modal("show");
                });
            });

        }).fail((error) => {
            console.log("err");
        });


    }

    var types = [];
    var years = [];
    var nominations = [];

    changeParam.on("click", function () {
        let dataType = $(this).data("type");
        let dataValue = $(this).data("value");
        if (dataType == "genre") {
            if (types.indexOf(dataValue) < 0) {
                types.push(dataValue);
            } else {
                let index = types.indexOf(dataValue);
                types.splice(index, 1);
            }
        } else if (dataType == "year") {
            if (years.indexOf(dataValue) < 0) {
                years.push(dataValue);
            } else {
                let index = years.indexOf(dataValue);
                years.splice(index, 1);
            }
        } else if (dataType == "nomination") {
            if (nominations.indexOf(dataValue) < 0) {
                nominations.push(dataValue);
            } else {
                let index = nominations.indexOf(dataValue);
                nominations.splice(index, 1);
            }
        }

        nominations.sort();
        let urlParams = '?';



        years.forEach(year => {
            urlParams += urlParams == "?" ? "years=" + year : '&years=' + year;
        });
        types.forEach(type => {
            urlParams += urlParams == "?" ? "type=" + type : '&type=' + type;
        });
        nominations.forEach((nomination, index) => {
            urlParams += urlParams == "?" ? "nominations=" + nomination : '&nominations=' + nomination;
        });
        if (nominations.length > 1) {
            urlParams += nominations.length > 0 ? '&nominations=' : '';
            nominations.forEach((nomination, index) => {
                urlParams += index == 0 ? nomination : ',' + nomination;
            });
        }



        let slider = $("#slider");

        if (types.length == 0 && years.length == 0 && nominations.length == 0) {
            slider.hide();
        } else {
            slider.show();
        }


        let innerSlider = $(".carousel-inner");
        $(innerSlider)[0].innerHTML = "";
        $.ajax({
            url: url + urlParams,
            method: "GET",
            dataType: "jsonp"
        }).done((response) => {
            var counter = response.length;
            $(".counter").text(counter);
            var arrayImg = [];
            let carouselItem = null;
            response.map((e, i) => {
                arrayImg.push(e.images);
                if (i == 0) {
                    carouselItem = $('<div class="carousel-item active">');
                } else {
                    carouselItem = $('<div class="carousel-item">');
                }
                let img = $('<img class="d-block">');
                img.attr('src', e.images);
                carouselItem.append(img);
                innerSlider.append(carouselItem);
                img.on("click", function () {
                    $(".modal-title").text(e.title);
                    $(".movieType").text(e.type);
                    $(".movieYear").text(e.year);
                    $(".movieNomination").text(e.nominations);
                    $(".movieUrl").attr('href', e.urlFilmWeb);
                    $(".movieImg").attr('src', e.images)
                    $("#exampleModalCenter").modal("show");
                });
            });

        }).fail((error) => {
            console.log("err");
        });


    });

    $(".button").on('click', function () {
        $(".slider").toggleClass("activeSlider");
        $("#choice").hide();
    });

    $(".gatunek").on('click', function () {
        $(".genreList").toggleClass("hiddenList");
    });

});