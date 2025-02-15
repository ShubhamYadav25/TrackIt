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