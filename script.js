/* 
   Word bank strictly alternating every other word with "Kindred" 
   using global translations and proper RTL support.
*/
const words = [
    "Kindred", "亲属",        /* Chinese */
    "Kindred", "القرابة",   /* Arabic (RTL) */
    "Kindred", "सजातीय",    /* Hindi */
    "Kindred", "خویشاوند",   /* Persian (RTL) */
    "Kindred", "親類",        /* Japanese */
    "Kindred", "قרוב",      /* Hebrew (RTL) */
    "Kindred", "친척",        /* Korean */
    "Kindred", "родня",     /* Russian */
    "Kindred", "Parientes", /* Spanish */
    "Kindred", "Proches",    /* French */
    "Kindred", "Verwandte", /* German */
    "Kindred", "Sjælevenner",/* Danish */
    "Kindred", "Blodsbånd", /* Norwegian */
    "Kindred"               /* Final English ending */
];

const middleLineElement = document.getElementById("middle-line");
const typedTextElement = document.getElementById("typed-text");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Words that require Right-to-Left text and cursor adjustments
const rtlWords = ["القرابة", "خویشاوند", "قרוב"];

function typeWriter() {
    const currentWord = words[wordIndex];

    // Dynamically apply RTL styling if the language requires it
    if (rtlWords.includes(currentWord)) {
        middleLineElement.classList.add("rtl");
    } else {
        middleLineElement.classList.remove("rtl");
    }

    let typingSpeed = 35; // Fast base speed to fit 5 seconds

    if (isDeleting) {
        // Delete a character (faster than typing)
        typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 15; 
    } else {
        // Type a character
        typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 30; 
    }

    // Finished typing the current word
    if (!isDeleting && charIndex === currentWord.length) {
        // Stop completely if we just finished typing the very last word ("Kindred")
        if (wordIndex === words.length - 1) {
            return; 
        }
        // Very brief pauses so it fits the 5-second total timeline
        typingSpeed = 120;
        isDeleting = true;
    } 
    // Finished deleting the word completely
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex++;
        typingSpeed = 50; 
    }

    setTimeout(typeWriter, typingSpeed);
}

// Initialize animation quickly when page loads
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriter, 100);
});
