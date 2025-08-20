
javascript: (function () {
    let s = JSON.parse(localStorage.getItem("nikalib")) ?? {};
    [...document.querySelectorAll("body > div > main > div > div > div.flex.gap-8")].map(elem => [
        elem.querySelector("div > a ").href.replace("https://booth.pm/ja/items/", ""),
        elem.querySelector("div > a > div").innerText,
        elem.querySelector("div > a > div > div").innerText,
        elem.querySelector("div > a ").href
    ]).forEach(v => s[v[0]] = v);
    localStorage.setItem("nikalib", JSON.stringify(s));
    alert("success!");
    document.querySelector("div.pager > nav > ul > li > a > i.icon-arrow-open-right")?.click();
})();