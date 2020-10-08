export enum State {

    MENU, CARS, STAGES, GAME

}

export class WebGame {

    private _state: State = State.MENU;

    public get state(): State {
        return this._state;
    }

}

export default new WebGame();