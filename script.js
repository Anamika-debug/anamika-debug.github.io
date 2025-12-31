const input = document.getElementById("commandInput");
const output = document.getElementById("output");
// MATRIX RAIN BACKGROUND
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
  drops[x] = Math.random() * canvas.height;
}

function drawMatrix() {
ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0, 255, 0, 0.35)";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const commands = {
  help: `
Available commands:
- whoami
- about
- projects
- blog
- clear
`,

  whoami: `
Anamika Sahu
Frontend Developer | Cybersecurity Engineer
Google Play Protect | Android Security
`,

  about: `
👩‍💻 ABOUT ME
- Anamika Sahu
- MCA (Computer Applications)
- Frontend: React, MUI, Tailwind
- Cybersecurity: Android RE, Frida, Ghidra
- Passionate about secure systems & UI

🔗 LINKS
GitHub   : https://github.com/Anamika-debug
LinkedIn : https://www.linkedin.com/in/anamika-sahu
`,


  projects: `
🚀 PROJECTS
1. Vehicle Rental Booking System (React + Node)
2. Android Malware Analysis Toolkit
3. Secure API Testing Framework
4. Cyber-style Portfolio (this one 😉)
`,

  blog: `
📝 BLOG
- Reverse Engineering Android Apps
- Finding Insecure Crypto Implementations
- Frontend Performance Optimization
- Malware Behavior Analysis
(Coming soon...)
`
};

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = input.value.trim().toLowerCase();
    executeCommand(command);
    input.value = "";
  }
});

function executeCommand(cmd) {
  // print the entered command
  output.innerHTML += `<p>> ${cmd}</p>`;

  if (cmd === "clear") {
    output.innerHTML = "";
    return;
  }

  if (commands[cmd]) {
    commands[cmd]
      .trim()
      .split("\n")
      .forEach(line => {
        output.innerHTML += `<p>${line.replace(
          /(https?:\/\/[^\s]+)/g,
          '<a href="$1" target="_blank" style="color:#00eaff">$1</a>'
        )}</p>`;
      });
  } else {
    output.innerHTML += `<p>Command not found. Type <span class="cmd">help</span></p>`;
  }

  window.scrollTo(0, document.body.scrollHeight);
}
