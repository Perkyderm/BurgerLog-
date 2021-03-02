document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  const devouredBtns = document.querySelectorAll(".devoure");

  //~ Event listener for buttons
  if (devouredBtns) {
    devouredBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const newEaten = e.target.getAttribute("data-newEaten");

        const newEatenState = {
          devoured: newEaten,
        };

        fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newEatenState),
        }).then((response) => {
          if (response.ok) {
            console.log(`changed devoured to: ${newEaten}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }

  //~ CREATE
  const createBurgerBtn = document.getElementById("create-form");

  if (createBurgerBtn) {
    createBurgerBtn.addEventListener("submit", (e) => {
      e.preventDefault();

      const newBurger = {
        name: document.getElementById("ca").value.trim(),
        devoured: document.getElementById("devoured").checked,
      };

      fetch("/api/burgers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        document.getElementById("ca").value = "";

        console.log("Created a new burger!");
        location.reload();
      });
    });
  }

  //~ DELETE
  const deleteBurgerBtns = document.querySelectorAll(".delete-burger");

  // Set up the event listeners for each delete button
  deleteBurgerBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");

      // Send the delete request
      fetch(`/api/burgers/${id}`, {
        method: "DELETE",
      }).then((res) => {
        console.log(res);
        console.log(`Deleted burger: ${id}`);

        // Reload the page
        location.reload();
      });
    });
  });
});
