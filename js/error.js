(function() {
  const p = document.querySelector("p");
  let href = window.location.href;

  if (!href.startsWith("http:") && !href.startsWith("https:")) {
    return;
  }

  fetch("/err-doc-test/versions.json")
    .then(response => response.json())
    .then(versions => {
      console.log(versions);

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

      let errdoctest = false;
      if (base === "err-doc-test") {
        errdoctest = true;
        base = "";
        pos = href.indexOf("/");
        if (pos > 0) {
          base = href.substring(0, pos);
          href = href.substring(pos+1);
        }
      }

      /*
        if (base == "") {
        base = "3.0.0j";
        href = "3.0.0j/changelog.html";
        }
      */

      let redirect = "";
      if (base == "") {
        if (errdoctest) {
          redirect = `${scheme}/${hostname}/err-doc-test/${versions.currentRelease}/${href}`;
        } else {
          redirect = `${scheme}/${hostname}/${versions.currentRelease}/${href}`;
        }
      }

      p.innerHTML = `${base}, ${href}<br/>${redirect}`;
    });
})();
