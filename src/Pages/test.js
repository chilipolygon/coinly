let hfd, hld, mfd, mld, sfd, sld;
let hb, mb, sb;
let d;

function _load() {
    hfd = document.getElementById("hfd");
    hld = document.getElementById("hld");
    mfd = document.getElementById("mfd");
    mld = document.getElementById("mld");
    sfd = document.getElementById("sfd");
    sld = document.getElementById("sld");

    hb = document.getElementById("hb");
    mb = document.getElementById("mb");
    sb = document.getElementById("sb");

    setInterval(_update, 50);
}

function _update() {
    d = new Date();
    h = String(d.getHours()).padStart(2, "0");
    m = String(d.getMinutes()).padStart(2, "0");
    s = String(d.getSeconds()).padStart(2, "0");

    fd = "_" + h[0];
    ld = "_" + h[1];

    if (!hfd.classList.contains(fd)) {
        hfd.className = hfd.className.replace(/_\d/g, "");
        hfd.classList.add(fd);
    }

    if (!hld.classList.contains(ld)) {
        hld.className = hld.className.replace(/_\d/g, "");
        hld.classList.add(ld);
    }

    fd = "_" + m[0];
    ld = "_" + m[1];

    if (!mfd.classList.contains(fd)) {
        mfd.className = mfd.className.replace(/_\d/g, "");
        mfd.classList.add(fd);
    }

    if (!mld.classList.contains(ld)) {
        mld.className = mld.className.replace(/_\d/g, "");
        mld.classList.add(ld);
    }

    fd = "_" + s[0];
    ld = "_" + s[1];

    if (!sfd.classList.contains(fd)) {
        sfd.className = sfd.className.replace(/_\d/g, "");
        sfd.classList.add(fd);
    }

    if (!sld.classList.contains(ld)) {
        sld.className = sld.className.replace(/_\d/g, "");
        sld.classList.add(ld);
    }

    hb.style.height = (h / 24) * 60 + "%";
    mb.style.height = (m / 60) * 60 + "%";
    sb.style.height = (s / 60) * 60 + "%";
}

document.addEventListener("onload", _load());