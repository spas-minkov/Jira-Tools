createLink();
loop();

function sleep() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}


async function loop() {
    while (true) {
        createLink();
        await sleep();
    }
}

function createLink() {
    if (document.getElementById("addtnl-jira") != null)
        return;
    let url;
    console.log("[VIA/VM Linker] UP");
    const paragraph = document.getElementById("summary-val");

    if (paragraph === null)
        return;
    const parText = paragraph.textContent;
    console.log("[VIA/VM Linker] Text to matche: " + parText);
    const regex = /^(VM-\d+)|(VIA-\d+)/g;
    const found = parText.match(regex);

    if (found === null)
        return;

    console.log("[VIA/VM Linker] Text matched: " + found);
    if (found[0].includes("VM"))
             url = "https://jira.tinqin.com/browse/" + found;
    else
             url = "https://jira.viamedis.fr/browse/" + found;

    console.log("[VIA/VM Linker] Adding link: " + url);
    const linkBlock = document.createElement("a");
    const hrfAttr = document.createAttribute("href");
    const idAttr = document.createAttribute("id");
    hrfAttr.value = url;
    idAttr.value="addtnl-jira"
    const nodeMap = linkBlock.attributes;
    nodeMap.setNamedItem(hrfAttr);
    nodeMap.setNamedItem(idAttr);
    linkBlock.textContent = found[0];

    const delimBold = document.createElement("strong");
    delimBold.innerHTML = ' &harr; '

    const keyVal = document.getElementById("key-val");
    if (keyVal === null)
        return;
    keyVal.parentNode.appendChild(delimBold);
    keyVal.parentNode.appendChild(linkBlock);

    console.log("[VIA/VM Linker] Link Added");

}