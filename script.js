let vdomState = { h: "00", m: "00", s: "00" };
let intervalId = null; // ✅ important fix

function getTime() {
    const now = new Date();
    return {
        h: String(now.getHours()).padStart(2, '0'),
        m: String(now.getMinutes()).padStart(2, '0'),
        s: String(now.getSeconds()).padStart(2, '0')
    };
}

// Stop previous interval
function clearClock() {
    if (intervalId) clearInterval(intervalId);
}

// 🔴 STANDARD DOM (all blink)
function useDOM() {
    clearClock();

    document.getElementById("status").innerText =
        "Mode: Standard DOM (All updating)";

    intervalId = setInterval(() => {
        const time = getTime();

        document.getElementById("hour").innerText = time.h;
        document.getElementById("min").innerText = time.m;
        document.getElementById("sec").innerText = time.s;

        // Blink ALL
        document.querySelectorAll("span").forEach(el => {
            el.classList.add("red-blink");
            setTimeout(() => el.classList.remove("red-blink"), 300);
        });

    }, 1000);
}

// 🟢 VIRTUAL DOM (ONLY seconds blink)
function useVDOM() {
    clearClock();

    document.getElementById("status").innerText =
        "Mode: Virtual DOM (Only seconds update)";

    intervalId = setInterval(() => {
        const time = getTime();

        // Only update if changed
        if (time.h !== vdomState.h) {
            document.getElementById("hour").innerText = time.h;
        }

        if (time.m !== vdomState.m) {
            document.getElementById("min").innerText = time.m;
        }

        if (time.s !== vdomState.s) {
            updateSec(time.s); // ✅ only seconds blink
        }

        vdomState = time;

    }, 1000);
}

// Only seconds highlight
function updateSec(value) {
    const el = document.getElementById("sec");
    el.innerText = value;

    el.classList.add("green-blink");
    setTimeout(() => el.classList.remove("green-blink"), 300);
}

/*
<!-- TASKS:
1. Add toggle button (DOM <-> VDOM switch)
2. Show performance counter
3. Add milliseconds support
4. Convert to component-based design
-->
*/