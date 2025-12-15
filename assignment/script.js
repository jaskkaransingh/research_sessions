
const themes = {
    light: {
        palette: ['#4d79ff', '#80aaff', '#b3ccff'],
        background: '#e8f0ff',
        text: '#003366',
        nav: '#cfe0ff',
        hero: '#dce8ff',
        card: '#f0f6ff',
    },
    dark: {
        palette: ['#353535ff', '#989696ff', '#c0bfbfff'],
        background: '#181818',
        text: '#ffffff',
        nav: '#222222',
        hero: '#333333',
        card: '#2a2a2a',
    },
    tropical: {
        palette: ['#e08b55ff', '#ffa75e', '#e3b58fff'],
        background: '#fff4e0',
        text: '#b35400',
        nav: '#ffd8a8',
        hero: '#ffe5c2',
        card: '#fff0db',
    }
};

function setTheme(themee) {
    const theme = themes[themee];
    document.body.style.background = theme.background;
    document.body.style.color = theme.text;
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.style.background = theme.card;
        card.style.color = theme.text;
    });
    const nav = document.querySelector('nav');
    nav.style.background = theme.nav;
    nav.style.color = theme.text;
    const hero = document.querySelector('.hero');
    hero.style.background = theme.hero;
    hero.style.color = theme.text;
    document.querySelector('.box1').style.background = theme.palette[0];
    document.querySelector('.box2').style.background = theme.palette[1];
    document.querySelector('.box3').style.background = theme.palette[2];
}