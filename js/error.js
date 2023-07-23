(function() {
  const p = document.querySelector("p");
  let href = window.location.href;

  if (!href.startsWith("http:") && !href.startsWith("https:")) {
    return;
  }

  fetch("/err-doc-test/versions.json")
    .then(response => response.json())
    .then(data => {
      const versions = data.versions;
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

      console.log(`base: ${base}, href: ${href}`);

      let errdoctest = false;
      if (base === "err-doc-test") {
        console.log("EDT");
        errdoctest = true;
        base = "";
        href = href.substring(13);
        pos = href.indexOf("/");
        if (pos > 0) {
          base = href.substring(0, pos);
          href = href.substring(pos+1);
          console.log(`base2: ${base}, href2: ${href}`);
        }
      }

      let redirect = "";
      if (base === "") {
        if (errdoctest) {
          redirect = `${scheme}${hostname}/err-doc-test/${versions.currentRelease}/${href}`;
        } else {
          redirect = `${scheme}${hostname}/${versions.currentRelease}/${href}`;
        }
        window.location.href = redirect;
      }

      if (base === versions.currentRelease) {
        if (errdoctest) {
          redirect = `${scheme}${hostname}/err-doc-test/${versions.ninemlVersion}/${href}`;
        } else {
          redirect = `${scheme}${hostname}/${versions.ninemlVersion}/${href}`;
        }

        p.innerHTML = `Can't find it in the current release, perhaps in ${redirect}`;
        return;
      }

      if (base === versions.ninemlVersion) {
        if (errdoctest) {
          redirect = `${scheme}${hostname}/err-doc-test/${versions.currentRelease}/${href}`;
        } else {
          redirect = `${scheme}${hostname}/${versions.currentRelease}/${href}`;
        }

        p.innerHTML = `Can't find it in the beta release, perhaps in ${redirect}`;
        return;
      }

      if (errdoctest) {
        redirect = `${scheme}${hostname}/err-doc-test/${versions.currentRelease}/${href}`;
      } else {
        redirect = `${scheme}${hostname}/${versions.currentRelease}/${href}`;
      }

      console.log("BASE: " + base);
      //window.location.href = redirect;


      p.innerHTML = `Not found. Open an issue? ::${redirect}::`;
    });
})();
