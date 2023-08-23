var siteVersion = identifySite();
var lastHideTimestamp = 0;
var rightClickedElement = null;
document.addEventListener('contextmenu', function(e) {
    rightClickedElement = e.target;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Received message:', request);
    if (rightClickedElement && request.action === "hideElement") {
        console.log('current function requested:', request.action);
      hideElement(rightClickedElement);
    } else if (request.action === "undoLastHide") {
      undoLastHide();
    } else if (request.action === "undoAllHides") {
      undoAllHides();
    }
});

function hideElement(clickedElement) {
    console.log('Clicked element:', clickedElement);

    //var siteVersion = identifySite();
    var elementToHide = findElementToConceal(clickedElement, siteVersion);
  
    if (elementToHide) {
        console.log('Element to hide:', elementToHide);
        elementToHide.style.display = 'none';

        var timestamp = new Date().getTime();
        elementToHide.setAttribute('data-hide-id', timestamp);
        lastHideTimestamp = timestamp;
    }
}

function identifySite() {
    if (window.location.hostname.includes('reddit.com')) {
      var betaTheme = document.querySelector('.theme-beta') !== null;
      var resExtension = document.querySelector('.res-nightmode') !== null;
  
      if (betaTheme) {
        return 'beta';
      } else if (resExtension) {
        return 'oldWithRES';
      } else {
        return 'oldWithoutRES';
      }
    }
    return null;
  }

function findElementToConceal(clickedElement, siteVersion) {
    var elementToConceal = null;
  
    switch (siteVersion) {
      case 'beta':
        elementToConceal = clickedElement.closest('shreddit-post[permalink][view-context][feedindex][subreddit-prefixed-name][author].nd\\:visible');
        break;
      case 'oldWithRES':
      case 'oldWithoutRES':
        elementToConceal = clickedElement.closest('[data-type="link"][data-subreddit][data-author][data-url][data-permalink][data-comments-count]');
        break;
    }
      
    return elementToConceal;
  }

function undoLastHide() {
    var lastHiddenElement = document.querySelector(`[data-hide-id='${lastHideTimestamp}']`);
    if (lastHiddenElement) {
        lastHiddenElement.style.display = '';
        lastHiddenElement.removeAttribute('data-hide-id');
    }
}
    
function undoAllHides() {
    var allHiddenElements = document.querySelectorAll('[data-hide-id]');
    allHiddenElements.forEach(function(element) {
        element.style.display = '';
        element.removeAttribute('data-hide-id');
    })
}