// content.js

(function () {
  // Function to add the DeGod button to a tweet
  function addDeGodButton(tweet) {
    // Check if the button already exists
    if (tweet.querySelector(".degod-button")) return;

    // Locate the action bar where the reply button exists
    const actionBar = tweet.querySelector('[role="group"]');
    if (!actionBar) return;

    // Create the DeGod button
    const deGodButton = document.createElement("div");
    deGodButton.className = "degod-button";
    deGodButton.style.cursor = "pointer";
    deGodButton.style.display = "inline-flex";
    deGodButton.style.alignItems = "center";
    deGodButton.style.marginLeft = "12px";
    deGodButton.innerHTML = `
      <img src="${chrome.runtime.getURL(
        "icons/icon16.jpeg"
      )}" alt="$degod" style="width:20px;height:20px;">
    `;

    // Add click event listener
    deGodButton.addEventListener("click", function (event) {
      event.stopPropagation();
      replyWithDeGod(tweet);
    });

    // Append the button to the action bar
    actionBar.appendChild(deGodButton);
  }

  // Function to automate the reply action
  function replyWithDeGod(tweet) {
    // Find and click the reply button
    const replyButton = tweet.querySelector('[data-testid="reply"]');
    if (replyButton) {
      replyButton.click();

      // Wait for the reply modal to appear
      setTimeout(() => {
        // Find the reply text area
        const replyBox = document.querySelector(
          '[data-testid="tweetTextarea_0"]'
        );
        if (replyBox) {
          // Set the reply text to "$degod"
          replyBox.focus();
          document.execCommand("insertText", false, "$degod");

          // Find and click the Tweet button
          const tweetButton = document.querySelector(
            '[data-testid="tweetButtonInline"]'
          );
          if (tweetButton) {
            tweetButton.click();
          }
        }
      }, 500);
    }
  }

  // Observe the DOM for new tweets
  const observer = new MutationObserver(() => {
    const tweets = document.querySelectorAll('[data-testid="tweet"]');
    tweets.forEach((tweet) => addDeGodButton(tweet));
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initial execution to add buttons to existing tweets
  const initialTweets = document.querySelectorAll('[data-testid="tweet"]');
  initialTweets.forEach((tweet) => addDeGodButton(tweet));
})();
