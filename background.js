chrome.runtime.onInstalled.addListener(() => {
    // Remove existing context menu items
    chrome.contextMenus.removeAll(function() {
        // Create new context menu items
        chrome.contextMenus.create({ id: "conceal", title: "Conceal Element", contexts: ["all"]});
        chrome.contextMenus.create({ id: "undoLast", title: "Undo Last Concealment", contexts: ["all"]});
        chrome.contextMenus.create({ id: "undoAll", title: "Undo All Concealments", contexts: ["all"]});
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log('Menu item clicked:', info.menuItemId);
    var action = '';
    switch (info.menuItemId) {
      case "conceal":
        action = "hideElement";
        console.log('Menu item clicked:', info.menuItemId);
        //console.log('current selected item:', document.activeElement);
        break;
      case "undoLast":
        action = "undoLastHide";
        // console.log('Last concealment undone:', info.menuItemId);
        break;
      case "undoAll":
        action = "undoAllHides";
        // console.log('All concealment has been undone.:', info.menuItemId);
        break;
    }
  
    if (action) {
      chrome.tabs.sendMessage(tab.id, { action: action });
      console.log('Message sent to content script:', action);
    }
});