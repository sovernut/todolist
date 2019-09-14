export class Todo {
    constructor(
        public todoText: string,
        public priority: string,
        public date: string,
        public done: boolean
    ) {
    }
}