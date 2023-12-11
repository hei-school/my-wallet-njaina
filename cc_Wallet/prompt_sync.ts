import * as readlineSync from 'readline-sync';

export function promptSync(question: string): string {
    return readlineSync.question(question);
}
