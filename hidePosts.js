// Define vowels
const vowels = ['a', 'e', 'i', 'o', 'u'];

// Query all post titles (update this selector to match the site's structure)
const resTitles = document.querySelectorAll('.post-title');
const oldTitles = document.querySelectorAll('.title');
const betaTitles = document.querySelectorAll('[id^="post-title-"][slot="title"]');


// Iterate through the titles
titles.forEach((title) => {
  // Get the text content of the title
  const text = title.textContent.trim().toLowerCase();

  // Check if the first character is a vowel
  if (vowels.includes(text.charAt(0))) {
    // Find the parent post element (update this to match the site's structure)
    const post = title.closest('.post');

    // Hide the post
    if (post) post.style.display = 'none';
  }
});
