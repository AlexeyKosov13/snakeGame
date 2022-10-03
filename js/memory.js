(function () {
  
    const section = document.querySelector('section');
    let playerLivesCount = document.querySelector('.playerLivesCount');
    let playerLives = 8;

    playerLivesCount.textContent = playerLives;

    const getData = () => [
        { image: 'img/memory/aleks.jpg', name: 'alex' },
        { image: 'img/memory/angry.jpg', name: 'angry' },
        { image: 'img/memory/maik.jpg', name: 'maik' },
        { image: 'img/memory/minion.jpg', name: 'minion' },
        { image: 'img/memory/kids.jpg', name: 'kids' },
        { image: 'img/memory/nlo.jpg', name: 'nlo' },
        { image: 'img/memory/shrek.jpg', name: 'shrek' },
        { image: 'img/memory/ralph.jpg', name: 'ralph' },
        { image: 'img/memory/aleks.jpg', name: 'alex' },
        { image: 'img/memory/angry.jpg', name: 'angry' },
        { image: 'img/memory/maik.jpg', name: 'maik' },
        { image: 'img/memory/minion.jpg', name: 'minion' },
        { image: 'img/memory/kids.jpg', name: 'kids' },
        { image: 'img/memory/nlo.jpg', name: 'nlo' },
        { image: 'img/memory/shrek.jpg', name: 'shrek' },
        { image: 'img/memory/ralph.jpg', name: 'ralph' }
        
    ];

    const randomize = () => {
        const cardData = getData();
        
        cardData.sort(() => Math.random() - 0.5);
        return cardData;
    };

    const cardGenerator = () => {
        const cardData = randomize();

        cardData.forEach((item, index) => {
            const card = document.createElement('div');
            const face = document.createElement('img');
            const back = document.createElement('div');

            card.classList = 'card';
            face.classList = 'face';
            back.classList = 'back';

            face.src = item.image;

            card.setAttribute('name', item.name)

            section.appendChild(card);
            card.appendChild(face);
            card.appendChild(back);
            card.addEventListener('click', (e) => {
                card.classList.toggle('toggleCard');
                checkCard(e);
            })
        });  

    }; 

    const checkCard = (e) => {
        const clickedCard = e.target;
        clickedCard.classList.add('flipped');
        const flippedCards = document.querySelectorAll('.flipped');
        const toggleCards = document.querySelectorAll('.toggleCard');

        if (flippedCards.length === 2) {
            if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
                flippedCards.forEach((item) => {
                    item.classList.remove('flipped');
                    item.style.pointerEvents = 'none';
                });
            } else {
                flippedCards.forEach((item) => {
                    item.classList.remove('flipped');
                    setTimeout(() => item.classList.remove('toggleCard'), 1000)
                });
                playerLives--;
                playerLivesCount.textContent = playerLives;
                if (playerLives === 0) {
                    restart('попробуй снова');
                };
            };         
        };
        if (toggleCards.length === 16) {
            restart('Вы выиграли!');
        }
    };

    const restart = (text) => {
        let cardData = randomize();
        let faces = document.querySelectorAll('.face');
        let cards = document.querySelectorAll('.card');
        section.style.pointerEvents = 'none';
        cardData.forEach((item, index) => {
            cards[index].classList.remove('toggleCard');
            setTimeout(() => {
                cards[index].style.pointerEvents = 'all';
                faces[index].src = item.image;
                cards[index].setAttribute('name', item.name);
                section.style.pointerEvents = 'all';
            }, 100);    
        });
        playerLives = 8;
        playerLivesCount.textContent = playerLives;
        setTimeout(() => window.alert(text)), 100;
    };

    cardGenerator();


})();
