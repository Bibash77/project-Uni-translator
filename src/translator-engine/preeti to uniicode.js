"use strict";

/**
 * Converts legacy text to Unicode using specified mapping arrays.
 * @param {string} legacyText - The input text in the legacy font.
 * @returns {string} - The converted text in Unicode.
 */
function convertToUnicode(legacyText) {
    console.log(legacyText);

    // Mapping arrays: legacy symbols (legacyMapping) to Unicode (unicodeMapping)
    const legacyMapping = ["ç", "˜", ".", "'m", "]m", "Fmf", "Fm", ")", "!", "@", "#", "$", "%", "^", "&", "*", "(", "k|m", "em", "km", "Qm", "qm", "N˜", "¡", "¢", "1", "2", "4", ">", "?", "B", "I", "Q", "ß", "q", "„", "‹", "•", "›", "§", "°", "¶", "¿", "Å", "Ë", "Ì", "Í", "Î", "Ý", "å", "6«", "7«", "8«", "9«", "Ø", "|", "8Þ", "9Þ", "S", "s", "V", "v", "U", "u", "£", "3", "ª", "R", "r", "5", "H", "h", "‰", "´", "~", "`", "6", "7", "8", "9", "0", "T", "t", "Y", "y", "b", "W", "w", "G", "g", "K", "k", "ˆ", "A", "a", "E", "e", "D", "d", "o", "/", "N", "n", "J", "j", "Z", "z", "i", ":", ";", "X", "x", "cf‘", "c‘f", "cf}", "cf]", "cf", "c", "O{", "O", "pm", "p", "C", "P]", "P", "f‘", '"', "'", "+", "f", "[", "\\", "]", "}", "F", "L", "M", "्ा", "्ो", "्ौ", "अो", "अा", "आै", "आे", "ाो", "ाॅ", "ाो", "ंु", "ेे", "अै", "ाो", "अे", "ंा", "अॅ", "ाै", "ैा", "ंृ", "ँा", "ँू", "ेा", "ंे"];
    const unicodeMapping = ["ॐ", "ऽ", "।", "m'", "m]", "mfF", "mF", "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "फ्र", "झ", "फ", "क्त", "क्र", "ल", "ज्ञ्", "द्घ", "ज्ञ", "द्द", "द्ध", "श्र", "रु", "द्य", "क्ष्", "त्त", "द्म", "त्र", "ध्र", "ङ्घ", "ड्ड", "द्र", "ट्ट", "ड्ढ", "ठ्ठ", "रू", "हृ", "ङ्ग", "त्र", "ङ्क", "ङ्ख", "ट्ठ", "द्व", "ट्र", "ठ्र", "ड्र", "ढ्र", "्य", "्र", "ड़", "ढ़", "क्", "क", "ख्", "ख", "ग्", "ग", "घ्", "घ", "ङ", "च्", "च", "छ", "ज्", "ज", "झ्", "झ", "ञ्", "ञ", "ट", "ठ", "ड", "ढ", "ण्", "त्", "त", "थ्", "थ", "द", "ध्", "ध", "न्", "न", "प्", "प", "फ्", "ब्", "ब", "भ्", "भ", "म्", "म", "य", "र", "ल्", "ल", "व्", "व", "श्", "श", "ष्", "स्", "स", "ह्", "ह", "ऑ", "ऑ", "औ", "ओ", "आ", "अ", "ई", "इ", "ऊ", "उ", "ऋ", "ऐ", "ए", "ॉ", "ू", "ु", "ं", "ा", "ृ", "्", "े", "ै", "ँ", "ी", "ः", "", "े", "ै", "ओ", "आ", "औ", "ओ", "ो", "ॉ", "ो", "ुं", "े", "अै", "ो", "अे", "ां", "अॅ", "ौ", "ौ", "ृं", "ाँ", "ूँ", "ो", "ें"];

    const mappingLength = legacyMapping.length;

    // Early return if no input is provided
    if (!legacyText) return legacyText;
    console.log(legacyText)
    let textToProcess = legacyText;
    const totalLength = legacyText.length;
    let convertedText = "";
    let startPosition = 0;
    let endPosition = 0;
    let continueProcessing = true;

    // improve this since 10k is too high for older laptops to process
    const chunkSize = 10;

    while (continueProcessing) {
        startPosition = endPosition;
        if (endPosition < totalLength - chunkSize) {
            endPosition += chunkSize;
            while (legacyText.charAt(endPosition) !== " ") {
                endPosition--;
            }
        } else {
            endPosition = totalLength;
            continueProcessing = false;
        }
        const textChunk = legacyText.substring(startPosition, endPosition);
        convertedText += replaceLegacyWithUnicode(textChunk, legacyMapping, unicodeMapping);
    }

    console.log("Converted Text:", convertedText);
    return convertedText;
}

/**
 * Replaces legacy text with Unicode using mapping arrays.
 * @param {string} textChunk - Chunk of text to process.
 * @param {Array} legacyMapping - Array of legacy font symbols.
 * @param {Array} unicodeMapping - Array of Unicode characters.
 * @returns {string} - Processed text with Unicode replacements.
 */
function replaceLegacyWithUnicode(textChunk, legacyMapping, unicodeMapping) {
    if (textChunk) {
        for (let symbolIndex = 0; symbolIndex < legacyMapping.length; symbolIndex++) {
            const legacySymbol = legacyMapping[symbolIndex];
            const unicodeSymbol = unicodeMapping[symbolIndex];
            while (textChunk.indexOf(legacySymbol) !== -1) {
                textChunk = textChunk.replace(legacySymbol, unicodeSymbol);
            }
        }

        // Replace special cases for 'l' + vowel combination
        let lIndex = textChunk.indexOf("l");
        while (lIndex !== -1) {
            const nextChar = textChunk.charAt(lIndex + 1);
            const replacement = nextChar + "ि";
            textChunk = textChunk.replace("l" + nextChar, replacement);
            lIndex = textChunk.indexOf("l", lIndex + 1);
        }

        // Handle more complex cases like 'ि्' and 'िं्'
        textChunk = textChunk.replace(/ि्(.)/g, "्$1ि");
        textChunk = textChunk.replace(/िं्(.)/g, "्$1िं");

        // Handle special cases for 'half र' denoted by '{'
        const matras = "ा ि ी ु ू ृ े ै ो ौ ं : ँ ॅ";
        let halfRIndex = textChunk.indexOf("{");
        while (halfRIndex > 0) {
            let lookBackPosition = halfRIndex - 1;
            while (matras.includes(textChunk.charAt(lookBackPosition))) {
                lookBackPosition--;
            }
            const precedingText = textChunk.substring(lookBackPosition, halfRIndex);
            const replacement = "र्" + precedingText;
            textChunk = textChunk.replace(precedingText + "{", replacement);
            halfRIndex = textChunk.indexOf("{");
        }

        // Replace additional legacy symbols
        textChunk = textChunk.replace(/=/g, ".")
            .replace(/_/g, ")")
            .replace(/Ö/g, "=")
            .replace(/Ù/g, ";")
            .replace(/…/g, "‘")
            .replace(/Ú/g, "’")
            .replace(/Û/g, "!")
            .replace(/Ü/g, "%")
            .replace(/æ/g, "“")
            .replace(/Æ/g, "”")
            .replace(/±/g, "+")
            .replace(/-/g, "(")
            .replace(/</g, "?");
    }

    return textChunk;
}
