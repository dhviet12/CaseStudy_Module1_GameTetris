function Sound(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload','auto');
    document.body.append(this.sound);
    this.play = function (){
        this.sound.play();
    }
}