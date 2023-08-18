//Código em javascript nativo para trabalhar com cookies

let CookiesJS = {
    setCookie: function (cname, cvalue, exdays = 2147483647) {
        let date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    getCookie: function (cname) {
        let name = cname + "=";
        let allCookies = document.cookie.split(';');
        for (var i = 0; i < allCookies.length; i++) {
            var cookie = allCookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    },

    checkCookie: function (cname) {
        let cookie = this.getCookie(cname);
        return cookie;
    }
}