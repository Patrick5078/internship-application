// Global variable to set language
        var globalLanguage;

        function getAndApplyLanguage(language) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    globalLanguage = JSON.parse(this.responseText)
                    var elems = document.body.getElementsByTagName("*");
                    var date = new Date
                    var currentDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
                    var dateP = document.getElementById('date');
                    dateP.innerHTML = currentDate;
                    // Writing the JSON strings to the DOM by matching key name and elem id name
                    for (var i = 0; i < elems.length; i++) {
                        if (globalLanguage[elems[i].id]) {
                            elems[i].innerHTML = globalLanguage[elems[i].id]
                        }
                    }
                }
            };
            xhttp.open("GET", "languages/" + language + ".json", true);
            xhttp.send();
        }

        // Bit of a weird way to get the language param, but github does not support server side code.

        var url = window.location.href
        if (url.includes("?")) {
            var urlLanguageParam = url.split("?")[1].split("=")[1]
            if (urlLanguageParam == "dk") {
                getAndApplyLanguage("danish")
            }
            else {
                getAndApplyLanguage("english")
            }
        }
        else {
            getAndApplyLanguage("english")
        }

        flagEnglish.addEventListener("click", function () {
            getAndApplyLanguage("english")
            var baseUrl = window.location.href.split('?')[0]
            history.replaceState({}, null, baseUrl + '?lang=en')
        })

        flagDanish.addEventListener("click", function () {
            getAndApplyLanguage('danish')
            var baseUrl = window.location.href.split('?')[0]
            history.replaceState({}, null, baseUrl + '?lang=dk')
        })