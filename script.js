class FantasyDraftChooser {
    constructor() {
        this.teamNames = [
            "Porscha",
            "Jonathan",
            "Brandon",
            "George",
            "Zachary",
            "Rebecca",
            "Tyler",
            "Ian",
            "Vida",
            "Kenneth",
            "Jim",
            "Adrian",
            "Nicole K",
            "KJ"
        ];
        
        this.draftOrder = [];
        this.spinCount = 0;
        this.maxSpins = 14;
        this.isSpinning = false;
        this.currentNameIndex = 0;
        this.availableNames = [...this.teamNames]; // Copy of team names for tracking available options
        
        this.initializeElements();
        this.attachEventListeners();
    }
    
    initializeElements() {
        this.currentNameEl = document.getElementById('currentName');
        this.spinBtn = document.getElementById('spinBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.spinCountEl = document.getElementById('spinCount');
        this.draftOrderEl = document.getElementById('draftOrder');
    }
    
    attachEventListeners() {
        this.spinBtn.addEventListener('click', () => this.startSpin());
        this.resetBtn.addEventListener('click', () => this.reset());
    }
    
    startSpin() {
        if (this.isSpinning || this.spinCount >= this.maxSpins) return;
        
        this.isSpinning = true;
        this.spinBtn.disabled = true;
        this.currentNameEl.classList.add('spinning');
        
        // Animate through names for 2 seconds
        const spinDuration = 2000;
        const spinSpeed = 100; // milliseconds between name changes
        const totalSpins = spinDuration / spinSpeed;
        
        let currentSpin = 0;
        
        const spinInterval = setInterval(() => {
            this.currentNameIndex = Math.floor(Math.random() * this.availableNames.length);
            this.currentNameEl.textContent = this.availableNames[this.currentNameIndex];
            
            currentSpin++;
            
            if (currentSpin >= totalSpins) {
                clearInterval(spinInterval);
                this.finishSpin();
            }
        }, spinSpeed);
    }
    
    finishSpin() {
        // Final name selection from available names
        const finalName = this.availableNames[this.currentNameIndex];
        
        // Add to draft order
        this.draftOrder.push(finalName);
        
        // Remove the selected name from available names to prevent repeats
        this.availableNames.splice(this.currentNameIndex, 1);
        
        this.spinCount++;
        
        // Update UI
        this.updateSpinCount();
        this.updateDraftOrder();
        
        // Reset spinning state
        this.isSpinning = false;
        this.currentNameEl.classList.remove('spinning');
        
        // Disable spin button if max spins reached
        if (this.spinCount >= this.maxSpins) {
            this.spinBtn.disabled = true;
            this.currentNameEl.textContent = "Draft Order Complete! 🎉";
        } else {
            this.spinBtn.disabled = false;
        }
    }
    
    updateSpinCount() {
        this.spinCountEl.textContent = this.spinCount;
    }
    
    updateDraftOrder() {
        // Clear empty state
        this.draftOrderEl.innerHTML = '';
        
        // Add each draft pick
        this.draftOrder.forEach((name, index) => {
            const pickElement = this.createDraftPickElement(index + 1, name);
            this.draftOrderEl.appendChild(pickElement);
        });
    }
    
    createDraftPickElement(pickNumber, teamName) {
        const pickEl = document.createElement('div');
        pickEl.className = 'draft-pick';
        
        pickEl.innerHTML = `
            <div class="pick-number">${pickNumber}</div>
            <div class="pick-name">${teamName}</div>
        `;
        
        return pickEl;
    }
    
    reset() {
        this.draftOrder = [];
        this.spinCount = 0;
        this.isSpinning = false;
        this.currentNameIndex = 0;
        this.availableNames = [...this.teamNames]; // Reset available names to all team names
        
        // Reset UI
        this.currentNameEl.textContent = "Click Spin to Start!";
        this.currentNameEl.classList.remove('spinning');
        this.spinBtn.disabled = false;
        this.updateSpinCount();
        
        // Reset draft order display
        this.draftOrderEl.innerHTML = `
            <div class="empty-state">
                <p>Start spinning to build your draft order!</p>
            </div>
        `;
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FantasyDraftChooser();
});

// Add some fun interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!button.disabled) {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (!button.disabled) {
                button.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
});
