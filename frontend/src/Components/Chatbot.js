import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Check if Botpress webchat script is already loaded
    if (!document.getElementById("botpress-webchat")) {
      const script1 = document.createElement("script");
      script1.id = "botpress-webchat";
      script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
      script1.async = true;

      script1.onload = () => {
        console.log("Botpress webchat script loaded");

        // Ensure botpressWebChat exists before initializing
        if (window.botpressWebChat) {
          window.botpressWebChat.init({
            botId: "a7a32cf6-f68a-40f7-b206-34af49d0039b", // Replace with your actual bot ID
            hostUrl: "https://cdn.botpress.cloud/webchat",
            messagingUrl: "https://messaging.botpress.cloud",
            clientId: "2a9802c0-a90d-4cf0-9220-ddf2d3cdfcb2", // Replace with your actual client ID
            showPoweredBy: false,
            enableConversationDeletion: true,
          });
        } else {
          console.error("Botpress WebChat failed to load");
        }
      };

      document.body.appendChild(script1);
    }

    // Load custom Botpress script only if necessary
    if (!document.getElementById("botpress-custom-script")) {
      const script2 = document.createElement("script");
      script2.id = "botpress-custom-script";
      script2.src = "https://files.bpcontent.cloud/2025/03/02/07/20250302071605-TQ59S160.js";
      script2.async = true;
      document.body.appendChild(script2);
    }
  }, []);

  return null; // No UI needed; it just loads the chatbot
};

export default Chatbot;