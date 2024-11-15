const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();
 
const gemini_api_key = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};
 
const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  geminiConfig,
});
 
// const generate = async () => {
//   try {
//     const prompt = ". translate this to"+    +"preeti nepali .. return translated text only";
//     const result = await geminiModel.generateContent(prompt);
//     const response = result.response;
//     console.log(response.text());
//   } catch (error) {
//     console.log("response error", error);
//   }
// };

/**
 * Translates text based on the selected language using the Gemini API.
 * @param {string} selectedLanguage - The language or style to translate to (e.g., "unicode", "preeti").
 * @param {string} data - The text to be translated.
 * @returns {Promise<string>} - The translated text response.
 */
exports.translateTextWithGemini = async(selectedLanguage, data) => {
    try {
        // Customize the prompt based on selectedLanguage
        console.log(data)
        const prompt = `${data}. "Translate this to ${selectedLanguage}. Return translated text only.`;
        
        console.log(prompt)
        // Call the Gemini model with the prompt
        const result = await geminiModel.generateContent(prompt);
        
        // Extract and return the translated text
        return result.response.text();
    } catch (error) {
        console.error("Translation error:", error);
        throw error;
    }
}