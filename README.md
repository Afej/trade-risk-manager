# Risk Management Calculator

A simple trading risk calculator built with React to help manage position sizing and daily loss limits. No more guessing how much to risk per trade or when to stop trading for the day.

## What it does

**Position Size Calculator** - Calculates how much to risk per trade based on your total risk budget. Has two models:

- **Simplified**: Start with 10% per trade, reduce to 5% after losing streaks
- **Percentage**: Gradually reduce risk as losses mount (more advanced)

**Daily Loss Tracker** - Set daily loss limits (usually 4-5% of account) and track your progress with visual alerts when you're getting close to your limit.

**Educational Guide** - Simple explanations of how to use everything effectively.

## Quick start

```bash
npm install
npm run dev
```

## How to use

Open [http://localhost:5173](http://localhost:5173) and start calculating your risk!

- **Main page**: Enter your max drawdown (how much you can afford to lose total)
- **Daily Loss page**: Set your daily limits and track current losses
- **About page**: Read the guide if you need help

The whole thing is designed to work on any account size - just plug in your numbers.

## Built with

React, Vite, Tailwind CSS, and some math.

## Why this exists

Too many traders blow up accounts because they don't manage risk properly. This calculator makes it dead simple to figure out position sizes and stick to daily limits. Whether you're trading a $100 account or $100k, the math works the same way.

Remember: This just does the math. You still need to have a trading plan and stick to it!
