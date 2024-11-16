"use strict";

function convertToUnicode(legacyText) {
    console.log(legacyText);
    const b = ["ç", "˜", ".", "'m", "]m", "Fmf", "Fm", ")", "!", "@", "#", "$", "%", "^", "&", "*", "(", "k|m", "em", "km", "Qm", "qm", "N˜", "¡", "¢", "1", "2", "4", ">", "?", "B", "I", "Q", "ß", "q", "„", "‹", "•", "›", "§", "°", "¶", "¿", "Å", "Ë", "Ì", "Í", "Î", "Ý", "å", "6«", "7«", "8«", "9«", "Ø", "|", "8Þ", "9Þ", "S", "s", "V", "v", "U", "u", "£", "3", "ª", "R", "r", "5", "H", "h", "‰", "´", "~", "`", "6", "7", "8", "9", "0", "T", "t", "Y", "y", "b", "W", "w", "G", "g", "K", "k", "ˆ", "A", "a", "E", "e", "D", "d", "o", "/", "N", "n", "J", "j", "Z", "z", "i", ":", ";", "X", "x", "cf‘", "c‘f", "cf}", "cf]", "cf", "c", "O{", "O", "pm", "p", "C", "P]", "P", "f‘", '"', "'", "+", "f", "[", "\\", "]", "}", "F", "L", "M", "्ा", "्ो", "्ौ", "अो", "अा", "आै", "आे", "ाो", "ाॅ", "ाो", "ंु", "ेे", "अै", "ाो", "अे", "ंा", "अॅ", "ाै", "ैा", "ंृ", "ँा", "ँू", "ेा", "ंे"];
    const l = ["ॐ", "ऽ", "।", "m'", "m]", "mfF", "mF", "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", "फ्र", "झ", "फ", "क्त", "क्र", "ल", "ज्ञ्", "द्घ", "ज्ञ", "द्द", "द्ध", "श्र", "रु", "द्य", "क्ष्", "त्त", "द्म", "त्र", "ध्र", "ङ्घ", "ड्ड", "द्र", "ट्ट", "ड्ढ", "ठ्ठ", "रू", "हृ", "ङ्ग", "त्र", "ङ्क", "ङ्ख", "ट्ठ", "द्व", "ट्र", "ठ्र", "ड्र", "ढ्र", "्य", "्र", "ड़", "ढ़", "क्", "क", "ख्", "ख", "ग्", "ग", "घ्", "घ", "ङ", "च्", "च", "छ", "ज्", "ज", "झ्", "झ", "ञ्", "ञ", "ट", "ठ", "ड", "ढ", "ण्", "त्", "त", "थ्", "थ", "द", "ध्", "ध", "न्", "न", "प्", "प", "फ्", "ब्", "ब", "भ्", "भ", "म्", "म", "य", "र", "ल्", "ल", "व्", "व", "श्", "श", "ष्", "स्", "स", "ह्", "ह", "ऑ", "ऑ", "औ", "ओ", "आ", "अ", "ई", "इ", "ऊ", "उ", "ऋ", "ऐ", "ए", "ॉ", "ू", "ु", "ं", "ा", "ृ", "्", "े", "ै", "ँ", "ी", "ः", "", "े", "ै", "ओ", "आ", "औ", "ओ", "ो", "ॉ", "ो", "ुं", "े", "अै", "ो", "अे", "ां", "अॅ", "ौ", "ौ", "ृं", "ाँ", "ूँ", "ो", "ें"];
    const c = b.length;
    if (0 === 0) {
        let e = legacyText;
        const f = legacyText.length;
        let t = "";
        let i = 0;
        let h = 0;
        let g = 1;
        const r = 6000;
        while (g === 1) {
            i = h;
            if (h < (f - r)) {
                h += r;
                while (legacyText.charAt(h) !== " ") {
                    h--;
                }
            }
            else {
                h = f;
                g = 0;
            }
            e = legacyText.substring(i, h);
            t += p(e, b, l);
            console.log('output', t);
            return t;
        }
    }
    else {
        let j = legacyText;
        let t = "";
        let a = 0;
        let d = 1;
        let k = j.indexOf("<p ");
        k = j.indexOf("Sanskrit 99", k);
        let o = 0;
        let n = 0;
        let m = 0;
        while (k !== -1) {
            o = j.indexOf(">", k);
            n = j.indexOf("/span", o);
            m = j.indexOf("span", o);
            while (m < n) {
                m = j.indexOf("span", n + 4);
                n = j.indexOf("/span", n + 4);
            }
            let e = j.substring(o, n);
            e = e.replace(/>/g, ">>");
            t = t + j.substring(0, o) + e + "/span";
            j = j.substring(n + 5);
            k = j.indexOf("Sanskrit 99");
        }
        t = t + j;
        j = t;
        t = "";
        let q = 0;
        let s = 1;
        q = j.indexOf("<p ");
        while (q !== -1) {
            q = j.indexOf("<p ");
            s = j.indexOf("/p>");
            let e = j.substring(q + 3, s);
            if (e.indexOf("MsoBodyText") !== -1) {
                e = e.replace(/>/g, ">>");
                k = e.indexOf("font-family");
                o = 0;
                n = 0;
                m = 0;
                while (k !== -1) {
                    o = e.indexOf(">>", k);
                    n = e.indexOf("/span", o);
                    m = e.indexOf("span", o);
                    while (m < n) {
                        m = e.indexOf("span", n + 4);
                        n = e.indexOf("/span", n + 4);
                    }
                    e = e.substring(0, o) + (e.substring(o, n)).replace(/>>/g, ">") + e.substring(n);
                    k = e.indexOf("font-family", n);
                }
            }
            t = t + j.substring(0, q + 3) + e + "/p>";
            j = j.substring(s + 3);
            q = j.indexOf("<p ");
        }
        t = t + j;
        j = t;
        t = "";
        o = j.indexOf(">>");
        while (o !== -1) {
            a = j.indexOf(">>", o);
            d = j.indexOf("<", a);
            let e = j.substring(a + 2, d);
            t = t + j.substring(0, a + 1);
            j = j.substring(d + 1);
            t = t + p(e, b, l) + "<";
            o = j.indexOf(">>");
        }
        t = t + j;
        console.log('output', t);
        return t;
    }
    return legacyText;
}

function p(e, b, l) {
    if (e !== "") {
        for (let input_symbol_idx = 0; input_symbol_idx < b.length; input_symbol_idx++) {
            let k = 0;
            while (k !== -1) {
                e = e.replace(b[input_symbol_idx], l[input_symbol_idx]);
                k = e.indexOf(b[input_symbol_idx]);
            }
        }
        let z = e.indexOf("l");
        while (z !== -1) {
            const u = e.charAt(z + 1);
            let y = "l" + u;
            e = e.replace(y, u + "ि");
            z = e.search(/l/, (z + 1));
        }
        let v = e.indexOf("ि्");
        while (v !== -1) {
            const x = e.charAt(v + 2);
            let y = "ि्" + x;
            e = e.replace(y, "्" + x + "ि");
            v = e.search(/ि्/, v + 2);
        }
        v = e.indexOf("िं्");
        while (v !== -1) {
            const x = e.charAt(v + 3);
            let y = "िं्" + x;
            e = e.replace(y, "्" + x + "िं");
            v = e.search(/िं्/, v + 3);
        }
        const set_of_matras = "ा ि ी ु ू ृ े ै ो ौ ं : ँ ॅ";
        let A = e.indexOf("{");
        while (A > 0) {
            let probable_position_of_half_r = A - 1;
            let w = e.charAt(probable_position_of_half_r);
            while (set_of_matras.match(w) !== null) {
                probable_position_of_half_r = probable_position_of_half_r - 1;
                w = e.charAt(probable_position_of_half_r);
            }
            let y = e.substr(probable_position_of_half_r, (A - probable_position_of_half_r));
            const new_replacement_string = "र्" + y;
            y = y + "{";
            e = e.replace(y, new_replacement_string);
            A = e.indexOf("{");
        }
        e = e.replace(/=/g, ".");
        e = e.replace(/_/g, ")");
        e = e.replace(/Ö/g, "=");
        e = e.replace(/Ù/g, ";");
        e = e.replace(/…/g, "‘");
        e = e.replace(/Ú/g, "’");
        e = e.replace(/Û/g, "!");
        e = e.replace(/Ü/g, "%");
        e = e.replace(/æ/g, "“");
        e = e.replace(/Æ/g, "”");
        e = e.replace(/±/g, "+");
        e = e.replace(/-/g, "(");
        e = e.replace(/</g, "?");
    }
    return e;
}
