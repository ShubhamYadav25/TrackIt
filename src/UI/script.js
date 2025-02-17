document.getElementById("trackButton").addEventListener("click", async () => {
    const flipkartUrl = document.getElementById("flipkartUrl").value;
    const responseMessage = document.getElementById("responseMessage");

    if (!flipkartUrl) {
        responseMessage.textContent = "Please enter a Flipkart URL!";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/track", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: flipkartUrl }),
        });

        const data = await response.json();
        responseMessage.textContent = data.message || data.error;
    } catch (error) {
        responseMessage.textContent = "Error connecting to the server!";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const flipContainer = document.querySelector(".flip-container");
    const createAlertButton = document.getElementById("createAlertButton");
    const cancelAlertButton = document.getElementById("cancelAlertButton");
    const saveAlertButton = document.getElementById("saveAlertButton");

    // Flip to Alert UI
    createAlertButton.addEventListener("click", () => {
        flipContainer.classList.add("flipped");
    });

    // Flip back to Tracker UI
    cancelAlertButton.addEventListener("click", () => {
        flipContainer.classList.remove("flipped");
    });

    saveAlertButton.addEventListener("click", async () => {
        const productName = document.getElementById("productName").value;
        const productLink = document.getElementById("productLink").value;
        const phoneNumber = document.getElementById("phoneNumber").value;

        if (!productName || !productLink || !phoneNumber) {
            alert("Please fill all fields.");
            return;
        }

        // Send data to server
        await fetch("/create-alert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productName, productLink, phoneNumber }),
        });

        alert("Alert saved successfully!");
        flipContainer.classList.remove("flipped"); // Flip back to Tracker UI
    });
});

