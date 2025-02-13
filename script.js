class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.letters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        this.fontSize = 14;
        this.columns = Math.floor(window.innerWidth / this.fontSize);
        this.drops = [];
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(window.innerWidth / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.letters.charAt(Math.floor(Math.random() * this.letters.length));
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            this.ctx.fillText(text, x, y);

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    start() {
        setInterval(() => this.draw(), 50);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const matrixCanvas = document.getElementById('matrix');
    const matrix = new MatrixRain(matrixCanvas);
    matrix.start();

    const authButton = document.getElementById('auth-button');
    const accessCodeInput = document.getElementById('access-code');
    const terminal = document.getElementById('terminal');
    const errorMessage = document.getElementById('error-message');

    authButton.addEventListener('click', checkAccess);
    
    accessCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAccess();
    });

    function checkAccess() {
        const code = accessCodeInput.value;
        
        if (code === "openlibrary") {
            document.getElementById("access-form").style.display = "none";
            terminal.style.display = "block";
            errorMessage.style.display = "none";
            
            const terminalText = terminal.querySelector('p');
            terminalText.innerHTML = '';
            const text = "> ACCESS GRANTED - WELCOME TO THE ARCHIVE";
            let i = 0;
            const typeWriter = setInterval(() => {
                terminalText.innerHTML += text[i];
                i++;
                if (i >= text.length) {
                    clearInterval(typeWriter);
                }
            }, 50);
        } else {
            errorMessage.style.display = "block";
            accessCodeInput.value = '';
            accessCodeInput.focus();
        }
    }
});