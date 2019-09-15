export class Todo {
    constructor(
        public todoid: string,
        public todoText: string,
        public priority: string,
        public date: string,
        public done: boolean
    ) {
    }
}