const copyright = document.querySelector(".copyright");

if (copyright) {
  copyright.textContent = `© ${new Date().getFullYear()} XTRHYLL™. All rights reserved.`;
}

const shareButton = document.querySelector(".share-button");

if (shareButton) {
  shareButton.addEventListener("click", async () => {
    const shareUrl = window.location.href;

    const shareData = {
      title: "XTRHYLL™ Official Hub",
      text: "Access the official hub of XTRHYLL™ — Deep Tech, AI, Digital Trust and Real-World Impact.",
      url: shareUrl
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: shareData.title,
          text: shareData.text,
          url: shareData.url
        });
        return;
      }

      await copyLink(shareUrl);
    } catch (error) {
      console.log("Share unavailable or canceled:", error);
      await copyLink(shareUrl);
    }
  });
}

async function copyLink(url) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard.");
      return;
    }

    const input = document.createElement("input");
    input.value = url;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(input);

    alert("Link copied to clipboard.");
  } catch (error) {
    console.log("Copy failed:", error);
    alert("Could not share automatically. Please copy the link from the address bar.");
  }
}