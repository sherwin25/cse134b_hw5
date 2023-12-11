document.addEventListener("DOMContentLoaded", function () {
  const starContainer = document.querySelector(".stars");
  const ratingInput = document.querySelector("#rating");
  const ratingForm = document.querySelector("rating-widget form");
  const maxStars = 5;
  const responseMessage = document.createElement("div");
  responseMessage.id = "response-message";
  document.body.appendChild(responseMessage);

  for (let i = 1; i <= maxStars; i++) {
    const star = document.createElement("span");
    star.innerText = "★";
    star.dataset.value = i;
    star.className = "star";
    star.addEventListener("mouseover", () => highlightStars(i));
    star.addEventListener("mouseout", () => resetStars());
    star.addEventListener("click", () => setRating(i));
    starContainer.appendChild(star);
  }

  function highlightStars(upto) {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      star.style.color = star.dataset.value <= upto ? "gold" : "grey";
    });
  }

  function resetStars() {
    const currentRating = ratingInput.value || 0;
    highlightStars(currentRating);
  }

  function setRating(rating) {
    ratingInput.value = rating;
    updateStars(rating);
    responseMessage.textContent =
      rating >= 4
        ? `Thanks for ${rating} star rating!`
        : `Thanks for your feedback of ${rating} stars. We'll try to do better!`;
    starContainer.style.display = "none";
    submitRating(rating);
  }

  function updateStars(rating) {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      star.style.color = rating >= star.dataset.value ? "gold" : "grey";
    });
  }

  function submitRating(rating) {
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("sentBy", "JS");

    fetch(ratingForm.action, {
      method: "POST",
      body: formData,
      headers: {
        "X-Sent-By": "JavaScript",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Rating submitted: ", data);
        responseMessage.style.display = "block";
      })
      .catch((error) => {
        console.error("Error submitting rating: ", error);
        responseMessage.textContent =
          "There was an error submitting your rating. Please try again.";
        responseMessage.style.display = "block";
      });
  }
});
