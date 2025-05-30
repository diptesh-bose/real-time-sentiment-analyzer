# Real-time Sentiment Analyzer

An application that analyzes the sentiment of text in real-time as you type, using the Google Gemini API. It displays the sentiment (Positive, Negative, Neutral) and a corresponding score, providing instant feedback on the emotional tone of your text.

## Features

*   **Real-time Analysis:** Get sentiment feedback as you type, with a configurable debounce delay to optimize API calls.
*   **Sentiment & Score:** Displays a clear sentiment label (Positive, Negative, Neutral) along with a numerical score (-1.0 to 1.0).
*   **Visual Feedback:** Uses color-coded indicators and an animated score bar for an intuitive understanding of the sentiment.
*   **Responsive Design:** Adapts to various screen sizes for a seamless experience on desktop and mobile.
*   **Error Handling:** Provides informative messages for API issues or invalid input.
*   **Modern UI/UX:** Built with React, Tailwind CSS, and custom icons for a clean and engaging interface.

## Product Screenshots

Here's a glimpse of the Real-time Sentiment Analyzer in action:

**Screenshot 1: Positive Sentiment Example**
`![Positive Sentiment Example](product_screenshot/001_Positive.png)`
*(Description: Describe what this screenshot shows, e.g., "The application detecting positive sentiment in the entered text.")*

**Screenshot 2: Neutral Sentiment Example**
`![Neutral Sentiment Example](product_screenshot/002_Neutral.png)`
*(Description: Describe what this screenshot shows, e.g., "The application detecting neutral sentiment.")*

**Screenshot 3: Negative Sentiment Example**
`![Negative Sentiment Example](product_screenshot/003_Negative.png)`
*(Description: Describe what this screenshot shows, e.g., "The application detecting negative sentiment and displaying the corresponding feedback.")*

## For Users: How to Use

1.  **Open the Application:** Access the web application in your browser.
2.  **Start Typing:** Begin typing or paste text into the text area.
3.  **View Real-time Sentiment:** As you type, the sentiment (Positive, Negative, or Neutral) and its corresponding score will appear below the text area.
    *   **Emoji & Label:** An emoji and a colored label will indicate the detected sentiment.
    *   **Score Bar:** A progress bar will visually represent the sentiment score, ranging from -1.0 (very negative) to 1.0 (very positive).
    *   **Numerical Score:** The exact score (e.g., 0.75) will also be displayed.
4.  **Clear or Modify Text:** The sentiment will update dynamically as you edit or clear the text.

**Note on API Key:** This application requires a Google Gemini API key to function. For deployed versions, this key is typically configured by the administrator on the server. You do not need to enter an API key in the user interface.

---

## For Developers: Getting Started

This section guides you through setting up and running the project locally.

### Prerequisites

*   **Node.js:** Version 18.x or later recommended. (You can download it from [nodejs.org](https://nodejs.org/))
*   **npm** (Node Package Manager) or **yarn**: Comes with Node.js.
*   **Google Gemini API Key:** You need a valid API key from Google AI Studio.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd real-time-sentiment-analyzer
```

### 2. Install Dependencies

This project uses ES modules directly via `esm.sh` in `index.html`, so there's no explicit `npm install` step for frontend dependencies like React in a traditional build setup. However, if you were to add build tools or other Node.js-based development utilities, you would initialize a `package.json` and install them:

```bash
npm init -y
# Example: npm install -D typescript live-server
```
For the current setup, ensure your browser supports ES modules and has internet access to fetch them from `esm.sh`.

### 3. Set Up Environment Variables

The application requires a Google Gemini API key. This key **must** be provided as an environment variable.

**IMPORTANT:** Create a `.env` file in the root of your project (if one doesn't exist) and add your API key:

```
API_KEY=YOUR_GEMINI_API_KEY
```

Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.

**The application is hardcoded to expect `process.env.API_KEY`. In a local development environment without a Node.js backend serving the `index.html`, JavaScript running directly in the browser cannot access `process.env` variables in the same way.**

**For Local Development (Browser-Only):**
Since this is a frontend-only project and `process.env.API_KEY` is used, you'll need a way to make this available.
A simple approach for local development is to run a basic local server that can inject this variable or to temporarily modify the `geminiService.ts` for local testing.

**Option A: Using a simple dev server (like `live-server` with a proxy or script injection - more advanced):**
This is beyond a simple setup.

**Option B: (Less Secure, for Local Dev Only) Temporarily modify `geminiService.ts`:**
You could *temporarily* hardcode it for your local instance, but **NEVER COMMIT THIS**.
```typescript
// In services/geminiService.ts - FOR LOCAL DEVELOPMENT TESTING ONLY
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "MISSING_API_KEY" });
const ai = new GoogleGenAI({ apiKey: "YOUR_ACTUAL_API_KEY_HERE_FOR_TESTING" }); // REMEMBER TO REMOVE BEFORE COMMITTING
```
And also update the check:
```typescript
// if (!process.env.API_KEY) {
if (!"YOUR_ACTUAL_API_KEY_HERE_FOR_TESTING") { // Or simply remove this check for local testing with hardcoded key
  // ...
}
```
**The recommended way for production or shared development is to have a backend or build process that handles environment variables securely.**

### 4. Running the Application Locally

Since this is a static HTML/JS/CSS application using ES modules, you can run it with any simple HTTP server.

If you have Node.js and `npx` (comes with npm 5.2+):
1.  Navigate to the project's root directory.
2.  Install `live-server` if you don't have it: `npm install -g live-server`
3.  Run:
    ```bash
    live-server
    ```
This will open the `index.html` file in your default web browser, and it will automatically reload when you make changes to the files.

### Project Structure

```
.
├── README.md
├── index.html                # Main HTML file
├── index.tsx                 # React entry point
├── App.tsx                   # Main React application component
├── metadata.json             # Application metadata
├── constants.ts              # Application-wide constants
├── types.ts                  # TypeScript type definitions
├── components/               # UI components
│   ├── TextAreaInput.tsx
│   ├── SentimentResultDisplay.tsx
│   ├── LoadingSpinner.tsx
│   ├── ErrorMessage.tsx
│   └── icons/                # SVG icons
│       ├── LogoIcon.tsx
│       └── AlertIcon.tsx
└── services/                 # Services (e.g., API interactions)
    └── geminiService.ts
```

### Tech Stack

*   **React 19:** For building the user interface.
*   **TypeScript:** For static typing and improved code quality.
*   **@google/genai:** Official Google GenAI SDK for interacting with the Gemini API.
*   **Tailwind CSS:** For utility-first CSS styling.
*   **ES Modules (via esm.sh):** For direct browser imports without a build step.

### Gemini API Usage

*   The `services/geminiService.ts` file handles all interactions with the Gemini API.
*   It constructs a specific prompt for sentiment analysis, requesting a JSON response.
*   It uses the `gemini-2.5-flash-preview-04-17` model.
*   Includes parsing and basic validation for the API response.

### Troubleshooting (Development)

*   **"API Key is not configured" error:**
    Ensure you have set up your `API_KEY` correctly as described in "Set Up Environment Variables". If running purely in the browser without a server to inject environment variables, you might need to temporarily hardcode the key in `geminiService.ts` for local testing (remember to remove it before committing).
*   **"Invalid API Key" error:** Double-check that your API key is correct and has the necessary permissions for the Gemini API.
*   **"API request limit reached" error:** You might have exceeded the free tier or usage quota for the Gemini API. Check your Google AI Studio dashboard.
*   **CORS errors:** If you are running this locally and making API calls, you might encounter CORS issues if the Gemini API doesn't permit requests from `localhost` or your specific local development server's origin without proper configuration. The `@google/genai` SDK typically handles this, but if issues arise, ensure your API key settings allow for web client usage.
*   **Type Errors:** Ensure your TypeScript setup is correct if you modify or add new TS files.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` file for more information (if one is created).

---

This README should provide a good starting point for both users and developers interacting with your Real-time Sentiment Analyzer.
