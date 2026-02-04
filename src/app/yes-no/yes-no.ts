import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-yes-no',
  imports: [CommonModule],
  templateUrl: './yes-no.html',
  styleUrls: ['./yes-no.css']
})
export class YesNo {

  @ViewChild('noBtn') noBtn!: ElementRef;

  hearts = Array(20);

  /* ❤️ Floating hearts helpers */
  randomLeft(i: number): number {
    return Math.random() * 100;
  }

  randomDelay(i: number): number {
    return Math.random() * 5;
  }

  /* 💖 YES click */
  showSuccess = false;

  sayYes() {
    this.showSuccess = true;
    this.launchConfetti();
  }



  /* 🎉 Confetti */
  launchConfetti() {
    for (let i = 0; i < 120; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = this.randomColor();
      confetti.style.animationDuration = 2 + Math.random() * 3 + 's';

      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 5000);
    }
  }

  randomColor(): string {
    const colors = ['#ff4b5c', '#ff758c', '#ffd93d', '#6a5cff', '#4d96ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  /* 😈 NO button escape */
  moveNoButton() {
    const btn = this.noBtn.nativeElement;
    const container = btn.parentElement;

    const maxX = container.clientWidth - btn.offsetWidth;
    const maxY = container.clientHeight - btn.offsetHeight;

    // 🧠 current position
    const currentX = btn.offsetLeft;
    const currentY = btn.offsetTop;

    let newX = 0;
    let newY = 0;

    const MIN_DISTANCE = 120; // 👈 minimum jump distance

    let tries = 0;

    do {
      newX = Math.random() * maxX;
      newY = Math.random() * maxY;

      const dx = newX - currentX;
      const dy = newY - currentY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // stop infinite loop safety
      tries++;
      if (tries > 10) break;

      // keep looping if too close
    } while (
      Math.sqrt(
        Math.pow(newX - currentX, 2) +
        Math.pow(newY - currentY, 2)
      ) < MIN_DISTANCE
    );

    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';

    // mobile feedback 😄
    navigator.vibrate?.(70);
  }



}
