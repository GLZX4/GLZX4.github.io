$(document).ready(function() {
  const clearInput = () => {
      const input = $("input[type='search']");
      input.val("");
      searchContainer.removeClass('hasText');
  };

  const clearBtn = $("#clear-btn");
  const messageBox = $('#messageBox');

  clearBtn.on("click", function(event) {
      event.preventDefault(); // Prevent the link from navigating
      clearInput();
      messageBox.removeClass('show');
  });

  const searchForm = $("#searchForm");
  const searchBar = $("#searchBar");
  const searchContainer = $("#searchContainer");

  searchForm.on("submit", function(event) {
      event.preventDefault(); // Prevent the default form submission behavior

  });

  searchBar.on("input", function() {
      if (searchBar.val().trim() !== '') {
          searchContainer.addClass('hasText');
      } else {
          searchContainer.removeClass('hasText');
      }
  });
});