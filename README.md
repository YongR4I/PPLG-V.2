# PPLG V.2 Class Website

I built this website as a digital archive and portfolio for my class, PPLG (Software and Game Development). As software development students, we spend years writing code, building projects, and experiencing the typical struggles of learning how to build software. I wanted a centralized place to document our journey, showcase our work, and leave a digital footprint of our time together.

Rather than using a generic template, I designed this landing page to reflect the aesthetics of modern web development. It serves as both a class gallery and a practical application of the frontend engineering concepts we learn.

## Technical Implementation

This project is built with a modern React stack, focusing on clean UI and fluid interactions. 

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Core Interactions:** Custom React hooks for state management and CSS transitions for glassmorphism effects.
- **Typography:** Inter Display for structural elements and PP Neue Montreal for specific UI accents.

Key technical details include a custom preloader built with CSS keyframes, a glassmorphic expandable navigation bar, and real-time clock synchronization using date-fns. The layout relies heavily on absolute positioning and z-index layering to manage the interplay between the background media, UI overlays, and transition states.

## Local Development

If you want to run this project locally to explore the codebase:

1. Clone the repository:
   ```bash
   git clone https://github.com/YongR4I/PPLG-V.2.git
   ```

2. Navigate to the directory:
   ```bash
   cd PPLG-V.2
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at http://localhost:3000.

## Context

This project is actively maintained. Future updates will include the integration of individual student portfolios, a dedicated photo gallery, and write-ups of our class projects.

Created by Raihan Daffa.
