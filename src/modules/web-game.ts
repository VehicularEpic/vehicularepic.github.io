export enum State {

    MENU, CARS, STAGES, GAME

}

export class WebGame {

    private _state: State = State.MENU;

    public get state(): State {
        return this._state;
    }

    public set state(state: State) {
        this._state = state;
    }

}

export default new WebGame();