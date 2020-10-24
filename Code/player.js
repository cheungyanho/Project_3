function setupCharacter(){
    resource = PIXI.Loader.shared.resources["./Assets/adventurer-Sheet.json"].spritesheet;
    sprite = new PIXI.AnimatedSprite(resource.animations.idle);
    console.log('its lit');

    sprite = sprite;

    sprite.height = 32;
    sprite.width = 16 * 4;
    sprite.x = 0;
    sprite.y = 192 - 16*6;
    sprite.play();
    sprite.animationSpeed = 0.1;

    spriteHurtBox = new hurtBox(sprite);

    gameController = new controller(sprite);

}


function characterMovement(){

        let thing = false;
        if (state != 'jumping') {
            
            gameController.vy = 3;
        }
        spriteHurtBox.updateHurtBox(gameController);
        arrayOfSprites = newSpriteArray(spriteHurtBox);
        console.log(spriteHurtBox);
        console.log(arrayOfSprites);

        for (let i = 0; i < 8; i++) {

            if (arrayOfSprites[i] == 0) {
                if(i == 0||1){
                    spriteHurtBox.upCollision = false;
                } else if(i == 2||3){
                    spriteHurtBox.rightCollision = false;
                } else if (i == 4||5){
                    spriteHurtBox.downCollision = false;
                } else if (i == 6||7){
                    spriteHurtBox.leftCollision = false;
                }
            }
            else {
                console.log('sup');
                try {
                    thing = spriteHurtBox.collide(arrayOfSprites[i], gameController, Forward);
                } catch(error){
                    alert('you died.');
                    sprite.x = -16;
                    sprite.y = 140;
                    sprite.animationSpeed = 0.1;
                }
                console.log(thing);
            }
        }
        gameController.move();

        console.log(Forward);

        
    
}

function playCharacter(){
    const newResource = PIXI.Loader.shared.resources['./Assets/adventurer-Sheet.json'];
    setupCharacter();
    
    //gameController.vy = 6;
    let isRun = false;
    let isKeyDown = false;
    let counter = 0;

    document.addEventListener('keydown', (e) => {

        //gameController.movement(e);

    });
    document.addEventListener('keypress', (e) => {

        //gameController.keyP(e);
        isKeyDown = true;
        gameController.movement(e, spriteHurtBox);
        state = updateState(gameController.vx, gameController.vy, sprite);
        let currentTextures = newResource.spritesheet.animations[state];
        if (sprite.textures != currentTextures) {
            sprite.textures = currentTextures;
            sprite.play();
        }


    });
    document.addEventListener('keyup', (e) => {
        gameController.stopMovement(e, spriteHurtBox);
        state = updateState(gameController.vx, gameController.vy, sprite);
        sprite.textures = newResource.spritesheet.animations[state];
        sprite.play();

    });

    
    sprite.onFrameChange = function () {
        characterMovement();
        state = updateState(gameController.vx, gameController.vy, sprite);
        let currentTextures = newResource.spritesheet.animations[state];
        if (sprite.textures != currentTextures) {
            sprite.textures = currentTextures;
            sprite.play();
        }
    }
    


    
}

