// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// 1. Preloader
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to(".reveal-text", { duration: 1, opacity: 0, delay: 1.5 })
      .to("#loader", { duration: 0.8, height: 0, ease: "power4.inOut" })
      .from(".hero-content > *", { duration: 1, y: 100, opacity: 0, stagger: 0.2, ease: "power4.out" });
});
// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

// Mobile Burger Menu Toggle
const burger = document.getElementById('burger');
const navLinksMenu = document.querySelector('.nav-links');

if (burger && navLinksMenu) {
    burger.addEventListener('click', () => {
        navLinksMenu.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close the mobile menu whenever a nav link is tapped
    navLinksMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksMenu.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Scroll Spy - Highlight the nav link for the section currently in view
const spySections = document.querySelectorAll('section[id]');
const spyLinks = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
    let currentId = '';
    spySections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            currentId = section.getAttribute('id');
        }
    });
    spyLinks.forEach(link => {
        link.classList.toggle('active-link', link.getAttribute('href') === `#${currentId}`);
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 2. Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX - 16, y: e.clientY - 16, duration: 0.3 });
});

// 3. Magnetic Button Effect
const magneticBtns = document.querySelectorAll('.magnetic');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const position = btn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        
        gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3 });
    });
    btn.addEventListener('mouseleave', function() {
        gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
    });
});

// 4. Hero Parallax Text
gsap.to(".hero-bg-text", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        scrub: 1
    },
    x: 200
});

// 5. Typing Effect
const typingText = document.querySelector('.typing-text');
const words = ["Biotechnology Student", "Bioinformatics Enthusiast", "Bong Coder Creator", "Digital Artist"];
let wordIdx = 0; let charIdx = 0; let isDeleting = false;

function typeEffect() {
    const current = words[wordIdx];
    if (isDeleting) {
        typingText.textContent = current.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingText.textContent = current.substring(0, charIdx + 1);
        charIdx++;
    }

    if (!isDeleting && charIdx === current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}
typeEffect();

// 6. Section Reveal (AOS Init)
AOS.init({
    duration: 1000,
    offset: 100,
    once: false
});

// 7. Skills Card 3D Tilt Effect
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = x - xc;
        const dy = y - yc;
        card.style.transform = `perspective(500px) rotateX(${-dy/10}deg) rotateY(${dx/10}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(500px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
});

const pinterestUsername = 'toufikmahata20';
const pinterestGrid = document.getElementById('pinterest-grid');

async function fetchPinterest() {
    // Pinterest RSS URL
    const rssUrl = `https://www.pinterest.com/${pinterestUsername}/feed.rss`;
    // Using a reliable RSS to JSON converter
    const apiPrefix = `https://api.rss2json.com/v1/api.json?rss_url=`;

    try {
        const response = await fetch(apiPrefix + encodeURIComponent(rssUrl));
        const data = await response.json();

        if (data.status === 'ok' && data.items.length > 0) {
            pinterestGrid.innerHTML = ''; // Clear loader

            data.items.forEach(item => {
                // Pinterest puts the image in the 'description' HTML string
                // This regex finds the image source URL
                const imgMatch = item.description.match(/<img src="(.*?)"/);
                let imgSrc = imgMatch ? imgMatch[1] : '';

                // OPTIONAL: Convert small thumbnails to high-res
                // Replaces '236x' with '736x' for better quality
                imgSrc = imgSrc.replace('236x', '736x');

                if (imgSrc) {
                    const card = document.createElement('div');
                    card.className = 'gallery-item';
                    card.setAttribute('data-aos', 'fade-up');
                    
                    card.innerHTML = `
                        <a href="${item.link}" target="_blank" rel="noopener noreferrer">
                            <img src="${imgSrc}" alt="${item.title}" loading="lazy">
                            <div class="gallery-overlay">
                                <i class="fab fa-pinterest"></i>
                                <span>View Pin</span>
                            </div>
                        </a>
                    `;
                    pinterestGrid.appendChild(card);
                }
            });
        } else {
            throw new Error("No items found");
        }
    } catch (error) {
        console.error("Pinterest Load Error:", error);
        // FALLBACK: If the API fails, show a direct button to your Pinterest
        pinterestGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
                <p>Unable to load live feed.</p>
                <a href="https://in.pinterest.com/toufikmahata20/" target="_blank" class="btn main-btn">
                    Visit My Pinterest Profile
                </a>
            </div>
        `;
    }
}

// Run when page is ready
document.addEventListener('DOMContentLoaded', fetchPinterest);