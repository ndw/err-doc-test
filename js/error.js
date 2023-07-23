(function() {
  const p = document.querySelector("p");
  let href = window.location.href;

  if (!href.startsWith("http:") && !href.startsWith("https:")) {
    return;
  }

  let pos = href.indexOf("//");
  let scheme = href.substring(0, pos+2);
  href = href.substring(pos+2);

  pos = href.indexOf("/");
  if (pos < 0) {
    return;
  }

  let hostname = href.substring(0, pos);
  href = href.substring(pos+1);

  pos = href.indexOf("/");
  let base = "";
  if (pos > 0) {
    base = href.substring(0, pos);
  }

/*
  if (base == "") {
    base = "3.0.0j";
    href = "3.0.0j/changelog.html";
  }
*/

  if (base == "") {
    window.location.href = `${scheme}/${hostname}/current/${href}`;
  }

  p.innerHTML = `${base}, ${href}`;
})();
