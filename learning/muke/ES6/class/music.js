class AudioPlayer {
    constructor(container) {
        this.container = container;

        this.songList = this.songList;
        this.dom = null;
        this.audio = new Audio();

        this.getSongs();
        this.createElement();
        this.bindEvents();
        this.render();
    }
    getSongs() {
        // ...ajax
        this.songList = [];
    }

    createElement() {
        const div = document.createElement('div');

        div.innerHTML = `<div class="btn">play music</div>\n
        <div class="">progress</div>`;
        this.dom = div;
    }
    bindEvents() {
        this.dom.querySelector('.btn').addEventListener('click', () => {
            console.log('play');
        });
    }
    render() {
        this.container.appendChild(this.dom);
    }
}

let box = new AudioPlayer(document.querySelector('#box'));
