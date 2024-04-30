// ==UserScript==
// @name        MarketSellScript
// @match       *://*rivalregions.com/
// @version     0.0.1
// @author      @mfurkan46
// @description Market Sell Bot
// @downloadURL https://github.com/mfurkan46/games-script/raw/main/MarketSell.js
// ==/UserScript==

window.addEventListener("popstate", listener);

const pushUrl = (href) => {
  history.pushState({}, "", href);
  window.dispatchEvent(new Event("popstate"));
};

listener();

function listener() {
  const products = [
    {
      name: "petrol",
      num: 3,
    },
    {
      name: "maden",
      num: 4,
    },
    {
      name: "uranyum",
      num: 11,
    },
    {
      name: "elmas",
      num: 15,
    },
    {
      name: "riva",
      num: 26,
    },
  ];
  if (location.href.includes("storage")) {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.width = "150px";
    div.style.gap = "4px";
    div.style.marginTop = "10px";
    div.style.marginLeft = "10px";
    div.style.zIndex = "9999";
    div.id = "mfdiv";
    const opt = document.createElement("select");
    opt.id = "selectlist";
    opt.style.padding = "5px";
    opt.style.borderRadius = "10px";
    const min = document.createElement("input");
    min.placeholder = "Min fiyat girin";
    min.setAttribute("type", "number");
    min.setAttribute("min", "1");
    min.id = "minprice";
    min.style.padding = "5px";
    min.style.borderRadius = "10px";
    const run = document.createElement("button");
    run.id = "run1";
    run.style.borderRadius = "10px";
    run.style.padding = "5px";
    const run2 = document.createElement("button");
    run2.id = "run2";
    run2.style.display = "none";

    run.innerHTML = "Başlat";
    const timerspan = document.createElement("span");
    timerspan.innerHTML = "5:00";
    timerspan.id = "timer";
    timerspan.style.fontSize = "25px";
    timerspan.style.margin = "auto";
    timerspan.style.color = "white";
    document.querySelector("body").appendChild(div);
    document.querySelector("#mfdiv").appendChild(opt);
    document.querySelector("#mfdiv").appendChild(min);
    document.querySelector("#mfdiv").appendChild(run);
    document.querySelector("#mfdiv").appendChild(timerspan);
    document.querySelector("#mfdiv").appendChild(run2);
    run.addEventListener("click", runbutton);
    document.getElementById("run2").addEventListener("click", run2func);
    function runbutton() {
      const selected = document.getElementById("selectlist");
      const value = selected.options[selected.selectedIndex].value;
      const minprice = document.getElementById("minprice").value || 1;

      fetch(`https://rivalregions.com/storage/market/${value}`, {
        headers: {
          accept: "text/html, */*; q=0.01",
          "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua":
            '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
        referrer: "https://rivalregions.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: `c=${c_html}`,
        method: "POST",
        mode: "cors",
        credentials: "include",
      })
        .then((res) => res.text())
        .then((text) => {
          const price2 = text
            .match(/([1-9][0-9]*((,| )[0-9]{3})*|0)(\.[0-9]+)*[ ](\₺)/gm)[0]
            .replace("₺", "");
          run2func(Number(price2.replaceAll(".", "")), value, minprice);
        });

      setInterval(function () {
        document.getElementById("run1").click();
      }, 305000);
    }
    function run2func(price, value, minprice) {
      let newprice = price - 1;
      let quantity;
      if (value == 3 || value == 4) {
        quantity = 614400000;
      }

      if (value == 11) {
        quantity = 15360000;
      }
      if (value == 15) {
        quantity = 153600;
      }
      if (value == 26) {
        quantity = 614400;
      }
      if (quantity == 0) {
        let notquantity = document.createElement("span");
        notquantity.innerHTML = "Ürün yok";
        notquantity.style.backgroundColor = "red";
        notquantity.style.color = "white";
        notquantity.style.textAlign = "center";
        notquantity.style.borderRadius = "4px";
        notquantity.style.padding = "4px";
        document.querySelector("#mfdiv").appendChild(notquantity);
        setTimeout(() => {
          notquantity.remove();
        }, 2000);
      }
      if (quantity != 0 && newprice > minprice) {
        fetch(
          `https://rivalregions.com/storage/newsell/${value}/${quantity}/${newprice}`,
          {
            method: "POST",
            headers: {
              accept: "text/html, */*; q=0.01",
              "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
              cookie: document.cookie,
              origin: "https://rivalregions.com",
              referer: "https://rivalregions.com/",
              "sec-ch-ua":
                '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"Windows"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-requested-with": "XMLHttpRequest",
            },
            body: new URLSearchParams({
              c: `${c_html}`,
            }),
          }
        )
          .then((res) => res.text())
          .then((json) => {
            console.log(json);
            if (json == Number(json)) {
              let time = 5 * 60,
                r = document.getElementById("timer"),
                tmp = time;

              setInterval(function () {
                var c = tmp--,
                  m = (c / 60) >> 0,
                  s = c - m * 60 + "";
                r.textContent = "" + m + ":" + (s.length > 1 ? "" : "0") + s;
                tmp != 0 || (tmp = time);
              }, 1000);
            }
            if (json == "cooldown") {
              let err = document.createElement("span");
              err.innerHTML = "Beklemede";
              err.style.backgroundColor = "yellow";
              err.style.color = "#000";
              err.style.textAlign = "center";
              err.style.borderRadius = "4px";
              err.style.padding = "4px";
              document.querySelector("#mfdiv").appendChild(err);
              setTimeout(() => {
                err.remove();
              }, 4000);
            }
          });
      }
    }
    for (var i = 0; i < products.length; i++) {
      var option = document.createElement("option");
      option.value = products[i].num;
      option.text = products[i].name;
      opt.appendChild(option);
    }
  } else if (
    location.href.includes("storage") != true &&
    document.getElementById("selectlist")
  ) {
    document.getElementById("mfdiv").remove();
  }
}
